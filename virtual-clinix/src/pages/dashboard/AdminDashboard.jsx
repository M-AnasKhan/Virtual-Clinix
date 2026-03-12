import { useSelector } from 'react-redux'
import DashboardLayout from '../../components/layout/DashboardLayout'

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth)

  const stats = [
    { label: 'Total users', value: '—', sub: 'Connect DB' },
    { label: 'Doctors', value: '—', sub: 'Connect DB' },
    { label: 'Patients', value: '—', sub: 'Connect DB' },
    { label: 'Appointments (month)', value: '—', sub: 'Connect DB' },
  ]

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Welcome */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
          <h2 className="text-xl font-semibold text-[#043E5F]">Admin overview</h2>
          <p className="mt-1 text-slate-500">
            Manage users, doctors, patients, and platform settings. Signed in as {user?.email}.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/95 backdrop-blur rounded-xl border border-[#0B6C8A]/20 p-5 shadow-lg shadow-[#0B6C8A]/5"
            >
              <p className="text-2xl font-bold text-[#043E5F]">{stat.value}</p>
              <p className="text-sm font-medium text-slate-600 mt-0.5">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Users</h3>
            <p className="text-sm text-slate-500 mb-4">
              View and manage all registered users. Assign roles and handle support.
            </p>
            <button className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0052CC] to-[#E53935] text-white shadow-md hover:from-[#0043A3] hover:to-[#C62828] transition">
              Manage users
            </button>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Doctors</h3>
            <p className="text-sm text-slate-500 mb-4">
              Verify and manage doctor accounts, specialities, and availability.
            </p>
            <button className="px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-[#0B6C8A] text-[#0B6C8A] hover:bg-[#0B6C8A]/10 transition">
              Manage doctors
            </button>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Patients</h3>
            <p className="text-sm text-slate-500 mb-4">
              Overview of patient accounts and activity (anonymized where required).
            </p>
            <button className="px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-[#0B6C8A]/50 text-[#0B6C8A] hover:bg-[#0B6C8A]/10 transition">
              View patients
            </button>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#0B6C8A]/20 p-6 shadow-lg shadow-[#0B6C8A]/5">
            <h3 className="text-sm font-semibold text-[#043E5F] mb-3">Settings</h3>
            <p className="text-sm text-slate-500 mb-4">
              Platform configuration, feature flags, and compliance settings.
            </p>
            <button className="px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-[#0B6C8A]/50 text-[#0B6C8A] hover:bg-[#0B6C8A]/10 transition">
              Open settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
