import React from 'react';

function Services() {
  const services = [
    { title: "Flight Bookings", icon: "✈️", desc: "Global flight reservations with all major airlines like Saudia." },
    { title: "Professional Tours", icon: "🕌", desc: "Expertly guided Umrah and Hajj religious tours for spiritual peace." },
    { title: "Customized Tours", icon: "🗺️", desc: "Tailor-made travel itineraries to suit your family's specific needs." },
    { title: "24/7 Customer Point", icon: "📞", desc: "Around the clock assistance before and during your sacred trip." }
  ];

  return (
    <section id="services" className="section-padding" style={{backgroundColor: 'var(--clear-white)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h2 style={{color: 'var(--primary-navy)'}}>Our Services</h2>
          <div style={{width: '60px', height: '4px', backgroundColor: 'var(--primary-gold)', margin: '0 auto'}}></div>
        </div>
        
        <div style={styles.grid}>
          {services.map((srv, idx) => (
             <div 
               key={idx} 
               style={{...styles.card, transitionDelay: `${idx * 0.1}s`}} 
               className={`animate-fade-in-up delay-${idx + 1} hover-lift`}
             >
               <div style={styles.iconBox}>{srv.icon}</div>
               <h3 style={styles.title}>{srv.title}</h3>
               <p style={{color: 'var(--text-muted)'}}>{srv.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  card: {
    padding: '40px 30px',
    backgroundColor: 'var(--off-white)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
    transition: 'all var(--transition-smooth)',
    border: '1px solid transparent'
  },
  iconBox: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: 'var(--primary-gold)'
  },
  title: {
    color: 'var(--primary-navy)',
    marginBottom: '15px'
  }
};

export default Services;
