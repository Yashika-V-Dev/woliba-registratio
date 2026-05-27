import React, { useState } from 'react'
import Modal from './Modal'
import Calendar from './Calendar'

const DateInput = ({ label, error, value, onChange, placeholder, required }) => {
  const [open, setOpen] = useState(false)

  const displayValue = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const handleSelect = (date) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="woliba-label">
          {label}
          {required && <span className="text-woliba-red ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          readOnly
          value={displayValue}
          placeholder={placeholder || 'Select date (MM/DD/YYYY)'}
          onClick={() => setOpen(true)}
          className={`woliba-input cursor-pointer pr-10 ${error ? 'woliba-input-error' : ''}`}
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-woliba-red transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      {error && <p className="woliba-error">{error}</p>}

      <Modal isOpen={open} onClose={() => setOpen(false)} size="sm">
        <Calendar value={value} onChange={handleSelect} onClose={() => setOpen(false)} />
      </Modal>
    </div>
  )
}

export default DateInput
