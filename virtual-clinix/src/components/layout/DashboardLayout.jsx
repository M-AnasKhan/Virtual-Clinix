import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../store/slices/authSlice'
import logo from '../../images/LOGO.png'

const navByRole = {
  patient: [
    { to: '/dashboard/patient', label: 'Overview', icon: 'overview' },
    { to: '/dashboard/patient', label: 'My Appointments', icon: 'calendar' },
    { to: '/dashboard/patient', label: 'Book Visit', icon: 'plus' },
    { to: '/dashboard/patient', label: 'Health Records', icon: 'records' },
    { to: '/dashboard/patient', label: 'Profile', icon: 'profile' },
  ],
  doctor: [
    { to: '/dashboard/doctor', label: 'Overview', icon: 'overview' },
    { to: '/dashboard/doctor', label: 'Schedule', icon: 'calendar' },
    { to: '/dashboard/doctor', label: 'Appointments', icon: 'appointments' },
    { to: '/dashboard/doctor', label: 'Patients', icon: 'people' },
    { to: '/dashboard/doctor', label: 'Profile', icon: 'profile' },
  ],
  admin: [
    { to: '/dashboard/admin', label: 'Overview', icon: 'overview' },
    { to: '/dashboard/admin', label: 'Users', icon: 'people' },
    { to: '/dashboard/admin', label: 'Doctors', icon: 'doctor' },
    { to: '/dashboard/admin', label: 'Patients', icon: 'people' },
    { to: '/dashboard/admin', label: 'Settings', icon: 'settings' },
  ],
}

const NavIcon = ({ name, className = 'w-5 h-5' }) => {
  const base = 'flex-shrink-0 ' + className
  switch (name) {
    case 'overview':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    case 'calendar':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case 'plus':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    case 'records':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'profile':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    case 'appointments':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case 'people':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case 'doctor':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'settings':
      return (
        <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    default:
      return null
  }
}

export default function DashboardLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, role } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navItems = role ? navByRole[role] || [] : []

  const handleLogout = () => {
    dispatch(clearUser())
    navigate('/login')
  }

  const sidebarContent = (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-center px-4 py-6 border-b border-white/10">
        <img src={logo} alt="Virtual Clinix" className="h-10 w-auto" />
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={true}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/15 text-white border-l-4 border-[#E53935] pl-[calc(1rem-4px)] shadow-lg shadow-black/10'
                  : 'text-white/80 hover:bg-white/10 hover:text-white border-l-4 border-transparent'
              }`
            }
          >
            <NavIcon name={item.icon} className="w-5 h-5 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/90 bg-white/5 hover:bg-[#E53935]/20 hover:text-white border border-white/10 hover:border-[#E53935]/30 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1z" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Sidebar - desktop: Virtual Clinix gradient + logo colors */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-gradient-to-b from-[#043E5F] via-[#0B6C8A] to-[#0A5A74] shadow-xl shadow-[#0B6C8A]/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden="true" />
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#043E5F] via-[#0B6C8A] to-[#0A5A74] shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden="true" />
        <div className="relative flex items-center justify-between px-4 py-5 border-b border-white/10">
          <img src={logo} alt="Virtual Clinix" className="h-10 w-auto" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative flex-1 px-3 py-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={true}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/15 text-white border-l-4 border-[#E53935] pl-[calc(1rem-4px)]'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border-l-4 border-transparent'
                }`
              }
            >
              <NavIcon name={item.icon} className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="relative p-3 border-t border-white/10">
          <button
            onClick={() => {
              setSidebarOpen(false)
              handleLogout()
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/90 bg-white/5 hover:bg-[#E53935]/20 hover:text-white border border-white/10 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1z" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-72 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-8 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl text-[#043E5F] hover:bg-[#0B6C8A]/10 lg:hidden transition"
Y          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-[#043E5F] truncate">{title}</h1>
Y          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 truncate max-w-[160px]" title={user?.email}>
              {user?.email}
            </span>
            <span
              className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#0052CC]/10 to-[#E53935]/10 text-[#043E5F] border border-[#0B6C8A]/20 capitalize"
            >
              {role}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
