import React from "react";

const Spinner = ({ size = "md", color = "white" }) => {
  const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8", xl: "w-12 h-12" };
  const colors = { white: "border-white/30 border-t-white", gray: "border-gray-300 border-t-gray-600", red: "border-red-200 border-t-woliba-red" };
  return (
    <div className={`${sizes[size]} border-2 ${colors[color]} rounded-full animate-spin inline-block`} />
  );
};

export default Spinner;
