import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, role }) => {
  const { user, role: userRole } = useSelector((state) => state.auth)

  if (!user) return <Navigate to="/login" />
  if (role && userRole !== role) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute
