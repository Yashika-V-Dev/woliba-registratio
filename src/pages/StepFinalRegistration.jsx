import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {
  goToNextStep,
  goToPrevStep,
  setUserData,
  setRegistrationComplete,
} from '../../redux/slices/registrationSlice'
import { registrationService } from '../../services/registrationService'
import AuthLayout from '../../components/layout/AuthLayout'
import { FullscreenLoader } from '../../components/loaders/Loader'

const StepFinalRegistration = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { userDetails, credentials, selectedInterests, selectedPillars, companyName } = useSelector(
    (state) => state.registration
  )

  useEffect(() => {
    handleRegister()
  }, [])

  const handleRegister = async () => {
    setLoading(true)
    try {
      const payload = {
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        companyName,
        password: credentials.password,
        dateOfBirth: credentials.dateOfBirth,
        phoneNumber: credentials.phoneNumber,
        workAnniversary: credentials.workAnniversary,
        interests: selectedInterests.map((i) => i.id),
        pillars: selectedPillars.map((p) => p.id),
      }

      const result = await registrationService.completeRegistration(payload)
      dispatch(setUserData(result.user || {
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        companyName,
      }))
      dispatch(setRegistrationComplete(true))
      dispatch(goToNextStep())
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.')
      dispatch(goToPrevStep())
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm page-transition">
        <div className="woliba-card px-8 py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-woliba-red/20 border-t-woliba-red rounded-full animate-spin" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Completing Registration</h2>
          <p className="text-sm text-gray-500">Please wait while we set up your account...</p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StepFinalRegistration
