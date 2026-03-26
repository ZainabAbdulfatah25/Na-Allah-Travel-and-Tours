import React, { useEffect, useState } from 'react';

function Packages() {
  const [selectedDest, setSelectedDest] = useState('');
  
  // Dynamic package states
  const [ramadanPackages, setRamadanPackages] = useState([
    { id: 1, title: "Standard Ramadan", price: "4,000,000", features: ["Visa Processing", "Economy Ticket", "Transportation", "Accommodation"] },
    { id: 2, title: "Premium Ramadan", price: "4,500,000", features: ["Visa Processing", "Economy Ticket", "Transportation", "Premium Hotel"] },
    { id: 3, title: "VIP Ramadan", price: "5,000,000", features: ["Visa Processing", "Economy Ticket", "VIP Transport", "VIP Suites"] }
  ]);
  
  const [hajjPackages, setHajjPackages] = useState([
    { id: 4, title: "Standard Hajj", price: "7,000,000", features: ["Hajj Visa", "Round-trip Flight", "Mina/Arafat Tents", "Standard Hotel Rooms"] },
    { id: 5, title: "Premium Hajj", price: "8,500,000", features: ["Hajj Visa", "Premium Flight", "VIP Tents in Mina", "5-Star Hotel"] },
    { id: 6, title: "Royal Hajj", price: "12,000,000", features: ["VIP Hajj Visa", "Business Class", "Luxury Tents", "Royal Suites"] }
  ]);

  useEffect(() => {
    const handleSync = () => {
      const saved = JSON.parse(localStorage.getItem('na_allah_packages'));
      if (saved) {
        const defaultFeatures = ["Visa Processing", "Round-trip Flight", "Transportation", "Full Accommodation"];
        if (saved.ramadan) setRamadanPackages(saved.ramadan.map(p => ({...p, features: p.features || defaultFeatures})));
        if (saved.hajj) setHajjPackages(saved.hajj.map(p => ({...p, features: p.features || defaultFeatures})));
      }
    };
    handleSync();
    window.addEventListener('storage', handleSync);
    
    const checkHash = () => {
      const h = window.location.hash;
      const match = h.match(/\?dest=(.*)/);
      if (match) setSelectedDest(decodeURIComponent(match[1]));
      else setSelectedDest('');
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const renderSection = (title, items) => (
    <div style={{marginBottom: '100px'}}>
      <div style={{marginBottom: '50px', borderLeft: '8px solid var(--primary-gold)', paddingLeft: '25px'}}>
        <h2 style={{fontSize: '2.5rem', color: 'var(--primary-navy)', marginBottom: '5px'}}>{title}</h2>
        <p style={{color: 'var(--text-muted)', fontSize: '1.2rem'}}>Religious Travel Packages for 2026</p>
      </div>
      <div style={styles.grid}>
        {items.map((pkg) => (
          <div key={pkg.id} style={styles.card} className="package-card animate-fade-in">
            <div style={styles.cardHeader}><h3 style={{color: 'var(--clear-white)', fontSize: '1.4rem', margin: 0, textTransform: 'uppercase'}}>{pkg.title}</h3></div>
            <div style={styles.cardBody}>
               <div style={styles.priceRow}><p style={styles.priceLabel}>EXECUTIVE PACKAGE</p><p style={styles.priceValue}>₦{pkg.price}</p></div>
               <ul style={styles.featureList}>
                 {pkg.features.map((feature, i) => (
                   <li key={i} style={styles.featureItem}><span style={{color: 'var(--primary-gold)', marginRight: '12px', fontWeight: 'bold'}}>✓</span>{feature}</li>
                 ))}
               </ul>
               <a href={`#payment?pkg=${encodeURIComponent(pkg.title)}`} className="btn btn-navy" style={{width: '100%', marginTop: '30px', padding: '15px', fontWeight: 'bold'}}>Official Booking</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="all-packages" className="section-padding" style={styles.section}>
      <div className="container">
        {window.location.hash.includes('all-packages') && (<button onClick={() => window.location.hash = ''} style={styles.backButtonTop}>← Back to Home</button>)}
        <div style={{textAlign: 'center', marginBottom: '80px'}}>
          <h1 style={{fontSize: '3.5rem', marginBottom: '15px'}}>Our 2026 Packages</h1>
          <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto'}}>Complete list of seasonal travel arrangements for spiritual journeys.</p>
        </div>
        {selectedDest === 'mecca' ? (
          <>{renderSection("Ramadan Packages 2026", ramadanPackages)}{renderSection("Hajj Packages 2026", hajjPackages)}</>
        ) : (
          <>{renderSection("Hajj Packages 2026", hajjPackages)}{renderSection("Ramadan Packages 2026", ramadanPackages)}</>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#fff', minHeight: '100vh', padding: '100px 0' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' },
  card: { backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9' },
  cardHeader: { backgroundColor: 'var(--primary-navy)', padding: '25px', textAlign: 'center', borderBottom: '5px solid var(--primary-gold)' },
  cardBody: { padding: '40px' },
  priceRow: { marginBottom: '20px', textAlign: 'center' },
  priceLabel: { fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '800', marginBottom: '5px' },
  priceValue: { fontSize: '2.5rem', color: 'var(--primary-navy)', fontWeight: 'bold' },
  featureList: { marginTop: '25px' },
  featureItem: { padding: '12px 0', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'baseline', fontSize: '1rem', color: '#475569' }
};

export default Packages;
