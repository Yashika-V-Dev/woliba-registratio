import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setOtpVerified, setStep, setUserDetails } from '../redux/slices/registrationSlice'
import { verifyOtpRequest, resendOtpRequest } from '../services/registrationService'
import AuthLayout from '../components/layout/AuthLayout'
import Spinner from '../components/loaders/Spinner'
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 6
const RESEND_TIMER = 180

const Step3OtpVerify = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch()
  const { email, otpToken, firstName, lastName } = useSelector((s) => s.registration)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(RESEND_TIMER)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTimer = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const handleChange = (index, val) => {
    if (!/^[0-9]?$/.test(val)) return
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    setError('')
    if (val && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    const newOtp = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((char, i) => { newOtp[i] = char })
    setOtp(newOtp)
    const nextIdx = pasted.length < OTP_LENGTH ? pasted.length : OTP_LENGTH - 1
    inputRefs.current[nextIdx]?.focus()
  }

  const handleSubmit = async () => {
    const otpString = otp.join('')
    if (otpString.length < OTP_LENGTH) { setError('Please enter all 6 digits.'); return }
    setLoading(true)
    try {
      await verifyOtpRequest({ otp: otpString, token: otpToken })
      dispatch(setOtpVerified())
      navigate("/register/credentials");
    } catch (err) {
      const code = err?.code ?? err?.response?.data?.code
      if (code === -419) {
        setError('Invalid OTP. Please try again.')
        toast.error('Invalid OTP. Please try again.')
      }
      else if (code === -420 || code === -431) {
        setError('OTP has expired. Please request a new one.')
        toast.error('OTP has expired. Please request a new one.')
        setTimer(0)
      } else {
        setError(err.message || 'Verification failed.')
        toast.error(err.message || 'Verification failed.')
      }
      setOtp(Array(OTP_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    try {
      const res = await resendOtpRequest({ email })
      const newToken = res?.data?.token || res?.token
      if (newToken) {
        dispatch(setUserDetails({ email, firstName, lastName, otpToken: newToken }))
      }
      setTimer(RESEND_TIMER)
      setOtp(Array(OTP_LENGTH).fill(''))
      setError('')
      toast.success('OTP resent successfully!')
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP.')
    } finally {
      setResendLoading(false)
    }
  }

  const isComplete = otp.every((d) => d !== '')

  return (
    <AuthLayout>
      <div className="woliba-card">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-2">Input verification code</h1>
        <p className="text-xs text-gray-500 text-center mb-6">
          We've sent a 6-digit OTP to your work email. Please enter it below to continue.
        </p>

        <div className="flex gap-2 justify-center mb-3" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              className={`otp-input ${digit ? 'filled' : ''}`}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {error && <p className="text-center text-xs text-red-500 mb-2">{error}</p>}

        <div className="text-center mb-5">
          {timer > 0 ? (
            <span className="text-xs text-gray-500">Resend OTP in {formatTimer(timer)}</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-xs text-woliba-red font-medium hover:underline disabled:opacity-60 flex items-center gap-1 mx-auto"
            >
              {resendLoading && <Spinner size="sm" color="red" />}
              Resend OTP
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex-1 woliba-btn-secondary flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !isComplete}
            className={`flex-1 py-2 px-5 text-sm font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2
              ${isComplete ? 'bg-woliba-red text-white hover:bg-woliba-red-dark' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              disabled:opacity-60`}
          >
            {loading && <Spinner size="sm" color="white" />}
            Submit
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Step3OtpVerify
