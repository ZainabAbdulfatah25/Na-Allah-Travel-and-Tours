import React, { useState } from 'react';

function Hero() {
  const [destination, setDestination] = useState('');

  return (
    <section id="hero" style={styles.heroSection}>
      <div style={styles.overlay}></div>
      <div className="container" style={styles.content}>
        {/* Removed RC Badge per user request */}
        <h1 style={styles.title} className="animate-fade-in">
          Na-ALLAH <span style={styles.subtitle}>Travels & Tours Ltd.</span>
        </h1>
        <p style={styles.description} className="animate-fade-in">
          Your gateway to spiritual journeys and unforgettable adventures. Expertly curated tours for Hajj, Umrah, and leisure.
        </p>
        
        {/* Destination Dropdown / Search Bar */}
        <div style={styles.searchBar} className="animate-fade-in">
          <div style={styles.searchGroup}>
            <label style={styles.searchLabel}>Destination</label>
            <select 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Destination...</option>
              <option value="mecca">Mecca (Hajj/Umrah)</option>
              <option value="medina">Medina (Ziyarah)</option>
              <option value="istanbul">Istanbul (Islamic Heritage)</option>
              <option value="dubai">Dubai (Leisure)</option>
              <option value="holiday">Other Holiday Deals</option>
            </select>
          </div>
          
          <div style={styles.searchGroup}>
            <label style={styles.searchLabel}>Date</label>
            <input type="date" style={styles.input} />
          </div>
          
          <a 
            href={`#all-packages?dest=${destination}`} 
            className="btn btn-navy"
            style={styles.searchButton}
          >
            Search Deals
          </a>
        </div>

        <div style={styles.buttonGroup} className="animate-fade-in">
          <a href="#all-packages" className="btn btn-primary">Our Packages</a>
          <a href="https://wa.me/message/4X32W3CFCBBNF1" target="_blank" rel="noreferrer" className="btn btn-outline" style={styles.whatsappBtn}>
            WhatsApp Contact
          </a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'url("https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: '80px 0' // Adjusted margin
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(10, 31, 61, 0.7)',
    zIndex: 1
  },
  content: {
    position: 'relative',
    zIndex: 2,
    color: 'var(--clear-white)',
    maxWidth: '1000px',
  },
  title: {
    color: 'var(--primary-gold)',
    marginBottom: '20px', // Increased margin
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
    lineHeight: '1.1'
  },
  subtitle: {
    color: 'var(--clear-white)',
    fontWeight: '400',
    display: 'block',
    fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
    marginTop: '10px'
  },
  description: {
    fontSize: '1.3rem',
    marginBottom: '50px', // Increased margin
    maxWidth: '750px',
    lineHeight: '1.8',
    opacity: 0.95,
  },
  searchBar: {
    backgroundColor: 'white',
    padding: '15px 15px 15px 30px',
    borderRadius: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '50px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    maxWidth: '900px'
  },
  searchGroup: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: '200px'
  },
  searchLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    letterSpacing: '0.5px'
  },
  select: {
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--primary-navy)',
    outline: 'none',
    background: 'transparent',
    cursor: 'pointer'
  },
  input: {
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--primary-navy)',
    outline: 'none',
    background: 'transparent',
    cursor: 'pointer'
  },
  searchButton: {
    padding: '20px 40px',
    borderRadius: '14px',
    fontSize: '1.1rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '25px',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
  whatsappBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)', 
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.4)',
    padding: '12px 30px'
  }
};

export default Hero;
