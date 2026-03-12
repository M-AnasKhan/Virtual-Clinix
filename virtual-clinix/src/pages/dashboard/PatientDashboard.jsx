import { useSelector } from 'react-redux'
import DashboardLayout from '../../components/layout/DashboardLayout'

export default function PatientDashboard() {
  const { user } = useSelector((state) => state.auth)

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Smith', date: '2025-03-15', time: '10:00 AM', type: 'Video consultation' },
    { id: 2, doctor: 'Dr. James Wilson', date: '2025-03-18', time: '2:30 PM', type: 'Follow-up' },
  ]

  const quickActions = [
    { label: 'Book new appointment', href: '#', icon: '📅' },
    { label: 'View health records', href: '#', icon: '📋' },
    { label: 'Find a doctor', href: '#', icon: '🔍' },
  ]

  return (
    <DashboardLayout title="Patient Dashboard">
      <div className="space-y-8">
        {/* Welcome */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
          <h2 className="text-xl font-semibold text-[#043E5F]">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Patient'}!
          </h2>
          <p className="mt-1 text-slate-500">
            Manage your appointments and health records in one place.
          </p>
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Quick actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => {}}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#0B6C8A]/20 hover:border-[#0B6C8A]/50 hover:bg-gradient-to-br hover:from-[#0B6C8A]/5 hover:to-[#E53935]/5 transition text-left shadow-sm"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium text-[#043E5F]">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div>
          <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Upcoming appointments</h3>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 shadow-lg shadow-[#0B6C8A]/5 overflow-hidden">
            {upcomingAppointments.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No upcoming appointments. Book a visit when you’re ready.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {upcomingAppointments.map((apt) => (
                  <li key={apt.id} className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-[#0B6C8A]/5 transition">
                    <div>
                      <p className="font-medium text-[#043E5F]">{apt.doctor}</p>
                      <p className="text-sm text-slate-500">
                        {apt.date} at {apt.time} · {apt.type}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0052CC] to-[#E53935] text-white shadow-md hover:from-[#0043A3] hover:to-[#C62828] transition">
                        Join
                      </button>
                      <button className="px-4 py-2 rounded-xl text-sm font-medium border border-[#0B6C8A]/40 text-[#0B6C8A] hover:bg-[#0B6C8A]/10 transition">
                        Reschedule
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent activity placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Recent activity</h3>
            <p className="text-sm text-slate-500">Your recent consultations and updates will appear here.</p>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Health summary</h3>
            <p className="text-sm text-slate-500">Vitals and summaries will be shown here once connected.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
