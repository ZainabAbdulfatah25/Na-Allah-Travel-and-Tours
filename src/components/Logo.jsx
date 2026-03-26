import React from 'react';

function Logo({ size = 150, showText = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
      <img 
        src="https://raw.githubusercontent.com/ZainabAbdulfatah25/Na-Allah-Travel-and-Tours/main/logo.png" 
        alt="Na-Allah Travels Official Logo"
        style={{ width: size, height: 'auto', borderRadius: '50%' }}
        onError={(e) => {
          // Fallback if the logo is missing or loading from local path
          e.target.src = "/logo.png"; 
        }}
      />
      {showText && (
        <div style={{ marginTop: '10px' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--primary-navy)' }}>OFFICIAL AGENCY</span>
        </div>
      )}
    </div>
  );
}

export default Logo;
