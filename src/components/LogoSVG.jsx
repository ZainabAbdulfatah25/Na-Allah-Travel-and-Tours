import React from 'react';

const LogoSVG = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="topArc" d="M 15 100 A 85 85 0 0 1 185 100" fill="none" />
      <path id="bottomArc" d="M 160 115 A 65 65 0 0 1 40 115" fill="none" />
      <clipPath id="circleClip">
        <circle cx="100" cy="100" r="95" />
      </clipPath>
      <linearGradient id="planeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d1d5db" />
      </linearGradient>
    </defs>

    {/* Background Circle */}
    <circle cx="100" cy="100" r="95" fill="#2985c7" />
    <path d="M 5 100 A 95 95 0 0 1 195 100 Z" fill="#2f0a82" />
    
    {/* Globe Lines */}
    <g stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" clipPath="url(#circleClip)">
      <ellipse cx="100" cy="100" rx="35" ry="95" />
      <ellipse cx="100" cy="100" rx="65" ry="95" />
      <line x1="5" y1="100" x2="195" y2="100" />
      <ellipse cx="100" cy="100" rx="95" ry="35" />
      <ellipse cx="100" cy="100" rx="95" ry="65" />
    </g>

    {/* Text */}
    <text fill="white" fontSize="15" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1.5">
      <textPath href="#topArc" startOffset="50%" textAnchor="middle">NA-ALLAH TRAVELS &amp; TOURS LTD</textPath>
    </text>
    <text fill="white" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="2">
      <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">RC: 2012044</textPath>
    </text>

    {/* Airplane */}
    <g transform="translate(105, 100) rotate(-15) scale(1.6)">
      {/* Right Wing */}
      <path d="M -15 0 L -25 -20 L -10 -20 L 10 0 Z" fill="#9ca3af" />
      {/* Body */}
      <path d="M -45 4 C -50 4, -55 0, -45 -4 L 30 -4 C 40 -4, 45 0, 45 0 C 45 0, 40 4, 30 4 Z" fill="url(#planeGrad)" />
      {/* Left Wing */}
      <path d="M -15 0 L -5 25 L 10 25 L 18 0 Z" fill="#f3f4f6" />
      {/* Tail */}
      <path d="M -40 -4 L -50 -18 L -38 -18 L -32 -4 Z" fill="#2f0a82" />
      {/* Colored Stripes */}
      <path d="M -35 1 L 20 1 L 20 -1 L -35 -1 Z" fill="#f39c12" />
      <path d="M -35 -1 L 20 -1 L 20 -2 L -35 -2 Z" fill="#2985c7" />
      {/* Cockpit Window */}
      <path d="M 32 -3 L 38 -1 L 38 0 L 32 0 Z" fill="#1f2937" />
    </g>
  </svg>
);

export default LogoSVG;
