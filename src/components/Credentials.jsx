import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Credentials() {
  const [licenses, setLicenses] = useState([
     { id: 1, title: 'Corporate Affairs Commission', status: 'Official', link: '#' },
     { id: 2, title: 'IATA Approved Agency', status: 'Verified Member', link: '#' }
  ]);

  const loadLicenses = async () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_licenses'));
    if (saved) setLicenses(saved);
    
    try {
      const { data, error } = await supabase.from('na_allah_licenses').select('*').order('id', { ascending: true });
      if (data && !error && data.length > 0) {
        setLicenses(data);
        localStorage.setItem('na_allah_licenses', JSON.stringify(data));
      }
    } catch(err) {}
  };

  useEffect(() => {
    loadLicenses();
    const handleSync = (e) => { if (e.key === 'na_allah_licenses') loadLicenses(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const openDoc = (link) => {
    if (!link || link === '#') return alert('No file attached.');
    if (link.startsWith('data:')) {
      try {
        const type = link.split(';')[0].split(':')[1];
        const bytes = atob(link.split(',')[1]);
        const arr = new Uint8Array(bytes.length).map((_, i) => bytes.charCodeAt(i));
        const blob = new Blob([arr], { type: type });
        window.open(URL.createObjectURL(blob), '_blank');
      } catch (e) { window.open(link, '_blank'); }
    } else { window.open(link, '_blank'); }
  };

  const displayLicenses = [...licenses, ...licenses]; // Duplicate for infinite scroll

  return (
    <section id="credentials" className="section-padding" style={{backgroundColor: 'var(--off-white)', position: 'relative', overflow: 'hidden', paddingBottom: '100px'}}>
      {/* Dynamic 3D elements for uniqueness */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '20%', left: '-5%', background: 'rgba(212, 175, 55, 0.08)'}}></div>
        <div style={{...styles.blurBlob, bottom: '10%', right: '-5%', background: 'rgba(5, 16, 36, 0.05)', animationDelay: '-5s'}}></div>
      </div>

      <div className="container-fluid" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: '60px'}} className="animate-fade-in-up">
          <h2 style={{color: 'var(--primary-navy)'}}>Official Authority Credentials</h2>
          <p style={{color: '#64748b', fontSize: '1rem', marginTop: '5px'}}>Fully licensed for global and religious travel operations.</p>
          <div style={{width: '60px', height: '4px', backgroundColor: 'var(--primary-gold)', margin: '15px auto 40px auto'}}></div>
        </div>
        
        <div style={styles.marqueeWrapper}>
          <div className="marquee-inner" style={styles.marqueeContent}>
            {displayLicenses.map((l, idx) => (
               <div 
                 key={`${l.id}-${idx}`} 
                 style={styles.card} 
                 className="hover-lift glass-panel"
               >
                 <div style={styles.badge}>{l.status || 'OFFICIAL'}</div>
                 
                 <div style={styles.previewArea}>
                    {l.link && l.link !== '#' ? (
                      l.link.includes('pdf') || l.link.startsWith('data:application/pdf') ? (
                        <div style={styles.docPlaceholder}>
                           <span style={{fontSize: '3rem'}}>📄</span>
                           <span style={{marginTop: '10px', fontSize: '0.7rem'}}>PDF DOCUMENT</span>
                        </div>
                      ) : (
                        <img 
                          src={l.link} 
                          alt={l.title} 
                          style={styles.previewImg} 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      )
                    ) : null}
                    <div style={{...styles.docPlaceholder, display: (l.link && l.link !== '#' && !l.link.includes('pdf')) ? 'none' : 'flex'}}>
                      <div style={styles.placeholderSeal}></div>
                      <div style={styles.placeholderLine}></div>
                      <div style={styles.placeholderLine}></div>
                      <div style={{...styles.placeholderLine, width: '40%'}}></div>
                      <span style={{marginTop: '15px', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px', opacity: 0.5}}>{l.link?.includes('pdf') ? 'PDF DOCUMENT' : 'OFFICIAL CREDENTIAL'}</span>
                    </div>
                 </div>

                 <div style={styles.cardContent}>
                   <h3 style={styles.title}>{l.title}</h3>
                   <button onClick={() => openDoc(l.link)} className="btn-outline" style={styles.viewBtn}>Review Certification</button>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * ${licenses.length} - 30px * ${licenses.length})); }
        }
        .marquee-inner:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}

const styles = {
  marqueeWrapper: { 
    width: '100%', 
    overflow: 'hidden', 
    padding: '40px 0',
    position: 'relative'
  },
  marqueeContent: { 
    display: 'flex', 
    gap: '30px', 
    width: 'max-content',
    animation: 'marquee 40s linear infinite',
    padding: '10px 40px'
  },
  card: { 
    width: '350px',
    padding: '0', 
    backgroundColor: 'rgba(255,255,255,0.7)', 
    backdropFilter: 'blur(10px)', 
    borderRadius: 'var(--radius-lg)', 
    textAlign: 'center', 
    boxShadow: '0 15px 35px -10px rgba(0,0,0,0.08)', 
    border: '1px solid rgba(255,255,255,0.4)', 
    position: 'relative',
    flexShrink: 0,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  previewArea: {
    width: '100%',
    height: '220px',
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
    position: 'relative',
    borderBottom: '1px solid rgba(0,0,0,0.05)'
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    transform: 'scale(1.1)',
    transformOrigin: 'top',
    opacity: 1,
    transition: 'transform 0.5s ease'
  },
  docPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
    color: 'var(--primary-navy)',
    position: 'relative',
    padding: '20px'
  },
  placeholderSeal: {
    width: '50px',
    height: '50px',
    backgroundColor: 'var(--primary-gold)',
    borderRadius: '50%',
    opacity: 0.2,
    marginBottom: '15px',
    boxShadow: '0 0 0 4px rgba(212, 175, 55, 0.1)'
  },
  placeholderLine: {
    width: '60%',
    height: '4px',
    backgroundColor: '#e2e8f0',
    borderRadius: '2px',
    marginBottom: '8px'
  },
  cardContent: {
    padding: '30px 25px 40px 25px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  badge: { position: 'absolute', top: '15px', right: '15px', fontSize: '0.6rem', color: 'var(--primary-gold)', fontWeight: '900', letterSpacing: '2px', backgroundColor: 'rgba(255,255,255,0.9)', border: '1.5px solid var(--primary-gold)', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', zIndex: 2 },
  title: { color: 'var(--primary-navy)', marginBottom: '25px', fontSize: '1.15rem', fontWeight: '800', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' },
  viewBtn: { padding: '12px 25px', fontSize: '0.85rem', fontWeight: '800', width: '100%', borderRadius: '12px', transition: 'all 0.3s' },
  blurBlob: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatElement 25s ease-in-out infinite' }
};

export default Credentials;
