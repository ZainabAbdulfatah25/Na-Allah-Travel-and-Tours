import React, { useState, useEffect } from 'react';

function Footer() {
  const [settings, setSettings] = useState({
    companyName: 'Na-ALLAH Travels & Tours Ltd.',
    contactPhone: '08034747257, 08038856648, 08050571888',
    contactEmail: 'naallahtravels@gmail.com'
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('na_allah_settings'));
    if (saved) {
      setSettings(prev => ({
        ...prev,
        companyName: saved.companyName || prev.companyName,
        contactPhone: saved.contactPhone || prev.contactPhone,
        contactEmail: saved.contactEmail || prev.contactEmail
      }));
    }
  }, []);

  return (
    <footer id="contact" style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          {/* Company Info */}
          <div style={styles.column}>
            <h3 style={styles.heading}>{settings.companyName}</h3>
            <p style={{marginBottom: '15px', opacity: 0.8}}>RC: 2012044</p>
            <p style={{opacity: 0.8, lineHeight: 1.8}}>Experience the journey of a lifetime with our exclusive Umrah and Ramadan packages. We ensure your comfort, safety, and spiritual peace.</p>
          </div>

          {/* Contact Details */}
          <div style={styles.column}>
            <h3 style={styles.heading}>Contact Us</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><strong>Address:</strong><br/> No 1 Ahead Plaza besides Nitel Training Camp, along Babangwari by Airport Roundabout, Fagge Local Govt. Kano State</li>
              <li style={styles.listItem}><strong>Phone:</strong><br/> {settings.contactPhone}</li>
              <li style={styles.listItem}><strong>Email:</strong><br/> <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></li>
            </ul>
          </div>

          {/* Payment & Socials */}
          <div style={styles.column}>
            <h3 style={styles.heading}>Follow Us</h3>
            <div style={styles.socialIcons}>
              <a href="https://wa.me/message/4X32W3CFCBBNF1" target="_blank" rel="noreferrer" style={styles.icon} aria-label="WhatsApp">WhatsApp</a>
              <a href="https://www.facebook.com/share/1Ag9hQD8G3/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={styles.icon} aria-label="Facebook">Facebook</a>
              <a href="https://www.instagram.com/na_allah_travel_and_tours_?igsh=MXd4cThlOGFuNWw3ag%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" style={styles.icon} aria-label="Instagram">Instagram</a>
            </div>
          </div>
        </div>
        
        <div style={styles.bottomBar}>
          <p>© {new Date().getFullYear()} {settings.companyName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--primary-navy)',
    color: 'var(--clear-white)',
    paddingTop: '80px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    marginBottom: '60px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    color: 'var(--primary-gold)',
    marginBottom: '20px',
    fontSize: '1.4rem'
  },
  list: {
    margin: 0,
    padding: 0
  },
  listItem: {
    marginBottom: '20px',
    opacity: 0.9,
    lineHeight: 1.6
  },
  socialIcons: {
    display: 'flex',
    gap: '15px'
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 15px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--primary-gold)',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  },
  bottomBar: {
    textAlign: 'center',
    padding: '25px 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    opacity: 0.6,
    fontSize: '0.9rem'
  }
};

export default Footer;
