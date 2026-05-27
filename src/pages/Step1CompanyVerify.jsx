import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { step1Schema } from '../validations/registrationValidations'
import { setCompanyVerified } from '../redux/slices/registrationSlice'
import { verifyCompanyRequest } from '../services/registrationService'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/common/Input'
import PasswordInput from '../components/common/PasswordInput'
import Button from '../components/common/Button'

const Step1CompanyVerify = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(step1Schema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await verifyCompanyRequest({ company_name: data.companyName, password: data.password })
      const company = res?.data?.[0]
      if (!company) throw new Error('Company not found.')
      dispatch(setCompanyVerified({ companyId: company.id, companyName: company.company_name }))
     navigate("/register/user-details")
    } catch (err) {
      toast.error(err.message || 'Verification failed. Please try again.')
    }
  }

  return (
    <AuthLayout>
      <div className="woliba-card">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Company Name"
            placeholder="Enter Company Name"
            error={errors.companyName?.message}
            {...register('companyName')}
          />
          <PasswordInput
            label="Company Password"
            placeholder="Enter Company Password"
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="pt-1">
            <Button type="submit" loading={isSubmitting}>Next</Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Step1CompanyVerify
