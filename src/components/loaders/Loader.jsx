import React from 'react'

export const Spinner = ({ size = 'md', color = '#C8374A' }) => {
  const sizes = { sm: 16, md: 24, lg: 36, xl: 48 }
  const px = sizes[size] || sizes.md

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke={color} strokeWidth="3" />
      <path className="opacity-90" fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export const FullscreenLoader = ({ message = 'Processing...' }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-woliba-red/20 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-woliba-red border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-gray-800 font-medium text-base">{message}</p>
        <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  </div>
)

export const SkeletonCard = () => (
  <div className="border border-gray-100 rounded-xl p-4 animate-pulse">
    <div className="skeleton h-10 w-10 rounded-lg mb-3" />
    <div className="skeleton h-3.5 w-20 rounded mb-2" />
    <div className="skeleton h-3 w-14 rounded" />
  </div>
)

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
)

export default Spinner
