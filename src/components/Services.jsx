import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Services({ onSelectService }) {
  const [services, setServices] = useState([
    { id: 1, title: "Flight Bookings", icon: "✈️", desc: "Global flight reservations with all major airlines like Saudia." },
    { id: 2, title: "Professional Tours", icon: "🕌", desc: "Expertly guided Umrah and Hajj religious tours for spiritual peace." },
    { id: 3, title: "Customized Tours", icon: "🗺️", desc: "Tailor-made travel itineraries to suit your family's specific needs." }
  ]);

  const loadServices = async () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_services'));
    if (saved) setServices(saved);
    
    try {
      const { data, error } = await supabase.from('na_allah_services').select('*').order('id', { ascending: true });
      if (data && !error && data.length > 0) {
         setServices(data);
         localStorage.setItem('na_allah_services', JSON.stringify(data));
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadServices();
    const handleSync = (e) => { if (e.key === 'na_allah_services') loadServices(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const renderIcon = (iconStr) => {
    if (iconStr === '✈️') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6l-1 2.2c-.1.3.1.7.4.8l6.1 2.3L6.5 15l-3.2-.8c-.4-.1-.8.1-1 .4l-1 2.2c-.1.3.1.7.4.8l4.4 1.2 1.2 4.4c.1.3.5.5.8.4l2.2-1.c.3-.2.5-.6.4-1l-.8-3.2 2.9-2.7 2.3 6.1c.1.3.5.5.8.4l2.2-1c.4-.2.7-.6.6-1.1z"/></svg>;
    if (iconStr === '🕌') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 8 8 8 8v12h8V8s0-6-4-6z"/><path d="M2 14v6h4v-6H2z"/><path d="M18 14v6h4v-6h-4z"/><path d="M4 14l-2-2"/><path d="M20 14l2-2"/><path d="M12 22v-4"/></svg>;
    if (iconStr === '🗺️') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>;
    if (iconStr === '🏨' || iconStr === '🛏️') return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>;
    return <span style={{fontSize: '2.5rem'}}>{iconStr}</span>;
  };

  return (
    <section id="services" className="section-padding" style={{backgroundColor: 'var(--off-white)', position: 'relative', overflow: 'hidden'}}>
      {/* Decorative background elements */}
      <div style={{position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 162, 232, 0.05), transparent 70%)', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46, 49, 146, 0.05), transparent 70%)', pointerEvents: 'none'}} />

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)'}} className="animate-fade-in-up">
          <h2 style={{color: 'var(--primary-navy)', fontSize: 'clamp(2rem, 6vw, 3rem)'}}>Our Premium Services</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '650px', margin: '15px auto 30px auto', fontSize: '1.1rem'}}>We provide comprehensive religious and global travel solutions with unshakeable integrity and world-class comfort.</p>
          <div style={{width: '80px', height: '4px', backgroundColor: 'var(--primary-accent)', margin: '0 auto', borderRadius: '2px'}}></div>
        </div>
        
        <div style={styles.grid}>
          {services.map((srv, idx) => (
             <div 
               key={srv.id} 
               style={{...styles.card, cursor: 'pointer', animationDelay: `${idx * 0.15}s`}} 
               className="animate-fade-in-up hover-lift"
               onClick={() => onSelectService && onSelectService(srv.title)}
             >
               <div style={styles.iconBox}>{renderIcon(srv.icon)}</div>
               <h3 style={styles.title}>{srv.title}</h3>
               <p style={{color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px'}}>{srv.desc}</p>
               <div style={{
                 color: 'var(--primary-accent)', 
                 fontWeight: '800', 
                 fontSize: '0.9rem', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 gap: '5px',
                 marginTop: 'auto',
                 textTransform: 'uppercase',
                 letterSpacing: '0.5px'
               }}>
                 Inquire Now <span style={{ transition: 'transform 0.2s' }} className="arrow">→</span>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' },
  card: { padding: 'clamp(30px, 6vw, 50px) clamp(20px, 5vw, 40px)', backgroundColor: 'var(--clear-white)', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-dark)', position: 'relative', overflow: 'hidden' },
  iconBox: { color: 'var(--primary-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(0, 162, 232, 0.08)', borderRadius: '50%', marginBottom: '25px', width: '90px', height: '90px' },
  title: { color: 'var(--primary-navy)', marginBottom: '15px', fontWeight: '800', fontSize: '1.4rem' }
};

export default Services;
