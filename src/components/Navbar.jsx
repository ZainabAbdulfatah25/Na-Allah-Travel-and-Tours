import React from 'react';
import Logo from './Logo';

function Navbar() {
  return (
    <nav style={{padding: '10px 0', backgroundColor: 'white', borderBottom: '1px solid #f1f1f1', position: 'sticky', top: 0, zIndex: 1000, height: '90px', display: 'flex', alignItems: 'center'}} className="animate-slide-down">
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        {/* Brand - Left */}
        <div style={{flex: '1', cursor: 'pointer'}} onClick={() => window.location.hash = ''}>
          <Logo size={60} showText={true} />
        </div>

        {/* Navigation Links - Centered */}
        <ul style={{display: 'flex', gap: '35px', alignItems: 'center', margin: 0, padding: 0, flex: '2', justifyContent: 'center'}}>
          <li><a href="#services" style={styles.navLink} className="nav-link-hover">Services</a></li>
          <li><a href="#all-packages" style={styles.navLink} className="nav-link-hover">Our Packages</a></li>
          <li><a href="#credentials" style={styles.navLink} className="nav-link-hover">Certifications</a></li>
        </ul>

        {/* Global Action Button - Right */}
        <div style={{flex: '1', display: 'flex', justifyContent: 'flex-end'}}>
           <a href="#all-packages" className="btn btn-primary hover-lift" style={{padding: '12px 28px', fontSize: '0.85rem', fontWeight: 'bold'}}>Book Now</a>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navLink: { fontWeight: '900', color: 'var(--primary-navy)', fontSize: '0.85rem', textTransform: 'uppercase', textDecoration: 'none' }
};

export default Navbar;
