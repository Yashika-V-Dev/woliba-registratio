import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { step2Schema } from '../validations/registrationValidations'
import { setUserDetails } from '../redux/slices/registrationSlice'
import { saveUserDetailsRequest } from '../services/registrationService'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const Step2UserDetails = () => {
  const dispatch = useDispatch()
  const { companyId, companyName } = useSelector((s) => s.registration)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(step2Schema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await saveUserDetailsRequest({
        company_id: companyId,
        mail: data.email,
        fname: data.firstName,
        lname: data.lastName,
      })
      const otpToken = res?.data?.token || res?.token
      if (!otpToken) throw new Error('Failed to get OTP token.')
      dispatch(setUserDetails({ email: data.email, firstName: data.firstName, lastName: data.lastName, otpToken }))
      setTimeout(() => {
        toast.success('OTP sent to your email!', { toastId: 'otp-sent' })
      }, 100)
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP. Please try again.')
    }
  }

  return (
    <AuthLayout>
      <div className="woliba-card">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Email ID"
            type="email"
            placeholder="Enter email id"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="First name"
            placeholder="Enter First name"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last name"
            placeholder="Enter Last name"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
          <div>
            <label className="woliba-label">Company name</label>
            <input className="woliba-input bg-gray-50 text-gray-500 cursor-not-allowed" value={companyName} readOnly />
          </div>
          <div className="pt-1">
            <Button type="submit" loading={isSubmitting}>Verify email</Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Step2UserDetails
