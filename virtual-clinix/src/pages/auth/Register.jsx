import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import logo from '../../images/LOGO.png'
import authBg from '../../images/BackgroundImage.png'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role }, // store role in user_metadata
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Redirect to verify email page
    setLoading(false)
    navigate('/verify-email')
  }

  return (
    <div
      className="min-h-screen relative flex justify-center px-4 py-6 md:py-10 items-start md:items-center overflow-y-auto bg-slate-900"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />

      {/* Logo: top center on mobile, top left on desktop */}
      <div className="absolute top-4 left-0 right-0 flex justify-center sm:justify-start sm:left-6 sm:top-6 z-10">
        <img src={logo} alt="Virtual Clinix" className="h-14 sm:h-16 w-auto" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.4)] border border-white/70 px-6 py-7">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-[#043E5F]">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-500">
            Join Virtual Clinix to manage your virtual consultations and health records.
          </p>

          <form onSubmit={handleRegister} className="mt-5 space-y-3.5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6C8A] focus:border-transparent transition placeholder:text-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6C8A] focus:border-transparent transition placeholder:text-gray-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6C8A] focus:border-transparent transition placeholder:text-gray-400"
                  placeholder="Create a strong password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registering as
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white/90 px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6C8A] focus:border-transparent transition"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#0052CC] to-[#E53935] py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/30 hover:from-[#0043A3] hover:to-[#C62828] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052CC] disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Creating your account…' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-gray-400 text-center">
            By registering, you agree to the Virtual Clinix terms of service and privacy
            policy.
          </p>
        </div>

        <p className="mt-4 text-center text-sm text-white/85">
          Already have an account?{' '}
          <button
            type="button"
            className="font-semibold underline-offset-4 hover:underline"
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
