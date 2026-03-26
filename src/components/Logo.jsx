import React from 'react';

function Logo({ size = 50, showText = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <img 
        src="/logo.png" 
        alt="Logo" 
        style={{ width: size, height: 'auto', borderRadius: '50%' }} 
        onError={(e) => {
           // If logo.png is missing, we use the text version
           e.target.style.display = 'none';
        }}
      />
      {showText && (
        <div>
          <span style={{fontWeight: '900', color: 'var(--primary-navy)', fontSize: '1.2rem'}}>Na-Allah</span>
          <span style={{color: 'var(--primary-gold)', fontSize: '0.65rem', display: 'block', fontWeight: '800'}}>TRAVELS & TOURS</span>
        </div>
      )}
    </div>
  );
}

export default Logo;
