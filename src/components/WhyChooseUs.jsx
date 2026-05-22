import React from 'react';

function WhyChooseUs() {
  const reasons = [
    {
      icon: "🤝",
      title: "Trusted Travel Experts",
      desc: "Our seasoned travel architects handle all complex logistics so you can focus purely on your spiritual or global journey."
    },
    {
      icon: "💰",
      title: "Affordable Packages",
      desc: "Enjoy high-end, premium accommodation and flights tailored perfectly to match your specific schedule and budget."
    },
    {
      icon: "⚡",
      title: "Fast Visa Support",
      desc: "We expedite complex international documentation using direct channels and professional visa coordinators."
    },
    {
      icon: "🌟",
      title: "Excellent Customer Service",
      desc: "Access a dedicated 24/7 travel concierge and guides committed to providing world-class assistance at every milestone."
    },
    {
      icon: "🔒",
      title: "Secure Booking Process",
      desc: "Your data and financial deposits are safeguarded with bank-grade security protocols and secure transaction methods."
    },
    {
      icon: "🗺️",
      title: "Worldwide Travel Solutions",
      desc: "From holy sites in Mecca & Medina to global tourist and corporate destinations, we open doors to the entire world."
    }
  ];

  return (
    <section id="why-choose-us" className="section-padding" style={styles.section}>
      {/* Visual background dynamics */}
      <div style={{position: 'absolute', top: '15%', left: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04), transparent 70%)', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', bottom: '15%', right: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 162, 232, 0.04), transparent 70%)', pointerEvents: 'none'}} />

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 70px)'}} className="animate-fade-in-up">
          <span style={styles.badge}>Our Core Values</span>
          <h2 style={styles.heading}>Why Choose Na-Allah Travels and Tours Ltd?</h2>
          <p style={styles.subtitle}>
            We combine years of industry expertise with personal dedication to deliver seamless, worry-free journeys filled with absolute comfort and integrity.
          </p>
          <div style={styles.divider}></div>
        </div>

        <div style={styles.grid}>
          {reasons.map((item, idx) => (
            <div 
              key={idx} 
              style={{...styles.card, animationDelay: `${idx * 0.1}s`}} 
              className="glass-panel animate-fade-in-up hover-lift"
            >
              {/* Gold Ring Icon container */}
              <div style={styles.iconContainer}>
                <span style={{fontSize: '1.8rem'}}>{item.icon}</span>
              </div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '100px 0',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    borderTop: '1px solid rgba(226, 232, 240, 0.8)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    borderRadius: '30px',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    color: 'var(--primary-gold)',
    fontSize: '0.8rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '15px'
  },
  heading: {
    fontSize: 'clamp(2.2rem, 5vw, 3rem)',
    color: 'var(--primary-navy)',
    fontWeight: '900',
    lineHeight: '1.15',
    margin: '0 0 20px 0',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    color: 'var(--text-muted)',
    maxWidth: '750px',
    margin: '0 auto 30px auto',
    fontSize: '1.15rem',
    lineHeight: '1.6'
  },
  divider: {
    width: '85px',
    height: '4px',
    backgroundColor: 'var(--primary-gold)',
    margin: '0 auto',
    borderRadius: '2px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginTop: '30px'
  },
  card: {
    padding: '40px 30px',
    backgroundColor: '#ffffff',
    borderRadius: '28px',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    boxShadow: '0 10px 30px rgba(5, 16, 36, 0.02)',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  },
  iconContainer: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    border: '2px solid rgba(212, 175, 55, 0.15)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px'
  },
  cardTitle: {
    fontSize: '1.3rem',
    color: 'var(--primary-navy)',
    fontWeight: '800',
    marginBottom: '12px'
  },
  cardDesc: {
    color: 'var(--text-muted)',
    fontSize: '0.98rem',
    lineHeight: '1.65',
    margin: 0
  }
};

export default WhyChooseUs;
