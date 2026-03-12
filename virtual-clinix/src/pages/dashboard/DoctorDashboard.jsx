import { useSelector } from 'react-redux'
import DashboardLayout from '../../components/layout/DashboardLayout'

export default function DoctorDashboard() {
  const { user } = useSelector((state) => state.auth)

  const todayAppointments = [
    { id: 1, patient: 'John Doe', time: '9:00 AM', type: 'Video', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Video', status: 'Confirmed' },
    { id: 3, patient: 'Alex Brown', time: '2:00 PM', type: 'Follow-up', status: 'Pending' },
  ]

  const stats = [
    { label: 'Today’s appointments', value: '3' },
    { label: 'This week', value: '12' },
    { label: 'Pending follow-ups', value: '5' },
  ]

  return (
    <DashboardLayout title="Doctor Dashboard">
      <div className="space-y-8">
        {/* Welcome */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
          <h2 className="text-xl font-semibold text-[#043E5F]">
            Welcome, Dr. {user?.user_metadata?.full_name?.split(' ').pop() || user?.email?.split('@')[0] || 'Doctor'}!
          </h2>
          <p className="mt-1 text-slate-500">
            Here’s your schedule and patient overview for today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/95 backdrop-blur rounded-xl border border-[#0B6C8A]/20 p-5 shadow-lg shadow-[#0B6C8A]/5"
            >
              <p className="text-2xl font-bold bg-gradient-to-r from-[#0052CC] to-[#0B6C8A] bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Today's schedule */}
        <div>
          <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Today’s schedule</h3>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 shadow-lg shadow-[#0B6C8A]/5 overflow-hidden">
            {todayAppointments.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No appointments scheduled for today.</div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {todayAppointments.map((apt) => (
                  <li key={apt.id} className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-[#0B6C8A]/5 transition">
                    <div>
                      <p className="font-medium text-[#043E5F]">{apt.patient}</p>
                      <p className="text-sm text-slate-500">
                        {apt.time} · {apt.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {apt.status}
                      </span>
                      <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0052CC] to-[#E53935] text-white shadow-md hover:from-[#0043A3] hover:to-[#C62828] transition">
                        Start
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">My patients</h3>
            <p className="text-sm text-slate-500 mb-4">View and manage your patient list and records.</p>
            <button className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0052CC] to-[#E53935] text-white shadow-md hover:from-[#0043A3] hover:to-[#C62828] transition">
              View patients
            </button>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Availability</h3>
            <p className="text-sm text-slate-500 mb-4">Set your available slots for the coming weeks.</p>
            <button className="px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-[#0B6C8A] text-[#0B6C8A] hover:bg-[#0B6C8A]/10 transition">
              Manage schedule
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
