import React from 'react';

function AboutUs() {
  const coreValues = [
    {
      title: "Spiritual Integrity",
      desc: "We ensure every Hajj and Umrah ritual is conducted strictly in accordance with authentic teachings, guided by knowledgeable scholars.",
      icon: "🕋"
    },
    {
      title: "Premium Service",
      desc: "From 5-star hotel bookings near the Haram to VIP transportation, we provide unmatched comfort and logistical excellence.",
      icon: "⭐"
    },
    {
      title: "Global Reliability",
      desc: "Licensed by IATA and NAHCON, our ticketing, visa support, and global tour operations are trusted by thousands of travelers annually.",
      icon: "✈️"
    },
    {
      title: "Dedicated Concierge",
      desc: "Our responsive support staff and on-ground guides are available 24/7 to handle your inquiries and assist at every step.",
      icon: "📞"
    }
  ];

  const leaders = [
    {
      name: "Alhaji Muhammad Na-Allah",
      role: "Founder & Managing Director",
      bio: "Over 15 years of expert experience in global travel management, specialized Hajj operations, and international logistics.",
      avatar: "👤"
    },
    {
      name: "Hajiya Zainab Abdulfatah",
      role: "Executive Director of Operations",
      bio: "Committed to delivering seamless spiritual journeys and high-quality customer care with an eye for operational excellence.",
      avatar: "👩‍💼"
    }
  ];

  return (
    <div style={styles.pageContainer} className="animate-fade-in-up">
      {/* 1. Header Banner */}
      <section style={styles.headerSection}>
        <div style={styles.headerOverlay}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={styles.badge}>Who We Are</span>
          <h1 style={styles.title}>About Na-Allah Travels & Tours</h1>
          <p style={styles.subtitle}>
            A leading, licensed Hajj & Umrah operator and premium global travel agency committed to absolute integrity and premium service.
          </p>
          <div style={styles.divider}></div>
        </div>
      </section>

      {/* 2. Brand Story / Legacy */}
      <section style={styles.storySection} className="section-padding">
        <div className="container" style={styles.storyGrid}>
          <div style={styles.storyTextCol}>
            <span style={styles.subBadge}>Our Legacy</span>
            <h2 style={styles.sectionHeading}>Crafting Spiritual & Global Travel Masterpieces</h2>
            <p style={styles.paragraph}>
              Founded with the vision to elevate travel experiences, <strong>Na-Allah Travels and Tours Ltd.</strong> has established itself as an industry benchmark in Nigeria. We bridge the gap between complex travel logistics and a worry-free, spiritually fulfilling journey.
            </p>
            <p style={styles.paragraph}>
              Whether assisting pilgrims on their life-changing Hajj and Umrah journeys, arranging bespoke corporate tours, or expediting international visa approvals, we deliver our services with absolute reliability, transparent pricing, and professional care.
            </p>
            
            <div style={styles.statsContainer}>
              <div style={styles.statBox}>
                <span style={styles.statNum}>10+</span>
                <span style={styles.statLabel}>Years Experience</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statNum}>5,000+</span>
                <span style={styles.statLabel}>Happy Pilgrims</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statNum}>100%</span>
                <span style={styles.statLabel}>Licensed Operator</span>
              </div>
            </div>
          </div>

          <div style={styles.storyVisualCol}>
            <div className="glass-panel" style={styles.visualCard}>
              <div style={styles.emblemContainer}>
                <span style={{ fontSize: '3.5rem' }}>🏅</span>
              </div>
              <h3 style={styles.emblemTitle}>NAHCON & IATA</h3>
              <p style={styles.emblemText}>
                Officially accredited by the National Hajj Commission of Nigeria and the International Air Transport Association.
              </p>
              <div style={styles.stamp}>VERIFIED AUTHORITY</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section style={styles.valuesSection} className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={styles.subBadge}>Our Foundations</span>
            <h2 style={{ ...styles.sectionHeading, color: 'var(--primary-navy)' }}>Pillars of Our Service</h2>
            <div style={{ ...styles.divider, margin: '20px auto' }}></div>
          </div>

          <div style={styles.valuesGrid}>
            {coreValues.map((val, idx) => (
              <div key={idx} className="glass-panel hover-lift" style={styles.valueCard}>
                <div style={styles.valueIcon}>{val.icon}</div>
                <h3 style={styles.valueTitle}>{val.title}</h3>
                <p style={styles.valueDesc}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Team */}
      <section style={styles.teamSection} className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={styles.subBadge}>Leadership</span>
            <h2 style={styles.sectionHeading}>Dedicated Visionaries</h2>
            <div style={{ ...styles.divider, margin: '20px auto' }}></div>
            <p style={{ ...styles.subtitle, color: 'rgba(255,255,255,0.7)', maxWidth: '650px', margin: '0 auto' }}>
              Meet the executive team driving our standard of high-fidelity travel services and commitment to pilgrim support.
            </p>
          </div>

          <div style={styles.teamGrid}>
            {leaders.map((leader, idx) => (
              <div key={idx} className="glass-panel hover-lift" style={styles.teamCard}>
                <div style={styles.teamAvatarContainer}>
                  <span style={{ fontSize: '3rem' }}>{leader.avatar}</span>
                </div>
                <h3 style={styles.teamName}>{leader.name}</h3>
                <div style={styles.teamRole}>{leader.role}</div>
                <p style={styles.teamBio}>{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  headerSection: {
    position: 'relative',
    padding: 'clamp(110px, 14vw, 160px) 0 80px 0',
    backgroundColor: 'var(--primary-navy)',
    color: '#ffffff',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #051024 0%, #0c234a 100%)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.1), transparent 50%)',
    pointerEvents: 'none'
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    borderRadius: '30px',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    color: 'var(--primary-gold)',
    fontSize: '0.8rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '20px'
  },
  title: {
    fontSize: 'clamp(2.1rem, 6vw, 3.8rem)',
    fontWeight: '900',
    letterSpacing: '-1px',
    lineHeight: '1.1',
    margin: '0 auto 20px auto',
    maxWidth: '900px'
  },
  subtitle: {
    fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
    color: 'rgba(255,255,255,0.8)',
    maxWidth: '750px',
    margin: '0 auto 30px auto',
    lineHeight: '1.6'
  },
  divider: {
    width: '80px',
    height: '4px',
    backgroundColor: 'var(--primary-gold)',
    margin: '0 auto',
    borderRadius: '2px'
  },
  storySection: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '40px',
    alignItems: 'center'
  },
  storyTextCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subBadge: {
    color: 'var(--primary-gold)',
    fontWeight: '800',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    marginBottom: '10px',
    display: 'block'
  },
  sectionHeading: {
    fontSize: 'clamp(2rem, 4vw, 2.6rem)',
    color: 'var(--primary-navy)',
    fontWeight: '900',
    lineHeight: '1.2',
    marginBottom: '25px'
  },
  paragraph: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.75',
    marginBottom: '20px'
  },
  statsContainer: {
    display: 'flex',
    gap: '30px',
    marginTop: '30px',
    flexWrap: 'wrap'
  },
  statBox: {
    flex: '1 1 120px'
  },
  statNum: {
    display: 'block',
    fontSize: '2.2rem',
    fontWeight: '900',
    color: 'var(--primary-navy)'
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  storyVisualCol: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  visualCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '28px',
    padding: '45px 35px',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(5, 16, 36, 0.05)',
    border: '1.5px solid rgba(212, 175, 55, 0.25)',
    position: 'relative',
    overflow: 'hidden'
  },
  emblemContainer: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    border: '2px solid rgba(212, 175, 55, 0.15)'
  },
  emblemTitle: {
    fontSize: '1.4rem',
    fontWeight: '900',
    color: 'var(--primary-navy)',
    marginBottom: '15px'
  },
  emblemText: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    margin: 0
  },
  stamp: {
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    fontSize: '0.6rem',
    color: 'rgba(212, 175, 55, 0.3)',
    fontWeight: '900',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    padding: '5px 15px',
    borderRadius: '10px',
    transform: 'rotate(-15deg)',
    letterSpacing: '1.5px'
  },
  valuesSection: {
    backgroundColor: '#ffffff'
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '30px'
  },
  valueCard: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    borderRadius: '24px',
    padding: '40px 30px',
    boxShadow: '0 10px 30px rgba(5, 16, 36, 0.01)'
  },
  valueIcon: {
    fontSize: '2.5rem',
    marginBottom: '20px'
  },
  valueTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--primary-navy)',
    marginBottom: '15px'
  },
  valueDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.65',
    margin: 0
  },
  teamSection: {
    backgroundColor: 'var(--primary-navy)',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #051024 0%, #0c234a 100%)',
    position: 'relative'
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '40px',
    justifyContent: 'center',
    maxWidth: '900px',
    margin: '0 auto'
  },
  teamCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '28px',
    padding: '45px 35px',
    textAlign: 'center'
  },
  teamAvatarContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '2px solid rgba(212, 175, 55, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  teamName: {
    fontSize: '1.3rem',
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: '5px'
  },
  teamRole: {
    fontSize: '0.85rem',
    color: 'var(--primary-gold)',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px'
  },
  teamBio: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.6',
    margin: 0
  }
};

export default AboutUs;
