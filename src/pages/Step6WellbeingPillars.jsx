import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchPillars } from '../redux/slices/interestsSlice'
import { setSelectedPillars, setPillarsDone, setStep } from '../redux/slices/registrationSlice'
import BackgroundCharacters from '../components/common/BackgroundCharacters'
import WolibaLogo from '../components/common/WolibaLogo'

const MAX = 3

const PillarItem = ({ pillar, checked, disabled, order, onToggle }) => (
  <button
    type="button"
    onClick={() => !disabled && onToggle(pillar.id)}
    disabled={disabled}
    className={`flex items-start gap-2.5 text-left w-full py-2 px-1 rounded-lg transition-all
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
  >
    <div className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors
      ${checked ? 'bg-woliba-red border-woliba-red' : 'border-gray-300 bg-white'}`}
    >
      {checked && (
        order
          ? <span className="text-white text-[9px] font-bold leading-none">{order}</span>
          : <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
      )}
    </div>
    <div>
      <p className={`text-sm font-medium leading-tight ${checked ? 'text-woliba-red' : 'text-gray-800'}`}>
        {pillar.pillar_title}
      </p>
      {pillar.description && (
        <p className="text-xs text-gray-400 mt-0.5 leading-snug">{pillar.description}</p>
      )}
    </div>
  </button>
)

const Step6WellbeingPillars = () => {
  const dispatch = useDispatch()
  const { pillars, loadingPillars } = useSelector((s) => s.interests)
  const savedPillars = useSelector((s) => s.registration.selectedPillars)
  const [selected, setSelected] = useState(savedPillars || [])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!pillars.length) dispatch(fetchPillars())
  }, [dispatch, pillars.length])

  const toggle = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((x) => x !== id))
    else if (selected.length < MAX) setSelected([...selected, id])
  }

  const handleDone = () => {
    if (selected.length !== MAX) { toast.warning(`Please select exactly ${MAX} wellbeing pillars.`); return }
    setSaving(true)
    dispatch(setSelectedPillars(selected))
    dispatch(setPillarsDone())
    setSaving(false)
  }

  const active = pillars.filter((p) => p.is_active !== 0)
  const col1 = active.filter((_, i) => i % 3 === 0)
  const col2 = active.filter((_, i) => i % 3 === 1)
  const col3 = active.filter((_, i) => i % 3 === 2)

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col">
      <BackgroundCharacters />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <WolibaLogo />
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Language:</span>
          <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white cursor-pointer">
            <span>🇺🇸</span><span className="font-medium">En</span>
            <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-4 relative z-10">
        <div
          className="
    w-full
    max-w-[1412px]
    lg : min-h-[518px]

    bg-white
    border border-gray-100
    rounded-2xl

    px-4 py-5
    sm:px-6 sm:py-6
    lg:px-4 lg:py-5

    shadow-sm
    animate-[slideUp_0.35s_ease-out]
  "
        >
          <h1
            className="
    text-lg
    sm:text-xl
    lg:text-2xl

    font-semibold
    text-gray-800
    text-center

    mb-6
  "
          >
            Select any 3 well-being pillars goal you want to achieve
          </h1>

          {loadingPillars ? (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="skeleton h-14 rounded" />)}
            </div>
          ) : (
            <div
              className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3

    gap-5
    lg:gap-8
  "
            >
              {[col1, col2, col3].map((col, ci) => (
                <div key={ci} className="flex flex-col divide-y divide-gray-50">
                  {col.map((pillar) => {
                    const isChecked = selected.includes(pillar.id)
                    const isDisabled = !isChecked && selected.length >= MAX
                    const order = isChecked ? selected.indexOf(pillar.id) + 1 : null
                    return (
                      <PillarItem
                        key={pillar.id}
                        pillar={pillar}
                        checked={isChecked}
                        disabled={isDisabled}
                        order={order}
                        onToggle={toggle}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          )}

          <div
            className="
    flex
    flex-col
    sm:flex-row

    gap-3
    justify-center

    mt-8
  "
          >
            <button
              type="button"
              onClick={() => dispatch(setStep(5))}
              className="woliba-btn-secondary flex items-center gap-1.5 px-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              type="button"
              onClick={handleDone}
              disabled={saving || selected.length !== MAX}
              className={`px-10 py-2.5 text-sm font-medium rounded-md transition-all duration-200
                ${selected.length === MAX
                  ? 'bg-woliba-red text-white hover:bg-woliba-red-dark'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Done
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-center gap-4 py-4">
        <button type="button" className="text-xs text-woliba-red hover:underline bg-transparent border-0 cursor-pointer">Terms of Use</button>
        <button type="button" className="text-xs text-woliba-red hover:underline bg-transparent border-0 cursor-pointer">Contact Us</button>
      </footer>
    </div>
  )
}

export default Step6WellbeingPillars;