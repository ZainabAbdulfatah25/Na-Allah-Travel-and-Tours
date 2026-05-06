import React, { useState, useEffect } from 'react';
import LogoSVG from './LogoSVG';

function Logo({ size = 50, showText = false }) {
  const [name, setName] = useState('Na-Allah');

  const loadName = () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_settings'));
    if (saved && saved.companyName) {
       setName(saved.companyName.split(' ')[0]);
    }
  };

  useEffect(() => {
    loadName();
    const handleSync = (e) => { if (e.key === 'na_allah_settings') loadName(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
      <div style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
        <LogoSVG size={size} />
      </div>
      <div style={{ animation: 'floatElement 4s ease-in-out infinite', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', marginLeft: '-10px', marginTop: '-15px' }}>
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="var(--primary-gold)">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{
            fontWeight: '900', 
            fontSize: '1.4rem', 
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(270deg, var(--primary-gold), #fff, var(--primary-accent), var(--primary-gold))',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textShine 6s ease infinite',
            lineHeight: '1'
          }}>
            {name}
          </span>
          <span style={{
            fontSize: '0.65rem', 
            fontWeight: '800', 
            letterSpacing: '3px', 
            color: 'inherit',
            opacity: 0.8,
            textTransform: 'uppercase'
          }}>
            Travels & Tours
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
