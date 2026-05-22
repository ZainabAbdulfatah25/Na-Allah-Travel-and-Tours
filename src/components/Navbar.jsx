import React, { useState, useEffect } from 'react';
import Logo from './Logo';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="nav-logo-container" style={{...styles.logoContainer, color: 'white'}}>
        <Logo size={80} showText={true} />
      </div>

      <nav className={`glass-panel nav-pill-container ${menuOpen ? 'nav-pill-open' : ''}`} style={{...styles.pillNav, width: menuOpen ? '320px' : '180px', height: menuOpen ? 'auto' : '65px', padding: menuOpen ? '20px' : '0 20px', borderRadius: menuOpen ? '30px' : '35px'}}>
        <div style={styles.pillHeader} onClick={() => setMenuOpen(!menuOpen)}>
           <span style={{fontWeight: '800', fontSize: '1rem', color: 'var(--primary-navy)'}}>{menuOpen ? 'CLOSE' : 'MENU'}</span>
           <div style={styles.burger}>
             <span style={{...styles.line, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
             <span style={{...styles.line, opacity: menuOpen ? 0 : 1}}></span>
             <span style={{...styles.line, transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none'}}></span>
           </div>
        </div>
        
        {menuOpen && (
          <div className="animate-fade-in-up" style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <a href="#services-page" style={styles.navLink} onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#all-packages" style={styles.navLink} onClick={() => setMenuOpen(false)}>Travel Plans</a>
            <a href="#credentials" style={styles.navLink} onClick={() => setMenuOpen(false)}>Trust Center</a>
            <a href="#all-packages" className="btn btn-primary" style={{marginTop: '10px'}} onClick={() => setMenuOpen(false)}>Book Now</a>
          </div>
        )}
      </nav>
    </>
  );
}

const styles = {
  logoContainer: { position: 'absolute', top: '30px', left: '40px', zIndex: 1000 },
  pillNav: { position: 'fixed', top: '30px', right: '40px', zIndex: 1000, overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  pillHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '65px', padding: '0 10px' },
  burger: { display: 'flex', flexDirection: 'column', gap: '5px' },
  line: { width: '25px', height: '3px', backgroundColor: 'var(--primary-navy)', transition: 'all 0.3s', borderRadius: '3px' },
  navLink: { fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-navy)', textDecoration: 'none', padding: '10px', borderRadius: '15px', transition: 'background 0.3s' }
};

export default Navbar;
