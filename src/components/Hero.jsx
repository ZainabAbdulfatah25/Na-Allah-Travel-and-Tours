import React, { useState } from 'react';

function Hero() {
  const [destination, setDestination] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.hash = destination ? `#all-packages?dest=${encodeURIComponent(destination.toLowerCase())}` : '#all-packages';
  };

  return (
    <section className="section-padding" style={{backgroundColor: '#f8fafc', minHeight: '600px', display: 'flex', alignItems: 'center'}}>
      <div className="container" style={{textAlign: 'center'}}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '20px', color: '#0a1f3d'}}>Your Journey to the <span style={{color: '#d4af37'}}>Holy Land</span> Begins Here.</h1>
        <p style={{fontSize: '1.2rem', color: '#666', marginBottom: '50px', maxWidth: '750px', margin: '0 auto 50px auto'}}>Providing premium Hajj, Umrah, and Global travel solutions with over 15 years of excellence.</p>
        
        <form onSubmit={handleSearch} style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto'}}>
          <select 
            style={{padding: '12px 20px', borderRadius: '12px', border: '1px solid #ddd', flex: 1, minWidth: '250px'}}
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Where are you going?</option>
            <option value="mecca">Mecca (Hajj/Umrah)</option>
            <option value="medina">Medina</option>
            <option value="dubai">Dubai</option>
          </select>
          <button type="submit" className="btn btn-navy" style={{padding: '12px 40px', borderRadius: '12px'}}>Search Packages</button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
