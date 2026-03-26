import React, { useState } from 'react';

function Hero() {
  const [destination, setDestination] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.hash = destination ? `#all-packages?dest=${encodeURIComponent(destination.toLowerCase())}` : '#all-packages';
  };

  return (
    <section className="section-padding" style={{backgroundColor: '#fff'}}>
      <div className="container" style={{textAlign: 'center'}}>
        {/* LOGO ADDED HERE ONLY */}
        <div style={{marginBottom: '30px'}}>
           <img src="/logo.png" alt="Logo" style={{width: '90px', height: 'auto'}} />
        </div>

        <h1>Your Journey to the <span style={{color: 'var(--primary-gold)'}}>Holy Land</span> Begins Here.</h1>
        <p style={{marginTop: '20px', fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '20px auto 40px auto'}}>Premium Hajj, Umrah, and Global travel solutions with over 15 years of excellence.</p>
        
        <form onSubmit={handleSearch} style={{display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <select 
            style={{padding: '12px 20px', borderRadius: '10px', border: '1px solid #ccc', minWidth: '250px'}}
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Where are you going?</option>
            <option value="mecca">Mecca</option>
            <option value="medina">Medina</option>
          </select>
          <button type="submit" className="btn btn-navy">Search Packages</button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
