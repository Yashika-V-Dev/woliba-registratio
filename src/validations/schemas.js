import * as Yup from 'yup'

export const companySchema = Yup.object({
  companyName: Yup.string().required('Company name is required').min(2, 'Too short'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'At least 1 uppercase letter')
    .matches(/[0-9]/, 'At least 1 number')
})

export const userDetailsSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email format'),
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z\s]+$/, 'No numbers or special characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[a-zA-Z\s]+$/, 'No numbers or special characters'),
  companyName: Yup.string()
})

export const credentialsSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'At least 1 uppercase letter')
    .matches(/[0-9]/, 'At least 1 number')
    .matches(/[^a-zA-Z0-9]/, 'At least 1 special character'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  dob: Yup.string().required('Date of birth is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number'),
  workAnniversary: Yup.string(),
  terms: Yup.boolean().oneOf([true], 'You must accept terms and conditions')
})
