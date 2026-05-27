import React, { useRef, useState, useEffect } from 'react'

const OtpInput = ({ length = 6, value, onChange, disabled }) => {
  const inputs = useRef([])
  const [digits, setDigits] = useState(Array(length).fill(''))

  useEffect(() => {
    if (inputs.current[0]) inputs.current[0].focus()
  }, [])

  useEffect(() => {
    onChange(digits.join(''))
  }, [digits])

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = val
    setDigits(next)
    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits]
        next[index] = ''
        setDigits(next)
      } else if (index > 0) {
        inputs.current[index - 1]?.focus()
        const next = [...digits]
        next[index - 1] = ''
        setDigits(next)
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < length - 1) inputs.current[index + 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array(length).fill('')
    pasted.split('').forEach((char, i) => { next[i] = char })
    setDigits(next)
    const focusIdx = Math.min(pasted.length, length - 1)
    inputs.current[focusIdx]?.focus()
  }

  return (
    <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`otp-input ${digit ? 'filled' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  )
}

export default OtpInput
