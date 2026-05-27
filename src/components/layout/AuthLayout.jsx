import React from "react";
import WolibaLogo from "../common/WolibaLogo";
import BackgroundCharacters from "../common/BackgroundCharacters";

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col">
    <BackgroundCharacters />
    <header className="relative z-10 flex items-center justify-between px-6 py-4">
      <WolibaLogo />
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>Language:</span>
        <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white cursor-pointer hover:border-gray-300 transition-colors">
          <span>🇺🇸</span>
          <span className="font-medium">En</span>
          <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
    <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
      <div className="w-full max-w-md animate-[slideUp_0.35s_ease-out]">
        {children}
      </div>
    </main>
    <footer className="relative z-10 flex items-center justify-center gap-4 py-4">
      <button type="button" className="text-xs text-woliba-red hover:underline bg-transparent border-0 cursor-pointer p-0">Terms of Use</button>
      <button type="button" className="text-xs text-woliba-red hover:underline bg-transparent border-0 cursor-pointer p-0">Contact Us</button>
    </footer>
  </div>
);

export default AuthLayout;
