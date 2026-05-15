import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Flyers() {
  const [flyers, setFlyers] = useState([]);

  const loadFlyers = async () => {
    const localData = JSON.parse(localStorage.getItem('na_allah_flyers')) || [];
    const activeLocal = localData.filter(f => f.status !== 'Inactive');
    if (activeLocal.length > 0) setFlyers(activeLocal);
    
    try {
      const { data, error } = await supabase.from('na_allah_flyers').select('*').order('id', { ascending: false });
      if (data && !error) {
        localStorage.setItem('na_allah_flyers', JSON.stringify(data));
        setFlyers(data.filter(f => f.status !== 'Inactive'));
      }
    } catch(err) {}
  };

  useEffect(() => {
    loadFlyers();
    const handleSync = (e) => { if (e.key === 'na_allah_flyers') loadFlyers(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  if (flyers.length === 0) return null;

  // Duplicate for infinite scroll to always cover screen width
  const displayFlyers = [...flyers, ...flyers, ...flyers];

  const openFlyer = (link) => {
    if (!link) return;
    window.open(link, '_blank');
  };

  return (
    <section id="flyers" className="section-padding" style={{backgroundColor: '#0f172a', position: 'relative', overflow: 'hidden'}}>
      {/* Dark premium background for contrast */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '20%', left: '-10%', background: 'rgba(212, 175, 55, 0.15)'}}></div>
        <div style={{...styles.blurBlob, bottom: '-20%', right: '10%', background: 'rgba(0, 162, 232, 0.1)', animationDelay: '-8s'}}></div>
      </div>

      <div className="container-fluid" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}} className="animate-fade-in-up">
          <span style={{color: 'var(--primary-gold)', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', display: 'block', marginBottom: '15px'}}>Latest Offers</span>
          <h2 style={{color: 'white', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: '900'}}>Special Travel Plans</h2>
          <div style={{width: '60px', height: '4px', backgroundColor: 'var(--primary-gold)', margin: '20px auto', borderRadius: '10px'}}></div>
        </div>
        
        <div style={styles.marqueeWrapper}>
          <div className="flyer-marquee-inner" style={styles.marqueeContent}>
            {displayFlyers.map((f, idx) => (
               <div 
                 key={`${f.id}-${idx}`} 
                 style={styles.card} 
                 className="flyer-card"
                 onClick={() => openFlyer(f.image)}
               >
                 <img 
                   src={f.image} 
                   alt={f.title} 
                   style={styles.flyerImg} 
                   className="flyer-img"
                   onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Flyer+Unavailable'; }}
                 />
                 <div style={styles.overlay} className="flyer-overlay">
                   <h3 style={styles.title}>{f.title}</h3>
                   <span style={styles.viewText}>Click to Enlarge 🔍</span>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flyerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * ${flyers.length} - 30px * ${flyers.length})); }
        }
        .flyer-marquee-inner {
          animation: flyerMarquee ${flyers.length * 10}s linear infinite;
        }
        .flyer-marquee-inner:hover {
          animation-play-state: paused !important;
        }
        .flyer-card:hover .flyer-img {
          transform: scale(1.05);
        }
        .flyer-card:hover .flyer-overlay {
          opacity: 1;
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
    gap: '30px', 
    width: 'max-content',
    padding: '10px 30px'
  },
  card: { 
    width: '350px',
    height: '450px',
    backgroundColor: '#1e293b', 
    borderRadius: '16px', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)', 
    border: '2px solid rgba(255,255,255,0.05)', 
    position: 'relative',
    flexShrink: 0,
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  flyerImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
  },
  overlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 60%, transparent 100%)',
    padding: '40px 20px 20px 20px',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '150px'
  },
  title: { color: 'white', marginBottom: '10px', fontSize: '1.2rem', fontWeight: '800', lineHeight: '1.3' },
  viewText: { color: 'var(--primary-gold)', fontSize: '0.9rem', fontWeight: 'bold' },
  blurBlob: { position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', filter: 'blur(120px)', animation: 'floatElement 25s ease-in-out infinite' }
};

export default Flyers;
