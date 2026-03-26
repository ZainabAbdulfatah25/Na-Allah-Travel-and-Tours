import React, { useEffect, useState } from 'react';

function Credentials() {
  const [licenses, setLicenses] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');

  const loadData = () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_licenses')) || [
       { id: 1, title: 'Corporate Affairs Commission', status: 'Official' },
       { id: 2, title: 'NAHCON License 2026', status: 'Verified' },
       { id: 3, title: 'IATA Travel Agency', status: 'Authorized' }
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
      setAlertMsg('This document is currently undergoing verification. Please check back shortly.');
      return;
    }

    if (dataUri.startsWith('data:')) {
      try {
        const type = dataUri.split(';')[0].split(':')[1];
        const byteCharacters = atob(dataUri.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: type });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      } catch (e) { window.open(dataUri, '_blank'); }
    } else {
      window.open(dataUri, '_blank');
    }
  };

  return (
    <section id="credentials" style={styles.section} className="animate-fade-in">
      <div className="container" style={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.8rem', color: 'var(--primary-navy)', marginBottom: '10px' }}>Agency <span style={{ color: 'var(--primary-gold)' }}>Trust Center</span></h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Official regulatory licenses verifying our status as a premier Hajj & Umrah provider.</p>
        </div>

        <div style={styles.grid}>
          {licenses.map((lic, index) => (
            <div 
              key={lic.id} 
              style={{...styles.card, animationDelay: `${index * 0.15}s`}} 
              className="cred-card-mini animate-up"
            >
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

        {alertMsg && (
          <div style={styles.overlay} onClick={() => setAlertMsg('')}>
             <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.mHead}>Notice</div>
                <div style={styles.mBody}>
                   <p style={{color: '#4b5563', fontSize: '0.9rem'}}>{alertMsg}</p>
                   <button onClick={() => setAlertMsg('')} className="btn btn-navy" style={{width: '100%', marginTop: '20px', padding: '12px'}}>Got it</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#fcfcfc', padding: '100px 0', minHeight: '80vh' },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '0 20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' },
  card: { backgroundColor: 'white', padding: '35px 25px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', cursor: 'default' },
  iconBox: { fontSize: '2rem', marginBottom: '10px' },
  licTitle: { color: 'var(--primary-navy)', fontSize: '1rem', marginBottom: '8px', fontWeight: '800' },
  licStatus: { display: 'inline-block', backgroundColor: '#f8fafc', color: 'var(--primary-gold)', padding: '4px 14px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '20px' },
  docBtn: { display: 'block', margin: '0 auto', background: 'none', border: 'none', color: 'var(--primary-navy)', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', borderBottom: '2px solid' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modal: { background: 'white', width: '340px', borderRadius: '20px', overflow: 'hidden', textAlign: 'center' },
  mHead: { background: 'var(--primary-navy)', color: 'white', padding: '12px', fontWeight: 'bold' },
  mBody: { padding: '25px' }
};

export default Credentials;
