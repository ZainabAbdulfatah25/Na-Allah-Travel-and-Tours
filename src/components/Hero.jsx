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
        <h1 style={styles.heading} className="animate-fade-in-up">Your Journey to the <span style={{color: 'var(--primary-gold)'}}>Holy Land</span> Begins Here.</h1>
        <p style={styles.subtext} className="animate-fade-in-up delay-1">Providing premium Hajj, Umrah, and Global travel solutions with over 15 years of excellence.</p>
        
        <form onSubmit={handleSearch} style={{maxWidth: '650px', margin: '0 auto'}} className="animate-fade-in-up delay-2">
          <select 
            style={styles.select} 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
          >
             <option value="">Where are you going?</option>
             <option value="mecca">Mecca (Hajj/Umrah)</option>
             <option value="medina">Medina</option>
          </select>
          <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <button type="submit" className="btn btn-navy hover-lift" style={{padding: '16px 45px', fontSize: '1rem', fontWeight: 'bold'}}>Search Packages</button>
            <a href="#all-packages" className="btn btn-primary hover-lift" style={{padding: '16px 45px', fontSize: '1rem', fontWeight: 'bold', textDecoration: 'none'}}>Book Now</a>
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
    backgroundColor: 'var(--primary-navy)',
    backgroundImage: 'linear-gradient(rgba(10, 31, 61, 0.8), rgba(10, 31, 61, 0.8)), url("https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    paddingTop: '60px'
  },
  heading: { fontSize: '4.2rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px' },
  subtext: { fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', marginBottom: '50px', maxWidth: '750px', margin: '0 auto 60px auto' },
  select: { width: '100%', padding: '18px 25px', borderRadius: '15px', border: 'none', marginBottom: '25px', fontSize: '1rem', color: 'var(--primary-navy)', fontWeight: 'bold' }
};

export default Hero;
