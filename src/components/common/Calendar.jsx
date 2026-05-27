import React, { useState } from 'react'
import Button from './Button'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']

const Calendar = ({ value, onChange, onClose }) => {
  const today = new Date()
  const parsed = value ? new Date(value) : null

  const [viewYear, setViewYear] = useState(parsed?.getFullYear() || today.getFullYear())
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? today.getMonth())
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)

  const startOfMonth = new Date(viewYear, viewMonth, 1)
  const endOfMonth = new Date(viewYear, viewMonth + 1, 0)
  const startDay = (startOfMonth.getDay() + 6) % 7

  const yearOptions = Array.from({ length: 100 }, (_, i) => today.getFullYear() - i)

  const getDaysArray = () => {
    const days = []
    for (let i = 0; i < startDay; i++) {
      const d = new Date(viewYear, viewMonth, -startDay + i + 1)
      days.push({ date: d, other: true })
    }
    for (let d = 1; d <= endOfMonth.getDate(); d++) {
      days.push({ date: new Date(viewYear, viewMonth, d), other: false })
    }
    const remaining = 42 - days.length
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: new Date(viewYear, viewMonth + 1, d), other: true })
    }
    return days
  }

  const handleSelect = (date) => {
    if (!date.other) {
      const formatted = `${date.date.getFullYear()}-${String(date.date.getMonth() + 1).padStart(2, '0')}-${String(date.date.getDate()).padStart(2, '0')}`
      onChange(formatted)
    }
  }

  const isSelected = (date) => {
    if (!parsed) return false
    return date.getFullYear() === parsed.getFullYear() &&
      date.getMonth() === parsed.getMonth() &&
      date.getDate() === parsed.getDate()
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1) }
    else setViewMonth(v => v - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1) }
    else setViewMonth(v => v + 1)
  }

  return (
    <div className="custom-calendar w-72 select-none">
      <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">Select date</h3>

      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => { setShowMonthPicker(v => !v); setShowYearPicker(false) }}
            className="text-sm font-medium text-gray-700 hover:text-woliba-red px-1 transition-colors"
          >
            {MONTHS[viewMonth]}
          </button>
          <button
            onClick={() => { setShowYearPicker(v => !v); setShowMonthPicker(false) }}
            className="text-sm font-medium text-gray-700 hover:text-woliba-red px-1 transition-colors"
          >
            {viewYear}
          </button>
        </div>

        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {showYearPicker && (
        <div className="h-48 overflow-y-auto scrollbar-hide mb-3 border border-gray-100 rounded-lg">
          {yearOptions.map(year => (
            <button
              key={year}
              onClick={() => { setViewYear(year); setShowYearPicker(false) }}
              className={`w-full text-center py-1.5 text-sm transition-colors ${viewYear === year ? 'bg-woliba-red text-white font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {showMonthPicker && (
        <div className="grid grid-cols-2 gap-1 mb-3 border border-gray-100 rounded-lg p-2">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => { setViewMonth(i); setShowMonthPicker(false) }}
              className={`text-center py-1.5 text-xs rounded-lg transition-colors ${viewMonth === i ? 'bg-woliba-red text-white font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {!showYearPicker && !showMonthPicker && (
        <>
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {getDaysArray().map(({ date, other }, i) => (
              <div
                key={i}
                onClick={() => handleSelect({ date, other })}
                className={`cal-day mx-auto mb-0.5 ${other ? 'cal-day-other' : ''} ${isSelected(date) && !other ? 'cal-day-selected' : ''}`}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-4">
        <Button variant="primary" fullWidth size="sm" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  )
}

export default Calendar
