
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchInterests } from '../redux/slices/interestsSlice'
import { setSelectedInterests, setInterestsDone, setStep } from '../redux/slices/registrationSlice'
import Button from '../components/common/Button'

const CLOUDFRONT_BASE = 'https://d38xnw03cl4zf4.cloudfront.net'

const ChevronDown = ({ open }) => (
  <svg
    className={`w-4 h-4 text-woliba-red flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const InterestChip = ({ item, selected, onToggle }) => {
  const iconUrl = selected
    ? `${CLOUDFRONT_BASE}/${item.interest_white_icon}`
    : `${CLOUDFRONT_BASE}/${item.interest_color_icon || item.interest_icon}`

  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      style={selected ? { backgroundColor: '#C8515A', borderColor: '#C8515A' } : {}}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap flex-shrink-0
        ${selected
          ? 'text-white'
          : 'bg-white text-gray-700 border-gray-200 hover:border-woliba-red/40 hover:text-woliba-red'
        }`}
    >
      <img
        src={iconUrl}
        alt=""
        className="w-4 h-4 object-contain"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      {item.name}
    </button>
  )
}

const CategoryRow = ({ category, items, selected, onToggle, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen)
  const selectedCount = items.filter((i) => selected.includes(i.id)).length

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-0 py-3 text-left hover:bg-transparent group"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{category}</span>
          {selectedCount > 0 && (
            <span className="bg-woliba-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDown open={open} />
      </button>

      {open && (
        <div className="pb-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <InterestChip
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const SkeletonRows = () => (
  <div className="space-y-3">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="skeleton h-10 w-full rounded" />
    ))}
  </div>
)

const Step5Interests = () => {
  const dispatch = useDispatch()
  const { interests, loadingInterests } = useSelector((s) => s.interests)
  const savedInterests = useSelector((s) => s.registration.selectedInterests)
  const [selected, setSelected] = useState(savedInterests || [])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!interests.length) dispatch(fetchInterests())
  }, [dispatch, interests.length])

  const grouped = interests.reduce((acc, item) => {
    const type = item.interest_type || 'Other Sports'
    if (!acc[type]) acc[type] = []
    acc[type].push(item)
    return acc
  }, {})

  const categories = Object.keys(grouped)
  const toggle = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const handleNext = async () => {
    if (!selected.length) { toast.warning('Please select at least one interest.'); return }
    setSaving(true)
    dispatch(setSelectedInterests(selected))
    dispatch(setInterestsDone())
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col">
      <BackgroundLayer />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <WolibaLogo />
        <LangSelector />
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-4 relative z-10">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-[slideUp_0.35s_ease-out]">

          <div className={`mb-4 px-4 py-2.5 rounded border text-sm font-medium text-center
            ${selected.length > 0
              ? 'bg-green-50 border-green-400 text-green-700'
              : 'bg-transparent border-woliba-red text-gray-700'
            }`}
          >
            {selected.length > 0
              ? `${selected.length} interest${selected.length !== 1 ? 's' : ''} selected ✓`
              : 'Select all wellness interests that apply — at least one is required.'}
          </div>

          {loadingInterests ? (
            <SkeletonRows />
          ) : (
            <div className="divide-y divide-gray-100">
              {categories.map((cat, idx) => (
                <CategoryRow
                  key={cat}
                  category={cat}
                  items={grouped[cat]}
                  selected={selected}
                  onToggle={toggle}
                  defaultOpen={idx === 0}
                />
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={() => dispatch(setStep(4))}
              className="woliba-btn-secondary flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <Button type="button" loading={saving} className="flex-1" onClick={handleNext}>
              Next
            </Button>
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

const WolibaLogo = () => (
  <div className="flex items-center">
    <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
      <text x="0" y="22" fontFamily="'DM Sans', sans-serif" fontSize="24" fontWeight="700" fill="#1a1a1a">
        w<tspan fill="#C8515A">o</tspan>liba
      </text>
    </svg>
  </div>
)

const LangSelector = () => (
  <div className="flex items-center gap-2 text-xs text-gray-500">
    <span>Language:</span>
    <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white cursor-pointer">
      <span>🇺🇸</span>
      <span className="font-medium">En</span>
      <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
)

const BackgroundLayer = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { top: '8px', left: '40px', color: '#C8515A' },
      { top: '6px', right: '100px', color: '#8bc34a' },
      { bottom: '60px', left: '20px', color: '#C8515A' },
      { bottom: '40px', right: '40px', color: '#8bc34a' },
      { top: '30%', right: '20px', color: '#C8515A' },
    ].map((s, i) => (
      <svg key={i} style={{ position: 'absolute', opacity: 0.07, ...s }} width="70" height="90" viewBox="0 0 80 100" fill="none">
        <circle cx="40" cy="12" r="8" stroke={s.color} strokeWidth="1.5" fill="none" />
        <line x1="40" y1="20" x2="40" y2="55" stroke={s.color} strokeWidth="1.5" />
        <line x1="20" y1="38" x2="60" y2="38" stroke={s.color} strokeWidth="1.5" />
        <line x1="40" y1="55" x2="25" y2="80" stroke={s.color} strokeWidth="1.5" />
        <line x1="40" y1="55" x2="55" y2="80" stroke={s.color} strokeWidth="1.5" />
      </svg>
    ))}
  </div>
)

export default Step5Interests