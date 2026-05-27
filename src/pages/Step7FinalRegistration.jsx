import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { setRegistrationComplete, setStep } from '../redux/slices/registrationSlice'
import { setAuth } from '../redux/slices/authSlice'
import { completeRegistrationRequest } from '../services/registrationService'
import FullscreenLoader from '../components/loaders/FullscreenLoader'

const formatDateForApi = (value) => {
  if (!value) return value
  if (typeof value === 'string') return value

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const Step7FinalRegistration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const called = useRef(false)
  const state = useSelector((s) => s.registration)

  useEffect(() => {
    if (called.current) return
    called.current = true

    const register = async () => {
      try {
        dispatch(setStep(7))

        const res = await completeRegistrationRequest({
          fname: state.firstName,
          lname: state.lastName,
          password: state.password,
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          token: state.otpToken,
          areas_of_interest: state.selectedInterests,
          wellbeing_pillars: state.selectedPillars,
          accepted_privacy_policy: true,
          birthday: formatDateForApi(state.dateOfBirth),
          phone_number: state.contactNumber,
          user_type: 0,
          language_id: 1,
        })

        if (res?.data?.token) {
          localStorage.setItem('woliba_token', res.data.token)
          dispatch(setAuth({ token: res.data.token, user: res.data.user }))
        }

        dispatch(setRegistrationComplete({ token: res?.data?.token, user: res?.data?.user }))
        toast.success('Registration completed successfully!')
              navigate("/register/welcome");

      } catch (err) {
        const msg = err.message || 'Registration failed.'
        if (msg.toLowerCase().includes('otp') || msg.toLowerCase().includes('expired')) {
          toast.error('Session expired. Please verify OTP again.')
          dispatch(setStep(3))
        } else {
          toast.error(msg)
          dispatch(setStep(6))
        }
      }
    }

    register()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <FullscreenLoader message="Completing your registration..." />
}

export default Step7FinalRegistration
