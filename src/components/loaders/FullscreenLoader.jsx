import React from "react";
import runningVideo from "../../assets/Loader.mp4";

const FullscreenLoader = ({ message = "Processing..." }) => (
  <div
    className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4"
    role="status"
    aria-live="polite"
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-[140px] sm:w-[180px] md:w-[220px] h-auto object-contain"
    >
      <source src={runningVideo} type="video/mp4" />
    </video>

    <p className="text-sm text-gray-600 font-medium">
      {message}
    </p>
  </div>
);

export default FullscreenLoader;