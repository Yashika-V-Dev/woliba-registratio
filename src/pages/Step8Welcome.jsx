import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetRegistration } from '../redux/slices/registrationSlice'
import welcomeImg from "../assets/Welcome.png";

const Step8Welcome = () => {
  const dispatch = useDispatch()
  const { firstName, user } = useSelector((s) => s.registration)
  const displayName = firstName || user?.fname || 'there'

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fafaf8 0%, #f5f5f0 100%)' }}
    >
      <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a8e6a3 0%, transparent 70%)', top: '10%', left: '15%' }} />
      <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #b8d4f0 0%, transparent 70%)', top: '5%', right: '20%' }} />
      <div className="absolute w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f5c6cb 0%, transparent 70%)', bottom: '15%', right: '15%' }} />
      <div className="absolute w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffe4b5 0%, transparent 70%)', bottom: '10%', left: '20%' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg animate-[slideUp_0.5s_ease-out]">
        <div className="flex justify-center items-center mb-6">
  <img
    src={welcomeImg}
    alt="Welcome"
    className="w-[220px] sm:w-[280px] md:w-[360px] lg:w-[420px] xl:w-[500px] h-auto object-contain"
  />
</div>

        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Welcome {displayName}!
        </h1>

        <p className="text-[24px] lg:text-[24px] leading-[30px] font-normal text-center text-gray-500 max-w-md mx-auto">
           Welcome to Woliba! You'll find wellness challenges, fitness and recipe videos, and daily tips to support your health goals. Download our iOS or Android app and start your wellbeing journey today.
</p>

        <button
          onClick={() => dispatch(resetRegistration())}
          className=" mt-7 lg:mt-7 px-8 py-2.5 bg-woliba-red text-white text-sm font-medium rounded-md hover:bg-woliba-red-dark transition-colors"
        >
          Let's get Started
        </button>
      </div>
    </div>
  )
}

export default Step8Welcome;