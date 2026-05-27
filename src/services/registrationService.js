import apiClient from '../api/apiClient'
import { API_ENDPOINTS } from '../api/endpoints'

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const verifyCompanyRequest = async (payload) => {
  if (USE_MOCK) {
    await delay(1200)
    return {
      status: 'success',
      data: [{ id: 1, company_name: payload.company_name, spouse_or_dependent: 1 }],
    }
  }
  return apiClient.post(API_ENDPOINTS.VERIFY_COMPANY, {
    company_name: payload.company_name,
    password: payload.password,
  })
}

export const saveUserDetailsRequest = async (payload) => {
  if (USE_MOCK) {
    await delay(1200)
    return { status: 'success', data: { message: 'OTP sent successfully!', token: 'mock-otp-token-xyz' } }
  }
  return apiClient.post(API_ENDPOINTS.SAVE_USER_DETAILS, {
    company_id: payload.company_id,
    mail: payload.mail,
    fname: payload.fname,
    lname: payload.lname,
  })
}

export const verifyOtpRequest = async (payload) => {
  if (USE_MOCK) {
    await delay(1000)
    return { status: true, data: 'OTP verified successfully!' }
  }
  return apiClient.post(API_ENDPOINTS.VERIFY_OTP, {
    otp: payload.otp,
    token: payload.token,
  })
}

export const resendOtpRequest = async (payload) => {
  if (USE_MOCK) {
    await delay(800)
    return { status: true, data: { message: 'OTP resent successfully!', token: 'mock-new-token-xyz' } }
  }
  return apiClient.post(API_ENDPOINTS.SEND_OTP, { email: payload.email })
}

export const completeRegistrationRequest = async (payload) => {
  if (USE_MOCK) {
    await delay(1800)
    return {
      status: 'success',
      data: { token: 'mock-user-auth-token', user: { uid: 101, fname: payload.fname, lname: payload.lname, email: payload.email } },
    }
  }
  return apiClient.post(API_ENDPOINTS.USER_REGISTRATION, payload)
}
