import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Services({ onSelectService, standalone = false }) {
  const [services, setServices] = useState([
    { id: 1, title: "Flight Bookings", icon: "✈️", desc: "Global flight reservations with all major airlines like Saudia." },
    { id: 2, title: "Professional Tours", icon: "🕌", desc: "Expertly guided Umrah and Hajj religious tours for spiritual peace." },
    { id: 3, title: "Customized Tours", icon: "🗺️", desc: "Tailor-made travel itineraries to suit your family's specific needs." }
  ]);

  const [activeTab, setActiveTab] = useState(0);

  const loadServices = async () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_services'));
    if (saved) setServices(saved);
    
    try {
      const { data, error } = await supabase.from('na_allah_services').select('*').order('id', { ascending: true });
      if (data && !error && data.length > 0) {
         setServices(data);
         localStorage.setItem('na_allah_services', JSON.stringify(data));
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadServices();
    const handleSync = (e) => { if (e.key === 'na_allah_services') loadServices(); };
    window.addEventListener('storage', handleSync);

    const checkTab = () => {
      const match = window.location.hash.match(/\?tab=(\d)/);
      if (match) setActiveTab(parseInt(match[1]));
    };

    checkTab();
    window.addEventListener('hashchange', checkTab);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('hashchange', checkTab);
    };
  }, []);

  const renderIcon = (iconStr) => {
    if (iconStr === '✈️') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6l-1 2.2c-.1.3.1.7.4.8l6.1 2.3L6.5 15l-3.2-.8c-.4-.1-.8.1-1 .4l-1 2.2c-.1.3.1.7.4.8l4.4 1.2 1.2 4.4c.1.3.5.5.8.4l2.2-1.c.3-.2.5-.6.4-1l-.8-3.2 2.9-2.7 2.3 6.1c.1.3.5.5.8.4l2.2-1c.4-.2.7-.6.6-1.1z"/></svg>;
    if (iconStr === '🕌') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 8 8 8 8v12h8V8s0-6-4-6z"/><path d="M2 14v6h4v-6H2z"/><path d="M18 14v6h4v-6h-4z"/><path d="M4 14l-2-2"/><path d="M20 14l2-2"/><path d="M12 22v-4"/></svg>;
    if (iconStr === '🗺️') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>;
    if (iconStr === '🏨' || iconStr === '🛏️') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>;
    return <span style={{fontSize: '2.5rem'}}>{iconStr}</span>;
  };

  const getPackageCategoryLink = (title) => {
    const t = (title || '').toLowerCase();
    if (t.includes('flight')) return '#all-packages?cat=flight';
    if (t.includes('hajj') || t.includes('umrah')) return '#all-packages?cat=hajj';
    if (t.includes('ramadan')) return '#all-packages?cat=ramadan';
    if (t.includes('tour') && t.includes('custom')) return '#all-packages?cat=custom';
    if (t.includes('hotel') || t.includes('accommodation')) return '#all-packages?cat=hotel';
    return `#all-packages?cat=${encodeURIComponent(t.replace(/\s+/g, '_'))}`;
  };

  const getInclusionsForService = (srv) => {
    if (!srv) return [];
    
    if (srv.inclusions) {
      if (Array.isArray(srv.inclusions)) return srv.inclusions;
      return srv.inclusions.split(',').map(item => item.trim()).filter(Boolean);
    }
    
    const desc = srv.desc || '';
    const includesIndex = desc.toLowerCase().indexOf('includes:');
    if (includesIndex !== -1) {
      const listPart = desc.substring(includesIndex + 9);
      return listPart.split(/[,;\n•]+| and /).map(item => item.trim()).filter(item => item && item.length > 2);
    }

    const title = (srv.title || '').toLowerCase();
    if (title.includes('flight')) {
      return [
        "Saudia Airlines & Major Global Carriers",
        "24/7 Ticket Reissuance & Support Desk",
        "Priority Seat Selection & Extra Baggage"
      ];
    }
    if (title.includes('tour') && (title.includes('hajj') || title.includes('umrah') || title.includes('professional'))) {
      return [
        "Official NAHCON & Saudi Approved Visas",
        "Hand-selected 5-Star Accommodations near Haram",
        "Experienced Spiritual Guides & Educational Seminars"
      ];
    }
    if (title.includes('custom') || title.includes('family')) {
      return [
        "Custom Family itineraries & Multi-destination plans",
        "Ground transportation & Dedicated Private Chauffeur",
        "Curated luxury hotel rates & Exclusive sightseeing"
      ];
    }
    if (title.includes('hotel') || title.includes('accommodation')) {
      return [
        "Budget & Executive Hotels worldwide",
        "Luxury Resorts, Apartments & Short-lets",
        "Group accommodation bookings"
      ];
    }
    
    return [
      "24/7 dedicated travel concierge",
      "Official visa documentation support",
      "Handpicked luxury accommodations"
    ];
  };

  // RENDER DEDICATED FULL STANDALONE PAGE
  if (standalone) {
    return (
      <div style={styles.standalonePage}>
        {/* Decorative dynamic background elements */}
        <div style={{...styles.blurBlob, top: '10%', left: '5%', background: 'radial-gradient(circle, rgba(0, 162, 232, 0.08), transparent 70%)'}}></div>
        <div style={{...styles.blurBlob, bottom: '15%', right: '5%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08), transparent 70%)'}}></div>

        <div className="container" style={{position: 'relative', zIndex: 2, padding: '80px 0 80px 0'}}>
          {/* Contextual Back Button */}
          <div style={{textAlign: 'left', marginBottom: '20px'}}>
            <button onClick={() => window.history.back()} style={styles.backButtonTop} className="hover-lift">← Back</button>
          </div>
          {/* Header */}
          <div style={{textAlign: 'center', marginBottom: '50px'}} className="animate-fade-in-up">
            <span style={styles.badge}>World-Class Standard</span>
            <h1 style={styles.heroHeading}>Our Premium <span style={{color: 'var(--primary-gold)'}}>Services</span></h1>
            <p style={styles.heroSub}>Tailor-made itineraries, global reservations, and spiritual journeys managed with absolute comfort and integrity.</p>
            <div style={{width: '60px', height: '4px', backgroundColor: 'var(--primary-accent)', margin: '20px auto 0 auto', borderRadius: '2px'}}></div>
          </div>

          {/* Segmented Controller Tab Bar */}
          <div style={styles.tabContainer} className="glass-panel animate-fade-in-up">
            {services.map((srv, idx) => (
              <button 
                key={srv.id} 
                onClick={() => {
                  setActiveTab(idx);
                  window.location.hash = `#services-page?tab=${idx}`;
                }}
                style={{
                  ...styles.tabButton,
                  backgroundColor: activeTab === idx ? 'var(--primary-navy)' : 'transparent',
                  color: activeTab === idx ? '#fff' : 'var(--primary-navy)',
                  border: activeTab === idx ? '1px solid var(--primary-gold)' : '1px solid transparent',
                  boxShadow: activeTab === idx ? '0 10px 20px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                <span style={{marginRight: '10px', fontSize: '1.2rem'}}>{srv.icon}</span>
                {srv.title}
              </button>
            ))}
          </div>

          {/* Dynamic Active Tab Details Card */}
          <div style={styles.detailCard} className="glass-panel animate-fade-in-up">
            <div style={styles.detailGrid}>
              <div style={styles.detailInfo}>
                <div style={styles.detailIcon}>{renderIcon(services[activeTab]?.icon)}</div>
                <h2 style={styles.detailTitle}>{services[activeTab]?.title}</h2>
                <p style={styles.detailDesc}>{services[activeTab]?.desc}</p>
                
                {/* Specific feature highlights */}
                <h4 style={{color: 'var(--primary-navy)', margin: '30px 0 15px 0', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px', fontWeight: '800'}}>Exclusive Inclusions:</h4>
                <ul style={styles.detailList}>
                  {getInclusionsForService(services[activeTab]).map((inc, i) => (
                    <li key={i} style={styles.detailListItem}>
                      <span style={styles.checkMark}>✓</span> {inc}
                    </li>
                  ))}
                </ul>

                {/* Primary CTA Button */}
                <div style={{marginTop: '35px'}}>
                  <a 
                    href={getPackageCategoryLink(services[activeTab]?.title)} 
                    className="btn btn-navy hover-lift" 
                    style={{
                      padding: '18px 40px', 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      display: 'inline-block',
                      backgroundColor: 'var(--primary-navy)',
                      color: '#fff',
                      border: '1px solid var(--primary-gold)',
                      boxShadow: '0 10px 25px rgba(5,16,36,0.15)'
                    }}
                  >
                    Select {services[activeTab]?.title || 'Service'} Package Plan →
                  </a>
                </div>
              </div>

              {/* Graphical Visual Panel side */}
              <div style={styles.detailGraphic}>
                <div style={styles.graphicBox} className="animate-scale">
                  <div style={{fontSize: '5rem', marginBottom: '20px'}}>{services[activeTab]?.icon || '✈️'}</div>
                  <h3 style={{color: 'var(--primary-navy)', margin: '0 0 10px 0', fontWeight: '800'}}>{services[activeTab]?.title}</h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6'}}>
                    {services[activeTab]?.desc ? services[activeTab].desc.split('Includes:')[0].trim() : 'Enjoy complete comfort, unshakeable integrity, and premium service rates with Na-Allah Travel.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD HOME PAGE SECTION RENDER
  return (
    <section id="services" className="section-padding" style={{backgroundColor: 'var(--off-white)', position: 'relative', overflow: 'hidden'}}>
      {/* Decorative background elements */}
      <div style={{position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 162, 232, 0.05), transparent 70%)', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46, 49, 146, 0.05), transparent 70%)', pointerEvents: 'none'}} />

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)'}} className="animate-fade-in-up">
          <h2 style={{color: 'var(--primary-navy)', fontSize: 'clamp(2rem, 6vw, 3rem)'}}>Our Premium Services</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '650px', margin: '15px auto 30px auto', fontSize: '1.1rem'}}>We provide comprehensive religious and global travel solutions with unshakeable integrity and world-class comfort.</p>
          <div style={{width: '80px', height: '4px', backgroundColor: 'var(--primary-accent)', margin: '0 auto', borderRadius: '2px'}}></div>
        </div>
        
        <div style={styles.grid}>
          {services.map((srv, idx) => (
             <div 
               key={srv.id} 
               style={{...styles.card, cursor: 'pointer', animationDelay: `${idx * 0.15}s`}} 
               className="animate-fade-in-up hover-lift"
               onClick={() => onSelectService ? onSelectService(srv.title, idx) : window.location.hash = `#services-page?tab=${idx}`}
             >
               <div style={styles.iconBox}>{renderIcon(srv.icon)}</div>
               <h3 style={styles.title}>{srv.title}</h3>
               <p style={{color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px'}}>{srv.desc}</p>
               <div style={{
                 color: 'var(--primary-accent)', 
                 fontWeight: '800', 
                 fontSize: '0.9rem', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 gap: '5px',
                 marginTop: 'auto',
                 textTransform: 'uppercase',
                 letterSpacing: '0.5px'
               }}>
                 Inquire Now <span style={{ transition: 'transform 0.2s' }} className="arrow">→</span>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  backButtonTop: { background: '#fff', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block', color: 'var(--primary-navy)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' },
  card: { padding: 'clamp(30px, 6vw, 50px) clamp(20px, 5vw, 40px)', backgroundColor: 'var(--clear-white)', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-dark)', position: 'relative', overflow: 'hidden' },
  iconBox: { color: 'var(--primary-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(0, 162, 232, 0.08)', borderRadius: '50%', marginBottom: '25px', width: '90px', height: '90px' },
  title: { color: 'var(--primary-navy)', marginBottom: '15px', fontWeight: '800', fontSize: '1.4rem' },
  
  // Standalone Services page styles
  standalonePage: { backgroundColor: 'var(--off-white)', minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '20px 0 100px 0' },
  blurBlob: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatElement 20s ease-in-out infinite' },
  badge: { display: 'inline-block', padding: '8px 20px', borderRadius: '30px', backgroundColor: 'rgba(0, 162, 232, 0.08)', color: 'var(--primary-accent)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px' },
  heroHeading: { color: 'var(--primary-navy)', fontSize: 'clamp(2.1rem, 6vw, 3.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px' },
  heroSub: { color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' },
  tabContainer: { display: 'flex', justifyContent: 'center', gap: '15px', maxWidth: '700px', margin: '0 auto 40px auto', padding: '10px', borderRadius: '40px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', boxShadow: 'var(--shadow-md)', flexWrap: 'wrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid rgba(255,255,255,0.4)' },
  tabButton: { padding: '14px 24px', borderRadius: '30px', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', outline: 'none', border: '1px solid transparent', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' },
  detailCard: { backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(15px)', borderRadius: '40px', padding: 'clamp(25px, 5vw, 50px)', boxShadow: '0 30px 60px -15px rgba(5,16,36,0.1)', border: '1px solid rgba(255,255,255,0.5)', width: '100%', boxSizing: 'border-box' },
  detailGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'center' },
  detailInfo: { textAlign: 'left' },
  detailIcon: { fontSize: '2.5rem', width: '70px', height: '70px', backgroundColor: 'rgba(0, 162, 232, 0.08)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: 'var(--primary-accent)' },
  detailTitle: { fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', color: 'var(--primary-navy)', fontWeight: '900', marginBottom: '15px' },
  detailDesc: { color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 },
  detailList: { listStyle: 'none', padding: 0, margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '15px' },
  detailListItem: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', color: '#475569', fontWeight: '600' },
  checkMark: { color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '1.1rem' },
  detailGraphic: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  graphicBox: { padding: '30px 20px', borderRadius: '30px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '400px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }
};

export default Services;
