import React from 'react';

function Navbar() {
  return (
    <nav style={{padding: '20px 0', backgroundColor: 'white', borderBottom: '1px solid #f1f1f1', position: 'sticky', top: 0, zIndex: 1000}}>
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{cursor: 'pointer'}} onClick={() => window.location.hash = ''}>
          <span style={{fontWeight: '900', color: '#0a1f3d', fontSize: '1.4rem'}}>Na-Allah</span>
          <span style={{color: '#d4af37', fontSize: '0.9rem', display: 'block', fontWeight: 'bold', marginTop: '-5px'}}>TRAVELS & TOURS</span>
        </div>

        <ul style={{display: 'flex', gap: '30px', alignItems: 'center', margin: 0, padding: 0}}>
          <li><a href="#services" style={{fontWeight: 'bold', color: '#0a1f3d'}}>Services</a></li>
          <li><a href="#all-packages" style={{fontWeight: 'bold', color: '#0a1f3d'}}>Our Packages</a></li>
          <li><a href="#admin" className="btn btn-navy" style={{padding: '10px 20px', fontSize: '0.85rem'}}>Admin Panel</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
