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

      <nav className={`glass-panel nav-pill-container ${menuOpen ? 'nav-pill-open' : ''}`} style={{...styles.pillNav, width: menuOpen ? '320px' : '145px', height: menuOpen ? 'auto' : '65px', padding: menuOpen ? '20px' : '0 20px', borderRadius: menuOpen ? '30px' : '35px'}}>
        <div style={styles.pillHeader} onClick={() => setMenuOpen(!menuOpen)}>
           <span style={{fontWeight: '800', fontSize: '1rem', letterSpacing: '1px', color: 'var(--primary-navy)', marginRight: '10px'}}>{menuOpen ? 'CLOSE' : 'MENU'}</span>
           <div style={styles.iconWrapper} className="nav-menu-icon">
             {menuOpen ? (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition: 'transform 0.3s ease'}}>
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
             ) : (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" strokeWidth="2.5" strokeLinecap="round" style={{transition: 'all 0.3s ease'}}>
                 <line x1="3" y1="8" x2="21" y2="8"></line>
                 <line x1="9" y1="16" x2="21" y2="16"></line>
               </svg>
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
  navLink: { fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-navy)', textDecoration: 'none', padding: '10px', borderRadius: '15px', transition: 'background 0.3s' }
};

export default Navbar;
