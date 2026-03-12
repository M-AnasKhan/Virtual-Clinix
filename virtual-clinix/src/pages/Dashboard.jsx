import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { user, role } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-[#08465A] mb-4">
        Welcome, {user?.email}!
      </h1>
      <p className="text-gray-700 mb-6">Role: {role}</p>

      {role === 'doctor' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Doctor Dashboard</h2>
          <p>Here you can see your patient appointments.</p>
          {/* Add doctor-specific components here */}
        </div>
      )}

      {role === 'patient' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Patient Dashboard</h2>
          <p>Here you can book appointments or view your records.</p>
          {/* Add patient-specific components here */}
        </div>
      )}
    </div>
  )
}

export default Dashboard
