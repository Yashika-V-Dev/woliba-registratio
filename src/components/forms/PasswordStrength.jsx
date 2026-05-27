import React from 'react'
import { getPasswordStrength } from '../../validations/schemas'

const PasswordStrength = ({ password }) => {
  const strength = getPasswordStrength(password)
  if (!password) return null

  const bars = [1, 2, 3, 4, 5]

  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {bars.map((bar) => (
          <div
            key={bar}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: bar <= strength.score ? strength.color : '#e5e7eb',
            }}
          />
        ))}
      </div>
      <p className="text-xs font-medium" style={{ color: strength.color }}>
        {strength.label}
      </p>
    </div>
  )
}

export default PasswordStrength
