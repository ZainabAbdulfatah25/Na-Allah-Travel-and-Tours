import React, { useState } from 'react';
import Logo from './Logo';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <div style={styles.logoRow} onClick={() => window.location.hash = ''}>
          <Logo size={40} showText={false} />
          <div style={styles.logoText}>
            <span style={{fontWeight: '900', color: 'var(--primary-navy)', fontSize: '1.2rem'}}>Na-Allah</span>
            <span style={{color: 'var(--primary-gold)', fontSize: '0.65rem', letterSpacing: '1.5px', fontWeight: 'bold', display: 'block', marginTop: '-3px'}}>TRAVELS & TOURS</span>
          </div>
        </div>

        {/* Hamburger */}
        <div style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div style={{...styles.line, ...(isOpen ? styles.line1 : {})}}></div>
          <div style={{...styles.line, opacity: isOpen ? 0 : 1}}></div>
          <div style={{...styles.line, ...(isOpen ? styles.line3 : {})}}></div>
        </div>

        <ul style={{...styles.navLinks, ...(isOpen ? styles.navLinksActive : {})}}>
          <li><a href="#services" style={styles.link}>Services</a></li>
          <li><a href="#all-packages" style={styles.link}>Our Packages</a></li>
          <li><a href="#credentials" style={styles.link}>Credentials</a></li>
          <li><a href="#contact-form" style={styles.link}>Inquiry</a></li>
          <li><a href="#admin" style={styles.adminBtn}>Admin</a></li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.03)' },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 20px' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoText: { display: 'flex', flexDirection: 'column' },
  hamburger: { display: 'none', cursor: 'pointer', flexDirection: 'column', gap: '5px' },
  line: { width: '22px', height: '2.5px', backgroundColor: 'var(--primary-navy)', transition: '0.3s' },
  line1: { transform: 'rotate(45deg) translate(5px, 5px)' },
  line3: { transform: 'rotate(-45deg) translate(5px, -5px)' },
  navLinks: { display: 'flex', gap: '20px', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 },
  link: { textDecoration: 'none', color: 'var(--primary-navy)', fontWeight: '700', fontSize: '0.9rem', transition: '0.2s', padding: '10px 15px', borderRadius: '10px' },
  adminBtn: { textDecoration: 'none', backgroundColor: 'var(--primary-gold)', color: 'var(--primary-navy)', padding: '10px 20px', borderRadius: '10px', fontWeight: '900', fontSize: '0.85rem' },
  
  // Mobile Support
  '@media (max-width: 768px)': {
    hamburger: { display: 'flex' },
    navLinks: { display: 'none' },
  }
};

export default Navbar;
