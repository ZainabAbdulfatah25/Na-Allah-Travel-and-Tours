import React, { useEffect, useState } from 'react';

function Credentials() {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('na_allah_licenses')) || [
      { id: 1, title: 'Corporate Affairs Commission (CAC)', link: '#', status: 'Official' },
      { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Active' },
      { id: 3, title: 'IATA Accredited Agency', link: '#', status: 'Verified' }
    ];
    setLicenses(saved);
  }, []);

  return (
    <section id="credentials" className="section-padding" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--primary-navy)', marginBottom: '15px' }}>Agency <span style={{ color: 'var(--primary-gold)' }}>Credentials</span></h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            Na-Allah Travels & Tours Ltd. is an officially recognized and licensed agency for Hajj, Umrah, and Global Flight bookings.
          </p>
        </div>

        <div style={styles.grid}>
          {licenses.map(lic => (
            <div key={lic.id} style={styles.card} className="cred-card">
              <div style={styles.iconBox}>📜</div>
              <h3 style={styles.licTitle}>{lic.title}</h3>
              <p style={styles.licStatus}>{lic.status}</p>
              <a href={lic.link} target="_blank" rel="noreferrer" style={styles.docLink}>View Document →</a>
            </div>
          ))}
        </div>

        <div style={styles.footerNote}>
          <p>Verified RC: 2012044 | Registered under Nigerian Tourism Development Authority</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#f8fafc', padding: '100px 0' },
  container: { maxWidth: '1100px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 15px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
  iconBox: { fontSize: '2.5rem', marginBottom: '20px' },
  licTitle: { color: 'var(--primary-navy)', fontSize: '1.3rem', marginBottom: '10px', fontWeight: '800' },
  licStatus: { display: 'inline-block', backgroundColor: '#ecfdf5', color: '#059669', padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' },
  docLink: { display: 'block', marginTop: '25px', color: 'var(--primary-navy)', fontWeight: 'bold', textDecoration: 'none', borderBottom: '1px solid currentColor', width: 'fit-content', margin: '25px auto 0 auto' },
  footerNote: { marginTop: '80px', textAlign: 'center', padding: '25px', border: '1px dashed #cbd5e1', borderRadius: '12px', color: '#64748b', fontSize: '1rem', fontWeight: '600' }
};

export default Credentials;
