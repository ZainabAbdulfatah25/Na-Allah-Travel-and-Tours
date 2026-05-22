import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Packages() {
  const [selectedDest, setSelectedDest] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  
  // Dynamic package states
  const [packagesData, setPackagesData] = useState({
    ramadan: [
      { id: 1, title: "Standard Ramadan", price: "4,000,000", features: ["Visa Processing", "Economy Ticket", "Transportation", "Accommodation"] },
      { id: 2, title: "Premium Ramadan", price: "4,500,000", features: ["Visa Processing", "Economy Ticket", "Transportation", "Premium Hotel"] },
      { id: 3, title: "VIP Ramadan", price: "5,000,000", features: ["Visa Processing", "Economy Ticket", "VIP Transport", "VIP Suites"] }
    ],
    hajj: [
      { id: 4, title: "Standard Hajj", price: "7,000,000", features: ["Hajj Visa", "Round-trip Flight", "Mina/Arafat Tents", "Standard Hotel Rooms"] },
      { id: 5, title: "Premium Hajj", price: "8,500,000", features: ["Hajj Visa", "Premium Flight", "VIP Tents in Mina", "5-Star Hotel"] },
      { id: 6, title: "Royal Hajj", price: "12,000,000", features: ["VIP Hajj Visa", "Business Class", "Luxury Tents", "Royal Suites"] }
    ]
  });

  useEffect(() => {
    const handleSync = async () => {
      const saved = JSON.parse(localStorage.getItem('na_allah_packages'));
      const defaultFeatures = ["Visa Processing", "Round-trip Flight", "Transportation", "Full Accommodation"];
      
      const applyPackages = (data) => {
         const pData = { ...packagesData };
         Object.keys(data).forEach(cat => {
            if (data[cat].length > 0) {
               pData[cat] = data[cat].map(p => ({...p, features: p.features || defaultFeatures}));
            } else if (!pData[cat]) {
               pData[cat] = [];
            }
         });
         setPackagesData(pData);
      };
      
      if (saved) applyPackages(saved);
      
      try {
        const { data: catsData } = await supabase.from('na_allah_categories').select('id');
        const { data: pkgData, error } = await supabase.from('na_allah_packages').select('*').order('id', { ascending: true });
        
        if (!error) {
          const pObj = {};
          if (catsData) catsData.forEach(c => pObj[c.id] = []);
          if (pkgData) {
            pkgData.forEach(p => { 
              if (!pObj[p.category]) pObj[p.category] = [];
              pObj[p.category].push(p); 
            });
          }
          applyPackages(pObj);
          try {
            localStorage.setItem('na_allah_packages', JSON.stringify(pObj));
          } catch (e) {
            console.warn('Local storage full for packages, continuing sync...');
          }
        }
      } catch (err) {}
    };
    handleSync();
    
    const handleStorageSync = (e) => { if (e.key === 'na_allah_packages') handleSync(); };
    window.addEventListener('storage', handleStorageSync);
    
    const checkHash = () => {
      const h = window.location.hash;
      const qIndex = h.indexOf('?');
      if (qIndex !== -1) {
        const searchParams = new URLSearchParams(h.substring(qIndex + 1));
        setSelectedDest(searchParams.get('dest') || '');
        setSelectedCat(searchParams.get('cat') || '');
      } else {
        setSelectedDest('');
        setSelectedCat('');
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('storage', handleStorageSync);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const renderSection = (title, items) => (
    <div style={{marginBottom: '100px'}}>
      <div style={{marginBottom: '50px', borderLeft: '8px solid var(--primary-gold)', paddingLeft: 'clamp(15px, 3vw, 25px)'}}>
        <h2 style={{fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'var(--primary-navy)', marginBottom: '5px'}}>{title}</h2>
        <p style={{color: 'var(--text-muted)', fontSize: '1.2rem'}}>Religious Travel Packages for 2026</p>
      </div>
      <div style={styles.grid}>
        {items.map((pkg, idx) => (
          <div 
            key={pkg.id} 
            style={{...styles.card, transitionDelay: `${idx * 0.1}s`}} 
            className={`package-card animate-fade-in-up delay-${idx+1} hover-lift`}
          >
            <div style={styles.cardHeader}><h3 style={{color: 'var(--clear-white)', fontSize: '1.4rem', margin: 0, textTransform: 'uppercase'}}>{pkg.title}</h3></div>
            <div style={styles.cardBody}>
               <div style={styles.priceRow}><p style={styles.priceLabel}>EXECUTIVE PACKAGE</p><p style={styles.priceValue}>₦{pkg.price}</p></div>
               <ul style={styles.featureList}>
                 {pkg.features.map((feature, i) => (
                   <li key={i} style={styles.featureItem}><span style={{color: 'var(--primary-gold)', marginRight: '12px', fontWeight: 'bold'}}>✓</span>{feature}</li>
                 ))}
               </ul>
               <a href={`#payment?pkg=${encodeURIComponent(pkg.title)}`} className="btn btn-navy hover-lift" style={{width: '100%', marginTop: '30px', padding: '15px', fontWeight: 'bold'}}>Official Booking</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="all-packages" className="section-padding" style={{...styles.section, position: 'relative', overflow: 'hidden'}}>
      {/* 3D Particle effect to make the page unique */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '10%', left: '10%', background: 'rgba(212, 175, 55, 0.15)'}}></div>
        <div style={{...styles.blurBlob, bottom: '20%', right: '5%', background: 'rgba(0, 162, 232, 0.1)'}}></div>
      </div>

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        {window.location.hash.includes('all-packages') && (<button onClick={() => window.history.back()} style={styles.backButtonTop}>← Back</button>)}
        <div style={{textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)'}} className="animate-fade-in-up">
          <h1 style={{fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '15px'}}>Our 2026 Packages</h1>
          <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto'}}>Complete list of seasonal travel arrangements for spiritual journeys.</p>
        </div>
        
        {(() => {
          const filteredCats = Object.keys(packagesData).filter(cat => {
            if (selectedCat) {
              if (selectedCat.toLowerCase().includes('hajj') || selectedCat.toLowerCase().includes('umrah')) {
                return cat.toLowerCase().includes('hajj') || cat.toLowerCase().includes('ramadan');
              }
              return cat.toLowerCase().includes(selectedCat.toLowerCase()) || selectedCat.toLowerCase().includes(cat.toLowerCase());
            }
            return true;
          });

          // Check if there are any active packages in the filtered categories
          const hasPackages = filteredCats.some(cat => packagesData[cat] && packagesData[cat].length > 0);

          if (!hasPackages && selectedCat) {
            let serviceName = "Custom Sacred Travel";
            if (selectedCat.includes('flight')) serviceName = "Flight Bookings";
            else if (selectedCat.includes('hotel')) serviceName = "Hotel Reservation services";
            else if (selectedCat.includes('custom')) serviceName = "Customized Tours";
            else {
              serviceName = selectedCat.charAt(0).toUpperCase() + selectedCat.slice(1).replace(/_/g, ' ');
            }

            return (
              <div className="glass-panel animate-fade-in-up" style={{
                maxWidth: '700px',
                margin: '50px auto 100px auto',
                padding: 'clamp(30px, 6vw, 60px)',
                borderRadius: '35px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 20px 40px rgba(5, 16, 36, 0.05)'
              }}>
                <div style={{fontSize: '4.5rem', marginBottom: '20px'}}>✨</div>
                <h2 style={{color: 'var(--primary-navy)', fontWeight: '900', fontSize: '2rem', marginBottom: '15px'}}>Bespoke {serviceName} Arrangements</h2>
                <p style={{color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '35px'}}>
                  Because travel desires are completely unique, we don't force you into static templates. We customize every flight itinerary, stopover duration, transport tier, and hotel category to align perfectly with your schedule and budget.
                </p>
                <a 
                  href={`#payment?pkg=${encodeURIComponent(serviceName)}`} 
                  className="btn btn-navy hover-lift" 
                  style={{
                    padding: '18px 45px', 
                    fontWeight: 'bold', 
                    fontSize: '1.05rem', 
                    display: 'inline-block',
                    borderRadius: '30px',
                    backgroundColor: 'var(--primary-navy)',
                    color: '#fff',
                    border: '1px solid var(--primary-gold)',
                    boxShadow: '0 10px 25px rgba(5, 16, 36, 0.15)'
                  }}
                >
                  Request Custom Booking & Quote →
                </a>
              </div>
            );
          }

          return filteredCats.sort((a,b) => {
             if (selectedDest === 'mecca') {
               if (a === 'ramadan') return -1;
               if (b === 'ramadan') return 1;
             } else {
               if (a === 'hajj') return -1;
               if (b === 'hajj') return 1;
             }
             return 0;
          }).map(cat => (
            <React.Fragment key={cat}>
               {packagesData[cat].length > 0 && renderSection(`${cat.replace(/_/g, ' ').toUpperCase()} Packages 2026`, packagesData[cat])}
            </React.Fragment>
          ));
        })()}

      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: 'var(--off-white)', minHeight: '100vh', padding: '100px 0' },
  blurBlob: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatElement 15s ease-in-out infinite' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' },
  card: { backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9' },
  cardHeader: { backgroundColor: 'var(--primary-navy)', padding: '25px', textAlign: 'center', borderBottom: '5px solid var(--primary-gold)' },
  cardBody: { padding: 'clamp(20px, 5vw, 40px)' },
  priceRow: { marginBottom: '20px', textAlign: 'center' },
  priceLabel: { fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '800', marginBottom: '5px' },
  priceValue: { fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', color: 'var(--primary-navy)', fontWeight: 'bold' },
  featureList: { marginTop: '25px' },
  featureItem: { padding: '12px 0', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'baseline', fontSize: '1rem', color: '#475569' }
};

export default Packages;
