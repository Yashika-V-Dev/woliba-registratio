import React from "react";
import Spinner from "../loaders/Spinner";

const Button = ({ children, loading, variant = "primary", className = "", ...props }) => {
  if (variant === "secondary") {
    return (
      <button className={`woliba-btn-secondary ${className}`} disabled={loading} {...props}>
        {loading ? <Spinner size="sm" color="gray" /> : children}
      </button>
    );
  }
  return (
    <button className={`woliba-btn-primary ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner size="sm" color="white" />
          <span>Please wait...</span>
        </span>
      ) : children}
    </button>
  );
};

export default Button;
