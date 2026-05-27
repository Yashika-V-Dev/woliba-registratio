import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetRegistration } from '../../redux/slices/registrationSlice'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/common/Button'

const StepWelcome = () => {
  const dispatch = useDispatch()
  const { userDetails, selectedInterests, selectedPillars } = useSelector(
    (state) => state.registration
  )

  const initials = `${userDetails.firstName?.[0] || ''}${userDetails.lastName?.[0] || ''}`.toUpperCase()

  return (
    <AuthLayout>
      <div className="w-full max-w-md page-transition">
        <div className="woliba-card px-8 py-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-woliba-red to-primary-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Registration Complete
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome, {userDetails.firstName}! 🎉
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your Woliba account has been created successfully. Your wellness journey starts now!
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2.5">
            <InfoRow label="Full Name" value={`${userDetails.firstName} ${userDetails.lastName}`} />
            <InfoRow label="Email" value={userDetails.email} />
            <InfoRow label="Company" value={userDetails.companyName || 'Woliba'} />
          </div>

          {selectedInterests.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2 text-left">Your Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedInterests.slice(0, 6).map((i) => (
                  <span key={i.id} className="text-xs bg-woliba-red/10 text-woliba-red px-2.5 py-1 rounded-full font-medium">
                    {i.icon} {i.name}
                  </span>
                ))}
                {selectedInterests.length > 6 && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                    +{selectedInterests.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          {selectedPillars.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 mb-2 text-left">Wellbeing Pillars</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedPillars.map((p) => (
                  <span key={p.id} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium border border-primary-100">
                    {p.icon} {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="primary"
            fullWidth
            onClick={() => dispatch(resetRegistration())}
          >
            Get Started with Woliba
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-xs font-medium text-gray-700 max-w-[60%] text-right truncate">{value}</span>
  </div>
)

export default StepWelcome
