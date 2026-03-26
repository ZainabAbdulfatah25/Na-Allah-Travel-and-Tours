import React, { useEffect, useState } from 'react';

function Packages() {
  const [selectedDest, setSelectedDest] = useState('');
  const [ramadanPackages, setRamadanPackages] = useState([
    { id: 1, title: "RAMADAN STANDARD", fullPrice: "4,000,000", halfPrice: "2,000,000", features: ["Visa Processing", "Economy Flight Ticket (Full)", "Transportation", "Accommodation"] },
    { id: 2, title: "RAMADAN PREMIUM", fullPrice: "4,500,000", halfPrice: "2,400,000", features: ["Visa Processing", "Economy Flight Ticket (Full)", "Transportation", "Premium Accommodation"] },
    { id: 3, title: "RAMADAN VIP", fullPrice: "5,000,000", halfPrice: "2,700,000", features: ["Visa Processing", "Economy Flight Ticket (Full)", "VIP Transportation", "VIP Accommodation"] }
  ]);
  const [hajjPackages, setHajjPackages] = useState([
    { id: 4, title: "HAJJ STANDARD", fullPrice: "6,500,000", features: ["Hajj Visa", "Round-trip Flight", "Mina/Arafat Tents", "Standard Hotel Rooms"] },
    { id: 5, title: "HAJJ PREMIUM", fullPrice: "8,500,000", features: ["Hajj Visa", "Premium Flight", "VIP Tents in Mina", "5-Star Hotel (Closest to Haram)"] },
    { id: 6, title: "HAJJ ROYAL", fullPrice: "12,000,000", features: ["VIP Hajj Visa", "Business Class Flight", "Luxury Private Tents", "Luxury Royal Suites"] }
  ]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('na_allah_packages'));
    if (saved) {
      setRamadanPackages(prev => prev.map(p => {
        const match = saved.ramadan.find(s => s.id === p.id);
        return match ? { ...p, fullPrice: match.price } : p;
      }));
      setHajjPackages(prev => prev.map(p => {
        const match = saved.hajj.find(s => s.id === p.id);
        return match ? { ...p, fullPrice: match.price } : p;
      }));
    }
    const hash = window.location.hash;
    const match = hash.match(/\?dest=(.*)/);
    if (match) setSelectedDest(decodeURIComponent(match[1]));
  }, []);

  const renderSection = (title, items) => (
    <div style={{marginBottom: '100px'}}>
      <div style={{marginBottom: '50px', borderLeft: '8px solid var(--primary-gold)', paddingLeft: '25px'}}>
        <h2 style={{fontSize: '2.5rem', color: 'var(--primary-navy)', marginBottom: '5px'}}>{title}</h2>
        <p style={{color: 'var(--text-muted)', fontSize: '1.2rem'}}>Available Religious Travel Packages for 2026</p>
      </div>
      <div style={styles.grid}>
        {items.map((pkg, idx) => (
          <div key={idx} style={styles.card} className="package-card">
            <div style={styles.cardHeader}>
              <h3 style={{color: 'var(--clear-white)', fontSize: '1.5rem', margin: 0}}>{pkg.title}</h3>
            </div>
            <div style={styles.cardBody}>
               <div style={styles.priceRow}>
                 <p style={styles.priceLabel}>FULL PACKAGE</p>
                 <p style={styles.priceValue}>₦{pkg.fullPrice}</p>
               </div>
               {pkg.halfPrice && (
                 <div style={{...styles.priceRow, borderBottom: '1px solid #eee', paddingBottom: '20px'}}>
                   <p style={styles.priceLabel}>HALF PACKAGE</p>
                   <p style={styles.priceValue}>₦{pkg.halfPrice}</p>
                 </div>
               )}
               <ul style={styles.featureList}>
                 {pkg.features.map((feature, i) => (
                   <li key={i} style={styles.featureItem}><span style={{color: 'var(--primary-gold)', marginRight: '12px', fontWeight: 'bold'}}>✓</span>{feature}</li>
                 ))}
               </ul>
               <a href={`#payment?pkg=${encodeURIComponent(pkg.title + ' Package (Full)')}`} className="btn btn-navy" style={{width: '100%', marginTop: '30px', padding: '15px'}}>Book This Package</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="packages-list" className="section-padding" style={styles.section}>
      <div className="container">
        {window.location.hash.startsWith('#all-packages') && (
           <button onClick={() => window.location.hash = ''} style={styles.backButtonTop}>← Back to Home</button>
        )}

        <div style={{textAlign: 'center', marginBottom: '80px'}}>
          <h1 style={{fontSize: '4rem', marginBottom: '15px'}}>All Travel Packages</h1>
          <p style={{fontSize: '1.3rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto'}}>Complete list of curated religious journeys for the 2026 season.</p>
        </div>

        {selectedDest === 'mecca' ? (
          <>
            {renderSection("Ramadan Packages 2026", ramadanPackages)}
            {renderSection("Hajj Packages 2026", hajjPackages)}
          </>
        ) : (
          <>
            {renderSection("Hajj Packages 2026", hajjPackages)}
            {renderSection("Ramadan Packages 2026", ramadanPackages)}
          </>
        )}

        <div style={styles.specialNote}>
          <p style={{fontSize: '1.2rem'}}>Separate visa processing is available from <strong>₦1,200,000</strong>. Contact us for custom holiday deals.</p>
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px'}}>
            <a href="https://wa.me/message/4X32W3CFCBBNF1" className="btn btn-primary" style={{padding: '15px 40px'}}>WhatsApp Agent</a>
            {window.location.hash.startsWith('#all-packages') && (
               <button onClick={() => window.location.hash = ''} className="btn btn-outline" style={{borderColor: 'white', color: 'white', padding: '15px 40px'}}>Back to Home</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#fff', minHeight: '100vh', padding: '100px 0' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' },
  card: { backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #f1f5f9' },
  cardHeader: { backgroundColor: 'var(--primary-navy)', padding: '25px', textAlign: 'center', borderBottom: '5px solid var(--primary-gold)' },
  cardBody: { padding: '40px' },
  priceRow: { marginBottom: '20px', textAlign: 'center' },
  priceLabel: { fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '800', marginBottom: '5px' },
  priceValue: { fontSize: '2.8rem', color: 'var(--primary-navy)', fontWeight: '800' },
  featureList: { marginTop: '25px' },
  featureItem: { padding: '15px 0', color: 'var(--text-main)', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'baseline', fontSize: '1.1rem' },
  specialNote: { marginTop: '100px', padding: '60px 40px', backgroundColor: 'var(--primary-navy)', color: 'white', borderRadius: '32px', textAlign: 'center', boxShadow: '0 30px 60px -12px rgba(10, 31, 61, 0.5)' }
};

export default Packages;
