import React from 'react';

function Navbar() {
  return (
    <nav style={{padding: '20px 0', backgroundColor: 'white', borderBottom: '1px solid #f1f1f1', position: 'sticky', top: 0, zIndex: 1000}}>
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}} onClick={() => window.location.hash = ''}>
          <img src="/logo.png" alt="Logo" style={{width: '45px', height: 'auto'}} />
          <div>
            <span style={{fontWeight: '900', color: 'var(--primary-navy)', fontSize: '1.2rem'}}>Na-Allah</span>
            <span style={{color: 'var(--primary-gold)', fontSize: '0.65rem', display: 'block', fontWeight: '800'}}>TRAVELS & TOURS</span>
          </div>
        </div>

        <ul style={{display: 'flex', gap: '30px', alignItems: 'center', margin: 0, padding: 0}}>
          <li><a href="#services" style={{fontWeight: 'bold', color: 'var(--primary-navy)'}}>Services</a></li>
          <li><a href="#all-packages" style={{fontWeight: 'bold', color: 'var(--primary-navy)'}}>Our Packages</a></li>
          <li><a href="#admin" className="btn btn-navy" style={{padding: '8px 18px', fontSize: '0.85rem'}}>Admin</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
