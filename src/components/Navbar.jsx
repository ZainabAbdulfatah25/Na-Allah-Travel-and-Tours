import React from 'react';

function Navbar() {
  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="container" style={styles.container}>
        <div className="logo" style={styles.logo}>
          <img src="/logo.png" alt="Na-Allah Travels Logo" style={styles.logoImg} onError={(e) => {
             e.target.onerror = null; 
             e.target.style.display = 'none';
             document.getElementById('fallback-logo-text').style.display = 'block';
          }} />
          <h2 id="fallback-logo-text" style={{display: 'none', color: 'var(--primary-gold)', margin: 0}}>Na-ALLAH Travels</h2>
        </div>
        <ul className="nav-links" style={styles.navLinks}>
          <li><a href="#hero">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#all-packages">Our Packages</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
          <a href="#all-packages" className="btn btn-primary" style={{padding: '10px 22px', fontSize: '0.9rem'}}>Book Now</a>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'var(--primary-navy)',
    color: 'var(--clear-white)',
    padding: '18px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  logoImg: {
    height: '55px',
    width: 'auto',
    objectFit: 'contain'
  },
  navLinks: {
    display: 'flex',
    gap: '40px',
    fontWeight: 600,
    fontSize: '1rem',
    color: 'var(--text-light)'
  }
};

export default Navbar;
