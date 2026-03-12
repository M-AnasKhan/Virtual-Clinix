const WaitingRoom = ({ role, doctorName, patientName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-[#0E7490] flex items-center justify-center text-4xl animate-pulse">
          👨‍⚕️
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">
        {role === 'patient'
          ? `Waiting for Dr. ${doctorName} to join...`
          : `Waiting for ${patientName} to join...`}
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        Please keep this window open. The session will start automatically.
      </p>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-3 h-3 bg-[#0E7490] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default WaitingRoom