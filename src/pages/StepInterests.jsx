import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setSelectedInterests, goToNextStep, goToPrevStep } from '../../redux/slices/registrationSlice'
import { fetchInterests } from '../../redux/slices/interestsSlice'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/common/Button'
import { SkeletonGrid } from '../../components/loaders/Loader'

const StepInterests = () => {
  const dispatch = useDispatch()
  const { interests, loadingInterests } = useSelector((state) => state.interests)
  const { selectedInterests } = useSelector((state) => state.registration)

  useEffect(() => {
    if (!interests.length) dispatch(fetchInterests())
  }, [])

  const toggleInterest = (interest) => {
    const isSelected = selectedInterests.some((i) => i.id === interest.id)
    if (isSelected) {
      dispatch(setSelectedInterests(selectedInterests.filter((i) => i.id !== interest.id)))
    } else {
      dispatch(setSelectedInterests([...selectedInterests, interest]))
    }
  }

  const handleNext = () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest')
      return
    }
    dispatch(goToNextStep())
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl page-transition">
        <div className="woliba-card px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-1.5">Select Your Interests</h1>
            <p className="text-sm text-gray-500">
              Choose activities that inspire your wellness journey
            </p>
            {selectedInterests.length > 0 && (
              <span className="inline-block mt-2 text-xs font-medium text-woliba-red bg-woliba-red/10 px-3 py-1 rounded-full">
                {selectedInterests.length} selected
              </span>
            )}
          </div>

          {loadingInterests ? (
            <SkeletonGrid count={8} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {interests.map((interest) => {
                const isSelected = selectedInterests.some((i) => i.id === interest.id)
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`interest-card relative border rounded-xl p-4 text-left transition-all ${
                      isSelected
                        ? 'border-woliba-red bg-gradient-to-br from-woliba-red/5 to-white shadow-sm'
                        : 'border-gray-100 bg-white hover:border-woliba-red/40'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-woliba-red rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="text-2xl mb-2">{interest.icon}</div>
                    <p className={`text-sm font-medium ${isSelected ? 'text-woliba-red' : 'text-gray-700'}`}>
                      {interest.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{interest.category}</p>
                  </button>
                )
              })}
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => dispatch(goToPrevStep())}
              className="flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Button>
            <Button variant="primary" fullWidth onClick={handleNext}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StepInterests
