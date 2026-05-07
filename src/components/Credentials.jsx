import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Credentials() {
  const [licenses, setLicenses] = useState([
     { id: 1, title: 'Corporate Affairs Commission', status: 'Official' },
     { id: 2, title: 'IATA Approved Agency', status: 'Verified' }
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

  return (
    <section id="credentials" className="section-padding" style={{backgroundColor: 'var(--off-white)', position: 'relative', overflow: 'hidden'}}>
      {/* Dynamic 3D elements for uniqueness */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '20%', left: '-5%', background: 'rgba(212, 175, 55, 0.08)'}}></div>
        <div style={{...styles.blurBlob, bottom: '10%', right: '-5%', background: 'rgba(5, 16, 36, 0.05)', animationDelay: '-5s'}}></div>
      </div>

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: '60px'}} className="animate-fade-in-up">
          <h2 style={{color: 'var(--primary-navy)'}}>Official Authority Credentials</h2>
          <p style={{color: '#64748b', fontSize: '1rem', marginTop: '5px'}}>Fully licensed for global and religious travel operations.</p>
          <div style={{width: '60px', height: '4px', backgroundColor: 'var(--primary-gold)', margin: '15px auto 40px auto'}}></div>
        </div>
        
        <div style={styles.grid}>
          {licenses.map((l, idx) => (
             <div 
               key={l.id} 
               style={{...styles.card, transitionDelay: `${idx * 0.1}s`}} 
               className="animate-fade-in-up hover-lift glass-panel"
             >
               <div style={styles.badge}>{l.status || 'OFFICIAL'}</div>
               <h3 style={styles.title}>{l.title}</h3>
               <button onClick={() => openDoc(l.link)} className="btn-outline" style={styles.viewBtn}>Review Certification</button>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' },
  card: { padding: '40px 30px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.4)', position: 'relative' },
  badge: { position: 'absolute', top: '20px', right: '20px', fontSize: '0.6rem', color: 'var(--primary-gold)', fontWeight: '900', letterSpacing: '2px', border: '1px solid var(--primary-gold)', padding: '4px 10px', borderRadius: '5px' },
  title: { color: 'var(--primary-navy)', marginBottom: '30px', fontSize: '1.2rem', fontWeight: '800' },
  viewBtn: { padding: '10px 20px', fontSize: '0.8rem', fontWeight: '800', width: '100%', borderRadius: '10px' },
  blurBlob: { position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(80px)', animation: 'floatElement 20s ease-in-out infinite' }
};

export default Credentials;
