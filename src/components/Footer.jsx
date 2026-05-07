import React, { useState, useEffect } from 'react';
import Logo from './Logo';

function Footer() {
  const [info, setInfo] = useState({
     companyName: 'Na-Allah Travels and Tours Ltd.',
     phone: '0803 474 7257',
     email: 'info@naallahtravels.com',
     address: 'No 12, Babangwari, Kano.',
     whatsapp: '2348034747257',
     facebook: '#',
     instagram: '#'
  });

  const loadInfo = () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_settings'));
    if (saved) setInfo(saved);
  };

  useEffect(() => {
    loadInfo();
    const handleSync = (e) => { if (e.key === 'na_allah_settings') loadInfo(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const WhatsappIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
  );

  const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3.81l.53-4H14V7a1 1 0 011-1h3z"/></svg>
  );

  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><path d="M21.5 6.5A1.5 1.5 0 1120 5a1.5 1.5 0 011.5 1.5z" /><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.84 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-4.26.19-6.78 2.71-6.98 6.98C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.27 2.72 6.79 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.26-.19 6.78-2.71 6.98-6.98C23.99 15.67 24 15.26 24 12s-.01-3.67-.07-4.95c-.2-4.27-2.72-6.79-6.98-6.98C15.67.01 15.26 0 12 0z" /></svg>
  );

  const getSocialLink = (platform, value) => {
    if (!value || value === '#') return '#';
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (platform === 'facebook') return `https://facebook.com/${value}`;
    if (platform === 'instagram') return `https://instagram.com/${value}`;
    if (platform === 'twitter') return `https://twitter.com/${value}`;
    return '#';
  };

  const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
  );

  return (
    <footer style={styles.footer} className="animate-fade-in-up">
      <div className="container" style={styles.grid}>
        <div>
          <div style={{color: 'white'}}><Logo size={80} showText={true} /></div>
          <p style={styles.desc}>Providing excellence in spiritual and global travel for over a decade. Your premier partner for Hajj and Umrah.</p>
        </div>
        <div><h4 style={styles.heading}>Explore</h4><ul style={styles.list}><li><a href="#services" style={styles.link} className="hover-lift">Services</a></li><li><a href="#all-packages" style={styles.link} className="hover-lift">Travel Plans</a></li><li><a href="#credentials" style={styles.link} className="hover-lift">Trust Center</a></li></ul></div>
        <div><h4 style={styles.heading}>Contact HQ</h4><ul style={styles.list}>
          <li style={styles.link}>{info.phone}</li>
          <li style={styles.link}>{info.email}</li>
          {info.supportEmail && <li style={styles.link}>{info.supportEmail} (Support)</li>}
          {info.salesEmail && <li style={styles.link}>{info.salesEmail} (Sales)</li>}
          <li style={{...styles.link, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem'}}>{info.address}</li>
        </ul></div>
        <div>
          <h4 style={styles.heading}>Connect</h4>
          <div style={{display: 'flex', gap: '15px', marginTop: '15px'}}>
            <a href={info.whatsapp?.startsWith('http') ? info.whatsapp : `https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" style={styles.social} className="hover-lift"><WhatsappIcon /></a>
            <a href={getSocialLink('facebook', info.facebook)} target="_blank" rel="noopener noreferrer" style={styles.social} className="hover-lift"><FacebookIcon /></a>
            <a href={getSocialLink('instagram', info.instagram)} target="_blank" rel="noopener noreferrer" style={styles.social} className="hover-lift"><InstagramIcon /></a>
            {info.twitter && <a href={getSocialLink('twitter', info.twitter)} target="_blank" rel="noopener noreferrer" style={styles.social} className="hover-lift"><TwitterIcon /></a>}
          </div>
        </div>
      </div>
      <div style={styles.bottom}><p>© {new Date().getFullYear()} {info.companyName} | Licensed by NAHCON & IATA</p></div>
    </footer>
  );
}

const styles = {
  footer: { backgroundColor: 'var(--primary-navy)', color: 'white', padding: 'clamp(50px, 10vw, 100px) 0 40px 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px' },
  desc: { color: 'rgba(255,255,255,0.7)', marginTop: '25px', fontSize: '0.95rem', lineHeight: '1.8' },
  heading: { color: 'var(--primary-gold)', marginBottom: '25px', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px', fontWeight: '800' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  link: { color: 'white', display: 'block', marginBottom: '15px', fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.3s' },
  social: { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--primary-gold)', border: '1px solid rgba(255,255,255,0.1)' },
  bottom: { borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '80px', paddingTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }
};

export default Footer;
