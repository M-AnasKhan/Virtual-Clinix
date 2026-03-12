const PatientInfoSidebar = ({ patient, appointment }) => {
  return (
    <div className="w-80 bg-[#0F172A] border-l border-gray-800 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-white font-bold text-lg">Patient Info</h3>
        <p className="text-gray-400 text-xs">Active Consultation</p>
      </div>

      {/* Patient details */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#0E7490] flex items-center justify-center text-white font-bold text-lg">
            {patient?.full_name?.[0] || 'P'}
          </div>
          <div>
            <p className="text-white font-semibold">{patient?.full_name || 'Patient'}</p>
            <p className="text-gray-400 text-xs">{patient?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Blood Group',  value: patient?.blood_group    || 'N/A' },
            { label: 'Date of Birth', value: patient?.date_of_birth  || 'N/A' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-800 rounded-lg p-2">
              <p className="text-gray-400 text-xs">{label}</p>
              <p className="text-white text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      {patient?.allergies && (
        <div className="p-4 border-b border-gray-800">
          <p className="text-red-400 text-xs font-bold mb-1">⚠️ ALLERGIES</p>
          <p className="text-white text-sm">{patient.allergies}</p>
        </div>
      )}

      {/* Chronic conditions */}
      {patient?.chronic_conditions && (
        <div className="p-4 border-b border-gray-800">
          <p className="text-yellow-400 text-xs font-bold mb-1">📋 CHRONIC CONDITIONS</p>
          <p className="text-white text-sm">{patient.chronic_conditions}</p>
        </div>
      )}

      {/* Appointment info */}
      <div className="p-4">
        <p className="text-gray-400 text-xs font-bold mb-2">APPOINTMENT</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Date</span>
            <span className="text-white text-xs">{appointment?.appointment_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Time</span>
            <span className="text-white text-xs">{appointment?.time_slot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-xs">Status</span>
            <span className="text-green-400 text-xs font-bold uppercase">
              {appointment?.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientInfoSidebar