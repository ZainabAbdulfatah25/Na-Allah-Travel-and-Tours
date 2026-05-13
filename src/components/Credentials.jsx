import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Credentials() {
  const [licenses, setLicenses] = useState([
     { id: 1, title: 'Corporate Affairs Commission', status: 'Official', link: '#' },
     { id: 2, title: 'IATA Approved Agency', status: 'Verified Member', link: '#' }
  ]);

  const loadLicenses = async () => {
    const localData = JSON.parse(localStorage.getItem('na_allah_licenses')) || [];
    if (localData.length > 0) setLicenses(localData);
    
    try {
      const { data, error } = await supabase.from('na_allah_licenses').select('*').order('id', { ascending: true });
      if (data && !error && data.length > 0) {
        // Robust thumbnail preservation: Merge from dedicated thumbnail vault
        const vault = JSON.parse(localStorage.getItem('na_allah_thumb_vault') || '{}');
        const merged = data.map(remoteItem => {
          return {
            ...remoteItem,
            thumbnail: remoteItem.thumbnail || vault[remoteItem.id] || null
          };
        });
        setLicenses(merged);
        localStorage.setItem('na_allah_licenses', JSON.stringify(merged));
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
    <section id="credentials" className="section-padding" style={{backgroundColor: '#fdfcfb', position: 'relative', overflow: 'hidden', paddingBottom: '120px'}}>
      {/* Premium Background Elements */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '-10%', left: '-5%', background: 'rgba(212, 175, 55, 0.05)'}}></div>
        <div style={{...styles.blurBlob, bottom: '0', right: '-10%', background: 'rgba(5, 16, 36, 0.03)', animationDelay: '-5s'}}></div>
      </div>

      <div className="container-fluid" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: '80px'}} className="animate-fade-in-up">
          <span style={{color: 'var(--primary-gold)', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '15px'}}>Trust & Authority</span>
          <h2 style={{color: 'var(--primary-navy)', fontSize: '2.8rem', fontWeight: '900'}}>Official Authority Credentials</h2>
          <div style={{width: '80px', height: '5px', backgroundColor: 'var(--primary-gold)', margin: '25px auto', borderRadius: '10px'}}></div>
          <p style={{color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'}}>Providing safe, legal, and spiritually aligned travel experiences through rigorous certification and global standards.</p>
        </div>
        
        <div style={styles.marqueeWrapper}>
          <div className="marquee-inner" style={styles.marqueeContent}>
            {displayLicenses.map((l, idx) => (
               <div 
                 key={`${l.id}-${idx}`} 
                 style={styles.card} 
                 className="hover-lift credential-card"
               >
                 <div style={styles.badge}>{l.status || 'VERIFIED'}</div>
                 
                 <div style={styles.previewArea}>
                    {l.link && l.link !== '#' ? (
                      <>
                        <img 
                          src={l.thumbnail || l.link} 
                          alt={l.title} 
                          style={styles.previewImg} 
                          className="cert-img"
                          onLoad={(e) => {
                            e.target.style.display = 'block';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div style={styles.docPlaceholder}>
                          <span style={{fontSize: '4.5rem', marginBottom: '15px'}}>📜</span>
                          <span style={{fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6}}>Official Document</span>
                        </div>
                      </>
                    ) : (
                      <div style={styles.docPlaceholder}>
                        <span style={{fontSize: '4.5rem', marginBottom: '15px'}}>📜</span>
                        <span style={{fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6}}>Awaiting Upload</span>
                      </div>
                    )}
                 </div>

                 <div style={styles.cardContent}>
                   <h3 style={styles.title}>{l.title}</h3>
                   <div style={{marginTop: 'auto'}}>
                     <button onClick={() => openDoc(l.link)} className="btn-outline" style={styles.viewBtn}>Verify Certificate</button>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * ${licenses.length} - 40px * ${licenses.length})); }
        }
        .marquee-inner:hover {
          animation-play-state: paused !important;
        }
        .credential-card:hover .cert-img {
          transform: scale(1.1) translateY(-10px);
        }
      `}</style>
    </section>
  );
}

const styles = {
  marqueeWrapper: { 
    width: '100%', 
    overflow: 'hidden', 
    padding: '20px 0',
    position: 'relative'
  },
  marqueeContent: { 
    display: 'flex', 
    gap: '40px', 
    width: 'max-content',
    animation: 'marquee 50s linear infinite',
    padding: '20px 40px'
  },
  card: { 
    width: '380px',
    backgroundColor: 'white', 
    borderRadius: '24px', 
    textAlign: 'center', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.05)', 
    border: '1px solid #f1f5f9', 
    position: 'relative',
    flexShrink: 0,
    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  previewArea: {
    width: '100%',
    height: '260px',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: '25px 25px 0 25px',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
  },
  previewImg: {
    width: '100%',
    height: '140%', // Zoom in to show the top part better
    objectFit: 'cover',
    objectPosition: 'top',
    borderRadius: '8px 8px 0 0',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
  },
  docPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fdfcfb 0%, #e2e8f0 100%)',
    color: 'var(--primary-navy)',
    borderRadius: '8px 8px 0 0',
    boxShadow: 'inset 0 0 50px rgba(0,0,0,0.02)',
    border: '1px solid #e2e8f0'
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
