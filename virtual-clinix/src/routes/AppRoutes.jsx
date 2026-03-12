import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import VerifyEmail from '../pages/auth/VerifyEmail'
import DashboardRedirect from '../pages/dashboard/DashboardRedirect'
import PatientDashboard from '../pages/dashboard/PatientDashboard'
import DoctorDashboard from '../pages/dashboard/DoctorDashboard'
import AdminDashboard from '../pages/dashboard/AdminDashboard'
import ProtectedRoute from './ProtectedRoute'
import PatientConsultationRoom from '../pages/patient/ConsultationRoom'
import DoctorConsultationRoom  from '../pages/doctor/ConsultationRoom'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient/consultation/:appointmentId" element={<PatientConsultationRoom />} />
      <Route path="/doctor/consultation/:appointmentId"  element={<DoctorConsultationRoom />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} 
      />
      

      {/* Redirect /dashboard to role-specific dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
