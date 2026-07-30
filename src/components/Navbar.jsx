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

      <nav className={`glass-panel nav-pill-container ${menuOpen ? 'nav-pill-open' : ''}`} style={{...styles.pillNav, width: menuOpen ? '320px' : '190px', height: menuOpen ? 'auto' : '65px', padding: menuOpen ? '20px' : '0 20px', borderRadius: menuOpen ? '30px' : '35px'}}>
        <div style={styles.pillHeader} onClick={() => setMenuOpen(!menuOpen)}>
           <span style={{fontWeight: '800', fontSize: '1rem', letterSpacing: '1px', color: 'var(--primary-navy)', marginRight: '14px'}}>{menuOpen ? 'CLOSE' : 'MENU'}</span>
           <div style={styles.iconWrapper} className="nav-menu-icon">
             {menuOpen ? (
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{transition: 'transform 0.3s ease'}}>
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
             ) : (
               <div style={styles.bentoGrid}>
                 <span style={{...styles.dot, backgroundColor: 'var(--primary-navy)'}}></span>
                 <span style={{...styles.dot, backgroundColor: 'var(--primary-gold)', transform: 'scale(1.15)'}}></span>
                 <span style={{...styles.dot, backgroundColor: 'var(--primary-accent)'}}></span>
                 <span style={{...styles.dot, backgroundColor: 'var(--primary-navy)'}}></span>
               </div>
             )}
           </div>
        </div>
        
        {menuOpen && (
          <div className="animate-fade-in-up" style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <a href="#services-page" style={styles.navLink} onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" style={styles.navLink} onClick={() => setMenuOpen(false)}>About Us</a>
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
  pillHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '65px', padding: '0 5px' },
  iconWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px' },
  bentoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', width: '20px', height: '20px', alignItems: 'center', justifyContent: 'center' },
  dot: { width: '7px', height: '7px', borderRadius: '50%', transition: 'all 0.3s ease' },
  navLink: { fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-navy)', textDecoration: 'none', padding: '10px', borderRadius: '15px', transition: 'background 0.3s' }
};

export default Navbar;
