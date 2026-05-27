import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { setUserDetails, goToNextStep } from '../../redux/slices/registrationSlice'
import { registrationService } from '../../services/registrationService'
import { userDetailsSchema } from '../../validations/schemas'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const StepUserDetails = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { companyName } = useSelector((state) => state.registration)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userDetailsSchema),
    defaultValues: { companyName },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await registrationService.saveUserDetails({
        ...data,
        companyName,
      })
      dispatch(setUserDetails({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName,
      }))
      toast.success('OTP sent to your email!')
      dispatch(goToNextStep())
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm page-transition">
        <div className="woliba-card px-8 py-8">
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Registration</h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
              <input
                value={companyName}
                readOnly
                className="woliba-input bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Verify email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StepUserDetails
