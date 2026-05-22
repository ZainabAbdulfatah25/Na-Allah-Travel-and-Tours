import React, { useState, useEffect } from 'react';

function AboutSummary() {
  const [info, setInfo] = useState({
    address: 'No 12, Babangwari, Kano.',
    companyName: 'Na-Allah Travels and Tours Ltd.'
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('na_allah_settings'));
    if (saved) setInfo(saved);
  }, []);

  return (
    <section id="about-summary" className="section-padding" style={styles.section}>
      {/* Dynamic background element */}
      <div style={{position: 'absolute', top: '10%', right: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04), transparent 70%)', pointerEvents: 'none'}} />

      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* Left Column: Legacy & Read More Button */}
          <div style={styles.textSide} className="animate-fade-in-up">
            <span style={styles.badge}>Established Excellence</span>
            <h2 style={styles.heading}>
              Crafting Safe, Spiritually Sound <span style={{color: 'var(--primary-gold)'}}>Journeys</span>
            </h2>
            <p style={styles.paragraph}>
              <strong>{info.companyName}</strong> is an officially accredited travel agency dedicated to premium Hajj, Umrah, and global travel logistics. 
            </p>
            <p style={styles.paragraph}>
              For over a decade, we have combined deep spiritual alignment with absolute operational integrity, ensuring our pilgrims and travelers experience absolute peace of mind and luxury.
            </p>
            
            {/* Call to Action: Read More Button linking to #about */}
            <div style={{marginTop: '30px'}}>
              <a 
                href="#about" 
                className="btn btn-navy hover-lift" 
                style={styles.readMoreBtn}
              >
                Read More About Us <span style={{marginLeft: '8px'}}>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Emblem */}
          <div style={styles.mapSide} className="animate-fade-in-up delay-1">
            <div className="glass-panel" style={styles.mapFrameCard}>
              <div style={styles.mapHeader}>
                <span style={{fontSize: '1.5rem'}}>📍</span>
                <div style={{textAlign: 'left'}}>
                  <h4 style={styles.mapTitle}>Our HQ Location</h4>
                  <p style={styles.mapSubtitle}>{info.address}</p>
                </div>
              </div>
              
              {/* Google Maps Iframe Embed */}
              <div style={styles.mapContainer}>
                <iframe 
                  title="Na-Allah HQ Office Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(info.address || 'No 12, Babangwari, Kano')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%" 
                  height="260" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '90px 0',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
  },
  container: {
    position: 'relative',
    zIndex: 1
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '60px',
    alignItems: 'center'
  },
  textSide: {
    textAlign: 'left'
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    borderRadius: '30px',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    color: 'var(--primary-gold)',
    fontSize: '0.8rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '20px'
  },
  heading: {
    fontSize: 'clamp(2.2rem, 5vw, 3rem)',
    color: 'var(--primary-navy)',
    fontWeight: '900',
    lineHeight: '1.15',
    marginBottom: '25px',
    letterSpacing: '-0.5px'
  },
  paragraph: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.75',
    marginBottom: '15px'
  },
  readMoreBtn: {
    padding: '16px 35px',
    fontSize: '0.95rem',
    fontWeight: '800',
    backgroundColor: 'var(--primary-navy)',
    color: '#ffffff',
    border: '1.5px solid var(--primary-gold)',
    boxShadow: '0 10px 25px rgba(5,16,36,0.12)',
    borderRadius: '15px',
    display: 'inline-block',
    textDecoration: 'none'
  },
  mapSide: {
    display: 'flex',
    justifyContent: 'center'
  },
  mapFrameCard: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#ffffff',
    borderRadius: '28px',
    padding: '20px',
    boxShadow: '0 20px 40px rgba(5, 16, 36, 0.04)',
    border: '1.5px solid rgba(212, 175, 55, 0.2)',
    overflow: 'hidden'
  },
  mapHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
    padding: '0 5px'
  },
  mapTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: 'var(--primary-navy)',
    margin: '0 0 2px 0'
  },
  mapSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    margin: 0
  },
  mapContainer: {
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0'
  }
};

export default AboutSummary;
