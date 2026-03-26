import React, { useState } from 'react';

function Hero() {
  const [destination, setDestination] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.hash = destination ? `#all-packages?dest=${encodeURIComponent(destination.toLowerCase())}` : '#all-packages';
  };

  return (
    <section className="hero-section" style={styles.hero}>
      <div className="container" style={{textAlign: 'center', position: 'relative', zIndex: 1}}>
        <h1 style={styles.heading}>Your Journey to the <span style={{color: '#d4af37'}}>Holy Land</span> Begins Here.</h1>
        <p style={styles.subtext}>Providing premium Hajj, Umrah, and Global travel solutions with over 15 years of excellence.</p>
        
        <form onSubmit={handleSearch} style={styles.form}>
          <select style={styles.select} value={destination} onChange={(e) => setDestination(e.target.value)}>
             <option value="">Where are you going?</option>
             <option value="mecca">Mecca (Hajj/Umrah)</option>
             <option value="medina">Medina</option>
          </select>
          <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <button type="submit" className="btn btn-navy" style={{padding: '15px 40px'}}>Search Packages</button>
            <a href="#all-packages" className="btn btn-primary" style={{padding: '15px 40px'}}>Book Now</a>
          </div>
        </form>
      </div>
    </section>
  );
}

const styles = {
  hero: { 
    minHeight: '85vh', 
    display: 'flex', 
    alignItems: 'center', 
    backgroundColor: '#0a1f3d',
    backgroundImage: 'linear-gradient(rgba(10, 31, 61, 0.85), rgba(10, 31, 61, 0.85)), url("https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    paddingTop: '80px'
  },
  heading: { fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' },
  subtext: { fontSize: '1.2rem', color: '#ccc', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px auto' },
  form: { maxWidth: '600px', margin: '0 auto' },
  select: { width: '100%', padding: '15px', borderRadius: '12px', border: 'none', marginBottom: '20px', fontSize: '1rem', color: '#0a1f3d' }
};

export default Hero;
