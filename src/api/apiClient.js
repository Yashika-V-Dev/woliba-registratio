import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://dev.woliba.io/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: window.location.origin,
    Referer: window.location.href,
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('woliba_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const responseData = error.response?.data
    const message =
      responseData?.message ||
      responseData?.error ||
      error.message ||
      'Something went wrong'
    if (error.response?.status === 401) localStorage.removeItem('woliba_token')

    const apiError = new Error(message)
    apiError.response = error.response
    apiError.status = error.response?.status
    apiError.code = responseData?.code

    return Promise.reject(apiError)
  }
)

export default apiClient
