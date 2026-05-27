import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStep: 1,
  companyId: null,
  companyName: '',
  email: '',
  firstName: '',
  lastName: '',
  otpToken: null,
  authToken: null,
  user: null,
  selectedInterests: [],
  selectedPillars: [],
  registrationComplete: false,
}

const serializeDate = (value) => {
  if (!value || typeof value === 'string') return value

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const normalizeRegistrationDates = (state) => {
  if (state.dateOfBirth) state.dateOfBirth = serializeDate(state.dateOfBirth)
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep: (state, action) => {
      normalizeRegistrationDates(state)
      state.currentStep = action.payload
    },
    setCompanyVerified: (state, action) => {
      state.companyId = action.payload.companyId
      state.companyName = action.payload.companyName
      state.currentStep = 2
    },
    setUserDetails: (state, action) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.otpToken = action.payload.otpToken
      state.currentStep = 3
    },
    setOtpVerified: (state) => {
      normalizeRegistrationDates(state)
      state.currentStep = 4
    },
    setCredentialsSaved: (state, action) => {
      state.currentStep = 5
      if (action.payload?.password) state.password = action.payload.password
      if (action.payload?.dateOfBirth) state.dateOfBirth = serializeDate(action.payload.dateOfBirth)
      if (action.payload?.contactNumber) state.contactNumber = action.payload.contactNumber
    },
    setSelectedInterests: (state, action) => { state.selectedInterests = action.payload },
    setInterestsDone: (state) => {
      normalizeRegistrationDates(state)
      state.currentStep = 6
    },
    setSelectedPillars: (state, action) => { state.selectedPillars = action.payload },
    setPillarsDone: (state) => {
      normalizeRegistrationDates(state)
      state.currentStep = 7
    },
    setRegistrationComplete: (state, action) => {
      normalizeRegistrationDates(state)
      state.registrationComplete = true
      state.authToken = action.payload?.token
      state.user = action.payload?.user
      state.currentStep = 8
    },
    resetRegistration: () => initialState,
  },
})

export const {
  setStep,
  setCompanyVerified,
  setUserDetails,
  setOtpVerified,
  setCredentialsSaved,
  setSelectedInterests,
  setInterestsDone,
  setSelectedPillars,
  setPillarsDone,
  setRegistrationComplete,
  resetRegistration,
} = registrationSlice.actions

export default registrationSlice.reducer
