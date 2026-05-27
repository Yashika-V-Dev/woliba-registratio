import React from "react";
import backgroundImg from "../../assets/Background.png";

const BackgroundCharacters = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        background: "var(--Bg-Color-for-Light-theme-600, #FEFEFE)",
      }}
    >
      <img
        src={backgroundImg}
        alt="Background"
        className="
          w-full
          h-full
          object-cover
          opacity-90
        "
      />
    </div>
  );
};

export default BackgroundCharacters;