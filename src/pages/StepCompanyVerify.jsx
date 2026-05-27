import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { setCompanyName, setCompanyToken, goToNextStep } from '../../redux/slices/registrationSlice'
import { registrationService } from '../../services/registrationService'
import { companyVerifySchema } from '../../validations/schemas'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const StepCompanyVerify = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(companyVerifySchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await registrationService.verifyCompany(data)
      dispatch(setCompanyName(data.companyName))
      dispatch(setCompanyToken(result.token || ''))
      toast.success('Company verified successfully!')
      dispatch(goToNextStep())
    } catch (err) {
      toast.error(err.message || 'Verification failed. Please try again.')
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
              label="Company Name"
              placeholder="Enter Company Name"
              error={errors.companyName?.message}
              {...register('companyName')}
            />

            <Input
              label="Company Password"
              type="password"
              placeholder="Enter Company Password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
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

export default StepCompanyVerify
