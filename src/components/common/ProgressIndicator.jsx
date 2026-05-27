import React from 'react'

const STEPS = [
  { n: 1, label: 'Company' },
  { n: 2, label: 'Details' },
  { n: 3, label: 'OTP' },
  { n: 4, label: 'Credentials' },
  { n: 5, label: 'Interests' },
  { n: 6, label: 'Pillars' },
  { n: 7, label: 'Finalizing' },
  { n: 8, label: 'Welcome' },
]

const ProgressIndicator = ({ currentStep }) => {
  if (currentStep === 8) return null

  return (
    <div className="flex items-center justify-center gap-1.5 mb-4">
      {STEPS.slice(0, 7).map(({ n }) => (
        <div
          key={n}
          className={`rounded-full transition-all duration-300 ${
            n < currentStep
              ? 'w-5 h-1.5 bg-woliba-red'
              : n === currentStep
              ? 'w-5 h-1.5 bg-woliba-red'
              : 'w-3 h-1.5 bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export default ProgressIndicator
