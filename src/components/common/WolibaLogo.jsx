// import React from "react";

// const WolibaLogo = () => (
//   <div className="flex items-center">
//     <svg width="90" height="28" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <text x="0" y="22" fontFamily="'DM Sans', sans-serif" fontSize="24" fontWeight="700" fill="#1a1a1a">
//         w<tspan fill="#C8515A">o</tspan>liba
//       </text>
//     </svg>
//   </div>
// );

// export default WolibaLogo;


import React from "react";
import logo from "../../assets/wolibaLogo.png"; 
const WolibaLogo = () => (
  <div className="flex items-center">
    <img
      src={logo}
      alt="Woliba Logo"
      className="
        w-[110px]
        sm:w-[130px]
        md:w-[150px]
        h-auto
        object-contain
      "
    />
  </div>
);

export default WolibaLogo;