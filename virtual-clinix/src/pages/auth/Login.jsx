// src/pages/auth/Login.jsx
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/authSlice'
import logo from '../../images/LOGO.png'
import authBg from '../../images/BackgroundImage.png'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Resolve role: admin (metadata) > doctor (doctors table) > patient
      let role = 'patient'
      if (data.user?.user_metadata?.role === 'admin') {
        role = 'admin'
      } else {
        const { data: doctor } = await supabase
          .from('doctors')
          .select('doctor_id')
          .eq('email', email)
          .single()
        if (doctor) role = 'doctor'
      }

      dispatch(setUser({ user: data.user, role }))
      navigate('/dashboard')
    }
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 py-10 bg-slate-900"
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

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.45)] border border-white/70 px-8 py-10">
          <h2 className="text-2xl font-semibold text-center text-[#043E5F]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-center text-gray-500">
            Sign in to access your Virtual Clinix dashboard.
          </p>

          {error && (
            <p className="mt-4 text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6C8A] focus:border-transparent transition placeholder:text-gray-400"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6C8A] focus:border-transparent transition placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
              <span>Use the email and password you registered with.</span>
              <button
                type="button"
                className="font-semibold text-[#0B6C8A] hover:underline underline-offset-2"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#0052CC] to-[#E53935] py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/30 hover:from-[#0043A3] hover:to-[#C62828] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052CC] disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Signing you in…' : 'Login'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-white/85">
          New to Virtual Clinix?{' '}
          <button
            type="button"
            className="font-semibold underline-offset-4 hover:underline"
            onClick={() => navigate('/register')}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
