import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import HeroParticles from './HeroParticles';

function Hero() {
  const [destination, setDestination] = useState('');
  const [slogan, setSlogan] = useState('Experience the Ultimate Spiritual Journey with Luxury & Comfort.');
  const [destinations, setDestinations] = useState([
    { id: 1, name: 'Mecca (Hajj/Umrah)', val: 'mecca' },
    { id: 2, name: 'Medina', val: 'medina' }
  ]);
  
  const loadSettings = async () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_settings'));
    if (saved && saved.heroSlogan) setSlogan(saved.heroSlogan);
    
    const savedDest = JSON.parse(localStorage.getItem('na_allah_destinations'));
    if (savedDest) setDestinations(savedDest);
    
    try {
      const { data, error } = await supabase.from('na_allah_destinations').select('*').order('id', { ascending: true });
      if (data && !error && data.length > 0) {
        setDestinations(data);
        localStorage.setItem('na_allah_destinations', JSON.stringify(data));
      }
    } catch(err) {}
  };

  useEffect(() => {
    loadSettings();
    const handleSync = (e) => { 
       if (e.key === 'na_allah_settings' || e.key === 'na_allah_destinations') loadSettings(); 
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.hash = destination ? `#all-packages?dest=${encodeURIComponent(destination.toLowerCase())}` : '#all-packages';
  };

  return (
    <section className="hero-section" style={styles.hero}>
      <HeroParticles />
      <div className="container" style={styles.containerGrid}>
        
        <div style={styles.textSide}>
          <h1 style={styles.heading} className="animate-fade-in-up">
            Your Journey to the <br/>
            <span style={styles.gradientText}>Holy Land</span> Begins Here.
          </h1>
          <p style={styles.subtext} className="animate-fade-in-up delay-1">{slogan}</p>
        </div>
        
        <div style={styles.widgetSide} className="animate-fade-in-up delay-2">
          <form onSubmit={handleSearch} className="glass-panel-dark" style={styles.searchWidget}>
            <div style={{flex: '1', textAlign: 'left', width: '100%'}}>
              <label style={styles.label}>Select Destination</label>
              <select 
                style={styles.select} 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
              >
                 <option value="" style={{color: '#333'}}>Where to?</option>
                 {destinations.map(d => (
                   <option key={d.id} value={d.val} style={{color: '#333'}}>{d.name}</option>
                 ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary hover-lift" style={{padding: '18px 40px', width: '100%', marginTop: '20px'}}>Search Packages</button>
          </form>
        </div>
        
      </div>
    </section>
  );
}

const styles = {
  hero: { 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    backgroundColor: 'var(--primary-navy)',
    backgroundImage: 'linear-gradient(to right, rgba(5, 16, 36, 0.95) 20%, rgba(5, 16, 36, 0.6) 100%), url("https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: 'white',
    paddingTop: '80px',
    position: 'relative'
  },
  containerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '60px',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    width: '100%'
  },
  textSide: { textAlign: 'left' },
  heading: { fontSize: 'clamp(4rem, 7vw, 6.5rem)', fontWeight: '900', lineHeight: '0.95', marginBottom: '30px', letterSpacing: '-0.04em', textTransform: 'uppercase' },
  gradientText: { 
    background: 'linear-gradient(135deg, var(--primary-accent), var(--primary-gold))', 
    WebkitBackgroundClip: 'text', 
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  },
  subtext: { fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'rgba(255,255,255,0.7)', marginBottom: '0', maxWidth: '600px', fontWeight: '500', lineHeight: '1.6' },
  widgetSide: { position: 'relative' },
  searchWidget: { 
    display: 'flex', 
    flexDirection: 'column',
    padding: 'clamp(25px, 5vw, 40px)', 
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    transform: 'translateY(20px)'
  },
  label: { display: 'block', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' },
  select: { width: '100%', padding: '18px 25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '1.2rem', color: 'white', fontWeight: '700', outline: 'none', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }
};

export default Hero;
