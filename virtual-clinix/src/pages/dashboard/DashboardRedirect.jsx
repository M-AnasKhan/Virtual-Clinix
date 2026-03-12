import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function DashboardRedirect() {
  const { role } = useSelector((state) => state.auth)

  if (role === 'doctor') return <Navigate to="/dashboard/doctor" replace />
  if (role === 'admin') return <Navigate to="/dashboard/admin" replace />
  return <Navigate to="/dashboard/patient" replace />
}
