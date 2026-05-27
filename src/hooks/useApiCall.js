import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, setError } from '../redux/slices/registrationSlice'

export const useApiCall = () => {
  const dispatch = useDispatch()
  const [localLoading, setLocalLoading] = useState(false)
  const [localError, setLocalError] = useState(null)

  const execute = useCallback(async (fn, options = {}) => {
    const { useGlobalLoading = false } = options
    try {
      setLocalLoading(true)
      setLocalError(null)
      if (useGlobalLoading) dispatch(setLoading(true))

      const result = await fn()
      return { data: result, error: null }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred'
      setLocalError(errorMessage)
      if (useGlobalLoading) dispatch(setError(errorMessage))
      return { data: null, error: errorMessage }
    } finally {
      setLocalLoading(false)
      if (useGlobalLoading) dispatch(setLoading(false))
    }
  }, [dispatch])

  return { execute, loading: localLoading, error: localError }
}

export const useTimer = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const start = useCallback(() => {
    setSeconds(initialSeconds)
    setIsRunning(true)
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [initialSeconds])

  const reset = useCallback(() => {
    setSeconds(initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return { seconds, isRunning, start, reset, formatted: formatTime(seconds) }
}

export const useStepGuard = (requiredStep) => {
  const currentStep = useSelector((state) => state.registration.currentStep)
  return currentStep >= requiredStep
}
