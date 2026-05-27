import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { goToNextStep, goToPrevStep } from '../../redux/slices/registrationSlice'
import { registrationService } from '../../services/registrationService'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/common/Button'
import OtpInput from '../../components/forms/OtpInput'

const RESEND_TIMEOUT = 180

const StepOtpVerify = () => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.registration)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(RESEND_TIMEOUT)
  const [canResend, setCanResend] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    startTimer()
    return () => clearInterval(intervalRef.current)
  }, [])

  const startTimer = () => {
    setTimer(RESEND_TIMEOUT)
    setCanResend(false)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatTimer = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0')
    const s = String(secs % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP')
      return
    }
    setLoading(true)
    try {
      await registrationService.verifyOtp({
        otp,
        email: userDetails.email,
      })
      toast.success('OTP verified successfully!')
      dispatch(goToNextStep())
    } catch (err) {
      toast.error(err.message || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return
    setResendLoading(true)
    try {
      await registrationService.saveUserDetails({
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        companyName: userDetails.companyName,
      })
      toast.success('OTP resent to your email!')
      startTimer()
    } catch {
      toast.error('Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm page-transition">
        <div className="woliba-card px-8 py-8">
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Input verification code
          </h1>
          <p className="text-xs text-gray-500 text-center mb-6 leading-relaxed">
            We've sent a 6-digit OTP to your work email. Please enter it below to continue.
          </p>

          <OtpInput
            length={6}
            value={otp}
            onChange={setOtp}
            disabled={loading}
          />

          <div className="text-center mt-4 mb-6">
            <button
              onClick={handleResend}
              disabled={!canResend || resendLoading}
              className={`text-xs font-medium transition-colors ${canResend ? 'text-woliba-red hover:underline cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
            >
              {resendLoading ? 'Sending...' : `Resend OTP in ${formatTimer(timer)}`}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => dispatch(goToPrevStep())}
              className="flex items-center gap-1.5 flex-1"
              disabled={loading}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading || otp.length !== 6}
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StepOtpVerify
