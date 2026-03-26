import React from 'react';

function Logo({ size = 180, showText = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle cx="100" cy="100" r="95" fill="var(--primary-navy)" />
        <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="transparent" />
        
        {/* Globe Stylized Inner */}
        <path d="M100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20Z" fill="#3b82f6" fillOpacity="0.2" />
        
        {/* Airplane Icon - Stylized Shape */}
        <path d="M140 100L70 70L85 100L70 130L140 100Z" fill="var(--primary-gold)" />
        
        {/* Curved Text Paths */}
        <defs>
          <path id="circlePathTop" d="M 30, 100 a 70,70 0 1,1 140,0" />
          <path id="circlePathBottom" d="M 30, 100 a 70,70 0 1,0 140,0" />
        </defs>

        {/* Company Name on Top Arc */}
        <text fill="white" fontSize="13" fontWeight="bold" letterSpacing="1">
          <textPath xlinkHref="#circlePathTop" startOffset="50%" textAnchor="middle">
            NA-ALLAH TRAVELS & TOURS LTD.
          </textPath>
        </text>

        {/* RC Number on Bottom Arc */}
        <text fill="white" fontSize="12" fontWeight="800">
          <textPath xlinkHref="#circlePathBottom" startOffset="50%" textAnchor="middle" side="right" baselineShift="-15px">
            RC: 2012044
          </textPath>
        </text>
      </svg>
      {showText && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: '900', 
            color: 'var(--primary-navy)', 
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>Official Travel Agency</span>
        </div>
      )}
    </div>
  );
}

export default Logo;
