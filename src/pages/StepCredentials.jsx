import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { setCredentials, goToNextStep, goToPrevStep } from '../../redux/slices/registrationSlice'
import { credentialsSchema } from '../../validations/schemas'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import DateInput from '../../components/common/DateInput'
import PasswordStrength from '../../components/forms/PasswordStrength'

const StepCredentials = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [dob, setDob] = useState('')
  const [dobError, setDobError] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(credentialsSchema),
  })

  const password = watch('password', '')

  const handleDobChange = (date) => {
    setDob(date)
    setValue('dateOfBirth', date, { shouldValidate: true })
    setDobError('')
  }

  const onSubmit = async (data) => {
    if (!dob) {
      setDobError('Date of birth is required')
      return
    }
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      dispatch(setCredentials({
        password: data.password,
        dateOfBirth: dob,
        phoneNumber: data.phoneNumber,
        workAnniversary: data.workAnniversary || '',
        termsAccepted: data.termsAccepted,
      }))
      dispatch(goToNextStep())
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm page-transition">
        <div className="woliba-card px-8 py-8">
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Login Credentials
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
              <PasswordStrength password={password} />
            </div>

            <Input
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <DateInput
              label="Birthday"
              value={dob}
              onChange={handleDobChange}
              placeholder="Select date (MM/DD/YYYY)"
              error={errors.dateOfBirth?.message || dobError}
              required
            />

            <Input
              label="Contact number"
              type="tel"
              placeholder="Enter contact number"
              error={errors.phoneNumber?.message}
              {...register('phoneNumber')}
            />

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-woliba-red focus:ring-woliba-red/30 cursor-pointer accent-woliba-red"
                {...register('termsAccepted')}
              />
              <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
                I agree to Woliba{' '}
                <a href="#" className="text-woliba-red hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-woliba-red hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="woliba-error -mt-2">{errors.termsAccepted.message}</p>
            )}

            <div className="flex items-center gap-3 pt-1">
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
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StepCredentials
