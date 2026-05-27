import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setSelectedPillars, goToNextStep, goToPrevStep } from '../../redux/slices/registrationSlice'
import { fetchPillars } from '../../redux/slices/interestsSlice'
import AuthLayout from '../../components/layout/AuthLayout'
import Button from '../../components/common/Button'
import { SkeletonGrid } from '../../components/loaders/Loader'

const MAX_PILLARS = 3

const StepPillars = () => {
  const dispatch = useDispatch()
  const { pillars, loadingPillars } = useSelector((state) => state.interests)
  const { selectedPillars } = useSelector((state) => state.registration)

  useEffect(() => {
    if (!pillars.length) dispatch(fetchPillars())
  }, [])

  const togglePillar = (pillar) => {
    const isSelected = selectedPillars.some((p) => p.id === pillar.id)
    if (isSelected) {
      dispatch(setSelectedPillars(selectedPillars.filter((p) => p.id !== pillar.id)))
    } else {
      if (selectedPillars.length >= MAX_PILLARS) {
        toast.error(`You can select maximum ${MAX_PILLARS} pillars`)
        return
      }
      dispatch(setSelectedPillars([...selectedPillars, pillar]))
    }
  }

  const handleNext = () => {
    if (selectedPillars.length !== MAX_PILLARS) {
      toast.error(`Please select exactly ${MAX_PILLARS} wellbeing pillars`)
      return
    }
    dispatch(goToNextStep())
  }

  const isMaxReached = selectedPillars.length >= MAX_PILLARS

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl page-transition">
        <div className="woliba-card px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-1.5">Wellbeing Pillars</h1>
            <p className="text-sm text-gray-500 mb-3">
              Choose exactly 3 pillars that matter most to your wellbeing
            </p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    selectedPillars.length >= n
                      ? 'bg-woliba-red text-white scale-110'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {n}
                </div>
              ))}
              <span className="text-xs text-gray-500 ml-1">
                {selectedPillars.length}/{MAX_PILLARS} selected
              </span>
            </div>
          </div>

          {loadingPillars ? (
            <SkeletonGrid count={8} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {pillars.map((pillar) => {
                const isSelected = selectedPillars.some((p) => p.id === pillar.id)
                const isDisabled = !isSelected && isMaxReached

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => togglePillar(pillar)}
                    disabled={isDisabled}
                    className={`pillar-card relative border rounded-xl p-4 text-left transition-all ${
                      isSelected
                        ? 'border-woliba-red bg-gradient-to-br from-woliba-red/5 to-white shadow-sm'
                        : isDisabled
                        ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-100 bg-white hover:border-woliba-red/40 cursor-pointer'
                    }`}
                    aria-pressed={isSelected}
                    aria-disabled={isDisabled}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-woliba-red rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="text-2xl mb-2">{pillar.icon}</div>
                    <p className={`text-sm font-medium ${isSelected ? 'text-woliba-red' : 'text-gray-700'}`}>
                      {pillar.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{pillar.description}</p>
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
            <Button
              variant="primary"
              fullWidth
              onClick={handleNext}
              disabled={selectedPillars.length !== MAX_PILLARS}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StepPillars
