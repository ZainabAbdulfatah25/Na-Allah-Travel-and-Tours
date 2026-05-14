import React from 'react';

const LogoSVG = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Top text arc — sits on the upper purple ring band */}
      <path id="topTextPath" d="M 10 100 A 90 90 0 0 1 190 100" fill="none" />

      {/* Bottom text arc — sits on the lower purple ring band */}
      <path id="bottomTextPath" d="M 14 106 A 86 86 0 0 0 186 106" fill="none" />

      <clipPath id="globeClip">
        <circle cx="100" cy="100" r="66" />
      </clipPath>

      <linearGradient id="planeBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>

    {/* Outer Purple Ring */}
    <circle cx="100" cy="100" r="98" fill="#4b0082" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

    {/* Inner Globe */}
    <circle cx="100" cy="100" r="66" fill="#2985c7" />

    {/* Globe Grid */}
    <g stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" clipPath="url(#globeClip)">
      <ellipse cx="100" cy="100" rx="66" ry="20" />
      <ellipse cx="100" cy="100" rx="66" ry="44" />
      <line x1="34" y1="100" x2="166" y2="100" />
      <ellipse cx="100" cy="100" rx="20" ry="66" />
      <ellipse cx="100" cy="100" rx="44" ry="66" />
    </g>

    {/* Subtle continent shape */}
    <g fill="rgba(255,255,255,0.15)" clipPath="url(#globeClip)">
      <path d="M 52 38 Q 82 28, 112 38 T 148 48 Q 158 82, 128 94 T 100 130 Q 80 150, 70 176 Q 50 158, 40 118 Q 30 78, 52 38 Z" />
    </g>

    {/* ── TOP TEXT on outer ring ── */}
    <text fill="#ffffff" fontSize="12.5" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.8">
      <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">NA-ALLAH TRAVELS &amp; TOURS LTD</textPath>
    </text>

    {/* ── BOTTOM TEXT on outer ring ── */}
    <text fill="#ffd700" fontSize="13" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="2">
      <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">RC: 2012044</textPath>
    </text>

    {/* ── AIRPLANE — centred in globe, scaled down so it doesn't overlap text ── */}
    <g transform="translate(100, 106) rotate(-12) scale(0.9)">
      {/* Right wing */}
      <path d="M -8 -4 L -20 -24 L -12 -24 L 12 -4 Z" fill="#9ca3af" />
      <rect x="-9" y="-10" width="8" height="5" rx="2.5" fill="#4b5563" />

      {/* Fuselage */}
      <path d="M -42 0 C -50 0, -50 -9, -42 -9 L 35 -9 C 48 -9, 52 0, 35 0 Z" fill="url(#planeBody)" />

      {/* Left wing */}
      <path d="M -16 -4 L -4 28 L 12 28 L 20 -4 Z" fill="#e5e7eb" />
      <rect x="-3" y="8" width="10" height="7" rx="3" fill="#6b7280" />

      {/* Tail fin */}
      <path d="M -38 -9 L -50 -28 L -38 -28 L -30 -9 Z" fill="#4b0082" />

      {/* Cockpit */}
      <path d="M 37 -7 L 43 -4 L 43 -1 L 37 -1 Z" fill="#1e293b" />

      {/* Stripes */}
      <rect x="-36" y="-3" width="58" height="2" fill="#f39c12" />
      <rect x="-36" y="-1" width="58" height="2" fill="#e74c3c" />
    </g>
  </svg>
);

export default LogoSVG;
