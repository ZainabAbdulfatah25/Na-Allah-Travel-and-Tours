import React, { useEffect, useState } from 'react';

function Credentials() {
  const [licenses, setLicenses] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');

  const loadData = () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_licenses')) || [
       { id: 1, title: 'Corporate Affairs Commission (CAC)', link: '#', status: 'Official' },
       { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Verified' },
       { id: 3, title: 'IATA Accredited Agency', link: '#', status: 'Authorized' }
    ];
    setLicenses(saved);
  };

  useEffect(() => {
    loadData();
    const handleSync = (e) => { if (e.key === 'na_allah_licenses') loadData(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const handleOpenDoc = (dataUri) => {
    if (!dataUri || dataUri === '#' || dataUri === '') {
      setAlertMsg('This official document is currently undergoing verification. Please check back shortly.');
      return;
    }

    // IF it's a Base64 PDF, convert to Blob URL to bypass browser blockade
    if (dataUri.startsWith('data:application/pdf;base64,')) {
      try {
        const byteCharacters = atob(dataUri.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      } catch (err) {
        window.open(dataUri, '_blank'); // Fallback
      }
    } else {
      window.open(dataUri, '_blank');
    }
  };

  return (
    <section id="credentials" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3.5rem', color: 'var(--primary-navy)', marginBottom: '15px' }}>Agency <span style={{ color: 'var(--primary-gold)' }}>Credentials</span></h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '750px', margin: '0 auto' }}>
            Official regulatory licenses and certifications proving our commitment to premium Hajj, Umrah, and Global Travel standards.
          </p>
        </div>

        <div style={styles.grid}>
          {licenses.map(lic => (
            <div key={lic.id} style={styles.card} className="cred-card border-hover">
              <div style={styles.iconBox}>📜</div>
              <h3 style={styles.licTitle}>{lic.title}</h3>
              <p style={styles.licStatus}>{lic.status || 'Verified'}</p>
              <button 
                onClick={() => handleOpenDoc(lic.link)} 
                style={styles.docBtn}
              >View Certificate →</button>
            </div>
          ))}
        </div>

        {/* CUSTOM NOTIFICATION MODAL */}
        {alertMsg && (
          <div style={styles.overlay} onClick={() => setAlertMsg('')}>
             <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.mHead}>🔔 Authority Notice</div>
                <div style={styles.mBody}>
                   <p style={{marginBottom: '20px', color: '#4b5563', lineHeight: '1.6'}}>{alertMsg}</p>
                   <button onClick={() => setAlertMsg('')} className="btn btn-navy" style={{width: '100%', padding: '15px'}}>Got it, Thanks!</button>
                </div>
             </div>
          </div>
        )}
        
        <div style={styles.footerNote}>
          <p>Verified RC: 2012044 | Registered under Nigerian Tourism Development Authority</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#f9fafb', padding: '120px 0', minHeight: '80vh' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  card: { backgroundColor: 'white', padding: '50px 40px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', transition: 'all 0.3s ease' },
  iconBox: { fontSize: '3rem', marginBottom: '15px' },
  licTitle: { color: 'var(--primary-navy)', fontSize: '1.25rem', marginBottom: '12px', fontWeight: '800' },
  licStatus: { display: 'inline-block', backgroundColor: '#f1f5f9', color: 'var(--primary-gold)', padding: '6px 18px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '25px' },
  docBtn: { display: 'block', margin: '0 auto', background: 'none', border: 'none', color: 'var(--primary-navy)', fontWeight: 'bold', cursor: 'pointer', borderBottom: '2px solid' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modal: { background: 'white', width: '380px', borderRadius: '25px', overflow: 'hidden', textAlign: 'center' },
  mHead: { background: 'var(--primary-navy)', color: 'white', padding: '15px', fontWeight: 'bold', fontSize: '0.9rem' },
  mBody: { padding: '30px' },
  footerNote: { marginTop: '100px', textAlign: 'center', padding: '30px', border: '1px dashed #cbd5e1', borderRadius: '20px', color: '#64748b' }
};

export default Credentials;
