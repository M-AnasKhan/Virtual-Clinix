import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useVideoRoom } from '../../hooks/useVideoRoom'
import JitsiMeet from '../../components/video/JitsiMeet'
import WaitingRoom from '../../components/video/WaitingRoom'
import ConsultationControls from '../../components/video/ConsultationControls'
import PatientInfoSidebar from '../../components/video/PatientInfoSidebar'

const DoctorConsultationRoom = () => {
  const { appointmentId } = useParams()
  const navigate          = useNavigate()
  const { roomUrl, loading, error } = useVideoRoom(appointmentId)

  const [appointment,    setAppointment]    = useState(null)
  const [patient,        setPatient]        = useState(null)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [duration,       setDuration]       = useState(0)
  const [showSidebar,    setShowSidebar]    = useState(true)
  const [user,           setUser]           = useState(null)

  useEffect(() => {
    fetchUser()
    fetchAppointmentDetails()
  }, [appointmentId])

  useEffect(() => {
    if (!sessionStarted) return
    const timer = setInterval(() => setDuration(d => d + 1), 1000)
    return () => clearInterval(timer)
  }, [sessionStarted])

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchAppointmentDetails = async () => {
    const { data } = await supabase
      .from('appointments')
      .select(`*, patients(full_name, email, blood_group, date_of_birth, allergies, chronic_conditions)`)
      .eq('appointment_id', appointmentId)
      .single()

    if (data) {
      setAppointment(data)
      setPatient(data.patients)
    }
  }

  const handleEndCall = async () => {
    await supabase
      .from('appointments')
      .update({ status: 'completed' })
      .eq('appointment_id', appointmentId)
    navigate('/doctor/dashboard')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-[#0E7490] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Preparing consultation room...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="text-center text-white">
        <p className="text-red-400 text-xl mb-4">⚠️ Room setup failed</p>
        <p className="text-gray-400 text-sm mb-6">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#0E7490] rounded-lg hover:bg-[#08465A] transition"
        >
          Go Back
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#08465A] border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg">🏥 Virtual Clinix</span>
          <span className="text-gray-400 text-sm">|</span>
          <span className="text-gray-300 text-sm">
            Patient: {patient?.full_name || '...'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-400 hover:text-white text-sm transition"
          >
            {showSidebar ? '◀ Hide Info' : '▶ Show Info'}
          </button>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">Live</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {!sessionStarted ? (
          <div className="flex-1 flex flex-col">
            <WaitingRoom
              role="doctor"
              patientName={patient?.full_name}
            />
            <div className="flex justify-center pb-8">
              <button
                onClick={() => setSessionStarted(true)}
                className="px-8 py-4 bg-[#0E7490] hover:bg-[#08465A] text-white font-bold rounded-2xl text-lg transition-all shadow-lg shadow-[#0E7490]/30 flex items-center gap-3"
              >
                📹 Start Consultation
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-4">
            <JitsiMeet
              roomUrl={roomUrl}
              displayName={`Dr. ${user?.user_metadata?.full_name || 'Doctor'}`}
              role="doctor"
            />
          </div>
        )}

        {/* Patient sidebar — doctor only */}
        {showSidebar && sessionStarted && (
          <PatientInfoSidebar
            patient={patient}
            appointment={appointment}
          />
        )}
      </div>

      {/* Controls */}
      <ConsultationControls
        onEndCall={handleEndCall}
        duration={duration}
      />
    </div>
  )
}

export default DoctorConsultationRoom