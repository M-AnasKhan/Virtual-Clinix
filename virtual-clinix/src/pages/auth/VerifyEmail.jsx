const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="text-2xl font-bold text-[#08465A] mb-2">
          Check Your Email
        </h2>
        <p className="text-gray-500 text-sm">
          We sent a verification link to your email address.
          Please verify before logging in.
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail