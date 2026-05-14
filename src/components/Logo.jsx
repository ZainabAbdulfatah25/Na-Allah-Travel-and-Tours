import React from 'react';

function Logo({ size = 60, showText = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <img
        src="/logo.png"
        alt="Na-Allah Travels & Tours Ltd Logo"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: '50%',
          filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.35))',
          flexShrink: 0,
        }}
      />

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
            Na-Allah
          </span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: '800',
            letterSpacing: '3px',
            color: 'inherit',
            opacity: 0.8,
            textTransform: 'uppercase'
          }}>
            Travels &amp; Tours
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
