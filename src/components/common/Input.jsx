import React from "react";

const Input = React.forwardRef(({ label, error, type = "text", icon, rightIcon, onRightIconClick, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="woliba-label">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        ref={ref}
        type={type}
        className={`woliba-input ${icon ? "pl-9" : ""} ${rightIcon ? "pr-10" : ""} ${error ? "border-red-400 focus:ring-red-200 focus:border-red-400" : ""}`}
        {...props}
      />
      {rightIcon && (
        <button type="button" onClick={onRightIconClick} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {rightIcon}
        </button>
      )}
    </div>
    {error && <p className="woliba-error">{error}</p>}
  </div>
));

Input.displayName = "Input";
export default Input;
