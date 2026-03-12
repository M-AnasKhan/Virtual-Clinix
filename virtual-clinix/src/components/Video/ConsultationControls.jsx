import { useState } from 'react'

const ConsultationControls = ({ onEndCall, duration }) => {
  const [muted,   setMuted]   = useState(false)
  const [videoOff, setVideoOff] = useState(false)

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-[#0F172A] border-t border-gray-800">
      {/* Timer */}
      <div className="flex items-center gap-2 text-green-400">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="font-mono text-sm">{formatDuration(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMuted(!muted)}
          className={`p-3 rounded-full transition-all ${
            muted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {muted ? '🔇' : '🎙️'}
        </button>

        <button
          onClick={() => setVideoOff(!videoOff)}
          className={`p-3 rounded-full transition-all ${
            videoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {videoOff ? '📵' : '📹'}
        </button>

        <button
          onClick={onEndCall}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all flex items-center gap-2"
        >
          📵 End Call
        </button>
      </div>

      {/* Virtual Clinix brand */}
      <div className="text-[#0E7490] font-bold text-sm">
        Virtual Clinix
      </div>
    </div>
  )
}

export default ConsultationControls