import React from 'react';

// Authentic Windows 4-color flag SVG
const WindowsFlagSVG = ({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 88 88" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 12.402L35.656 7.423V42.041H0V12.402Z" fill="#F25022"/>
    <path d="M87.57 0L40.833 6.66V41.868H87.57V0Z" fill="#7FBA00"/>
    <path d="M0 46.655H35.656V80.299L0 75.58V46.655Z" fill="#00A4EF"/>
    <path d="M40.833 46.655H87.57V87.57L40.833 81.217V46.655Z" fill="#FFB900"/>
  </svg>
);

export const XPLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <WindowsFlagSVG 
    className={`${className} drop-shadow-md`} 
  />
);

export const StartLogo = () => (
  <WindowsFlagSVG 
    className="w-5 h-5 mr-1 italic filter drop-shadow-sm"
    style={{ transform: 'skewX(-2deg)' }} 
  />
);