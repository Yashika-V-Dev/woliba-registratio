import React, { useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_SHORT = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const DatePickerModal = ({ value, onChange, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const initialDate = value ? new Date(value) : new Date(2007, 0, 1);
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(value ? initialDate.getDate() : null);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const years = Array.from({ length: 101 }, (_, i) => today.getFullYear() - 100 + i);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };

  const daysInMonth = getDaysInMonth(viewMonth, viewYear);
  const firstDay = getFirstDayOfMonth(viewMonth, viewYear);

  const isFutureDate = (year, month, day) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date > today;
  };

  const handleDone = () => {
    if (selectedDay && !isFutureDate(viewYear, viewMonth, selectedDay)) {
      const month = String(viewMonth + 1).padStart(2, "0");
      const day = String(selectedDay).padStart(2, "0");
      onChange(`${viewYear}-${month}-${day}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-5 w-72 animate-[scaleIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center">Select date</h3>

        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-woliba-red transition-colors"
            onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
          >
            {MONTHS[viewMonth]}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-woliba-red transition-colors"
            onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
          >
            {viewYear}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        {showYearPicker && (
          <div className="h-40 overflow-y-auto mb-3 border border-gray-100 rounded-lg">
            {years.map((y) => (
              <div
                key={y}
                className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${y === viewYear ? "bg-woliba-red text-white font-semibold rounded" : "text-gray-700"}`}
                onClick={() => {
                  setViewYear(y);
                  setSelectedDay(null);
                  if (y === today.getFullYear() && viewMonth > today.getMonth()) {
                    setViewMonth(today.getMonth());
                  }
                  setShowYearPicker(false);
                }}
              >
                {y}
              </div>
            ))}
          </div>
        )}

        {showMonthPicker && (
          <div className="h-40 overflow-y-auto mb-3 border border-gray-100 rounded-lg">
            {MONTHS.map((m, i) => {
              const isFutureMonth = viewYear === today.getFullYear() && i > today.getMonth();
              return (
                <button
                  key={m}
                  type="button"
                  disabled={isFutureMonth}
                  className={`block w-full text-left px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:text-gray-300 ${i === viewMonth ? "bg-woliba-red text-white font-semibold rounded" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => {
                    if (isFutureMonth) return;
                    setViewMonth(i);
                    setSelectedDay(null);
                    setShowMonthPicker(false);
                  }}
                >
                  {m}
                </button>
              );
            })}
          </div>
        )}

        {!showYearPicker && !showMonthPicker && (
          <>
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map((d) => (
                <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                const isSelected = day === selectedDay;
                const isFuture = isFutureDate(viewYear, viewMonth, day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isFuture}
                    onClick={() => setSelectedDay(day)}
                    className={`w-7 h-7 mx-auto flex items-center justify-center text-xs rounded-full transition-all
                      ${isFuture ? "text-gray-300 cursor-not-allowed" : isSelected ? "bg-woliba-red text-white font-semibold" : isToday ? "border border-woliba-red text-woliba-red font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleDone}
          disabled={!selectedDay || isFutureDate(viewYear, viewMonth, selectedDay)}
          className="mt-4 w-full py-2 bg-woliba-red text-white text-sm font-medium rounded-lg hover:bg-woliba-red-dark transition-colors disabled:opacity-40"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DatePickerModal;
