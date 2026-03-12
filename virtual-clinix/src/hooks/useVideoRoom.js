import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useVideoRoom = (appointmentId) => {
  const [roomUrl, setRoomUrl]     = useState(null)
  const [roomId, setRoomId]       = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    if (!appointmentId) return
    generateRoom()
  }, [appointmentId])

  const generateRoom = async () => {
    try {
      setLoading(true)

      // First check if room already exists
      const { data: appointment } = await supabase
        .from('appointments')
        .select('video_room_id')
        .eq('appointment_id', appointmentId)
        .single()

      if (appointment?.video_room_id) {
        const existingUrl = `https://meet.jit.si/vc-${appointment.video_room_id}`
        setRoomId(appointment.video_room_id)
        setRoomUrl(existingUrl)
        setLoading(false)
        return
      }

      // Generate new room via Edge Function
      const { data, error } = await supabase.functions.invoke('generate-room', {
        body: { appointment_id: appointmentId }
      })

      if (error) throw error

      setRoomId(data.roomId)
      setRoomUrl(data.roomUrl)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { roomUrl, roomId, loading, error, generateRoom }
}