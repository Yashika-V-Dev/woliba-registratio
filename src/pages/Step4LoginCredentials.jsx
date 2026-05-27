import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { step4Schema } from '../validations/registrationValidations'
import { setCredentialsSaved } from '../redux/slices/registrationSlice'
import AuthLayout from '../components/layout/AuthLayout'
import PasswordInput from '../components/common/PasswordInput'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import DatePickerModal from '../components/common/DatePickerModal'
import { useNavigate } from "react-router-dom";


const CalendarIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

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

const Step4LoginCredentials = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showDatePicker, setShowDatePicker] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(step4Schema),
    defaultValues: { agreeTerms: false },
  })

  const dobValue = watch('dateOfBirth')
  const contactNumberField = register('contactNumber', {
    onChange: (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
    },
  })

  const onSubmit = async (data) => {
    try {
      dispatch(setCredentialsSaved({
        password: data.password,
        dateOfBirth: formatDateForApi(data.dateOfBirth),
        contactNumber: data.contactNumber,
      }))
       navigate("/register/interests");
       
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <AuthLayout>
      <div className="woliba-card">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Login Credentials</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div>
            <label className="woliba-label">Birthdate</label>
            <div className="relative">
              <input
                readOnly
                placeholder="Select date (MM/DD/YYYY)"
                value={dobValue ? new Date(dobValue).toLocaleDateString('en-US') : ''}
                className={`woliba-input pr-10 cursor-pointer ${errors.dateOfBirth ? 'border-red-400' : ''}`}
                onClick={() => setShowDatePicker(true)}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowDatePicker(true)}>
                <CalendarIcon />
              </button>
            </div>
            {errors.dateOfBirth && <p className="woliba-error">{errors.dateOfBirth.message}</p>}
          </div>

          <Input
            label="Contact number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter contact number"
            error={errors.contactNumber?.message}
            {...contactNumberField}
          />

          <div>
            <label className="woliba-label">
              Work Anniversary <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input type="text" placeholder="MM/DD/YYYY" className="woliba-input" />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="agreeTerms" className="mt-0.5 accent-woliba-red" {...register('agreeTerms')} />
            <label htmlFor="agreeTerms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
              I agree to Woliba's{' '}
              <button type="button" className="text-woliba-red hover:underline p-0 bg-transparent border-0 cursor-pointer text-xs">Terms of Service</button>
              {' '}and{' '}
              <button type="button" className="text-woliba-red hover:underline p-0 bg-transparent border-0 cursor-pointer text-xs">Privacy Policy</button>
            </label>
          </div>
          {errors.agreeTerms && <p className="woliba-error -mt-2">{errors.agreeTerms.message}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => dispatch({ type: 'registration/setStep', payload: 3 })}
              className="woliba-btn-secondary flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <Button type="submit" loading={isSubmitting} className="flex-1">Next</Button>
          </div>
        </form>
      </div>

      {showDatePicker && (
        <DatePickerModal
          value={dobValue}
          onChange={(val) => { setValue('dateOfBirth', val, { shouldValidate: true }) }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </AuthLayout>
  )
}

export default Step4LoginCredentials
