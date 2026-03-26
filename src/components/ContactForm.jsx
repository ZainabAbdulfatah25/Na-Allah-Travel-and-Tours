import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    package: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Save to Admin Local Storage so it appears in the Dashboard
    const currentBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const newInquiry = {
      id: Date.now(),
      ...formData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('na_allah_bookings', JSON.stringify([newInquiry, ...currentBookings]));

    // 2. Trigger WhatsApp
    const whatsappMsg = `Hi Na-Allah Travels! My name is ${formData.name}. I'm interested in the ${formData.package}.
    Message: ${formData.message}
    Phone: ${formData.phone}`;
    window.open(`https://wa.me/2348034747257?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', phone: '', email: '', package: 'General Inquiry', message: '' });
  };

  return (
    <section id="contact-form" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.contentGrid}>
          {/* Info Side */}
          <div style={styles.infoSide}>
            <h2 style={styles.heading}>Have Questions? <span style={{color: 'var(--primary-gold)'}}>Inquire Now</span></h2>
            <p style={styles.description}>Our travel consultants are ready to assist you with visa processing, flight bookings, and customized tour packages. Send us a message and we'll get back to you within 24 hours.</p>
            
            <div style={styles.contactDetails}>
              <div style={styles.detailItem}><strong>🏢 Office:</strong> No 1 Ahead Plaza, Babangwari, Kano.</div>
              <div style={styles.detailItem}><strong>📞 Direct:</strong> 0803 474 7257</div>
              <div style={styles.detailItem}><strong>📧 Email:</strong> naallahtravels@gmail.com</div>
            </div>
          </div>

          {/* Form Side */}
          <div style={styles.formSide}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <h3 style={{marginBottom: '25px', color: 'var(--primary-navy)'}}>Inquiry Form</h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} placeholder="Enter your name" />
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={styles.input} placeholder="Phone" />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Interest</label>
                  <select value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} style={styles.input}>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Ramadan 2026">Ramadan 2026</option>
                    <option value="Hajj 2026">Hajj 2026</option>
                    <option value="Visa Processing">Visa Only</option>
                  </option>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>How can we help you?</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{...styles.input, minHeight: '120px'}} placeholder="Your message..."></textarea>
              </div>

              {submitted && <p style={styles.success}>✓ Inquiry submitted successfully to our Admin!</p>}
              
              <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '18px', fontSize: '1.1rem'}}>Send Inquiry via WhatsApp</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#f1f5f9', padding: '100px 0' },
  container: { maxWidth: '1100px' },
  contentGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' },
  infoSide: { textAlign: 'left' },
  heading: { fontSize: '3rem', color: 'var(--primary-navy)', marginBottom: '25px', lineHeight: '1.2' },
  description: { fontSize: '1.2rem', color: '#64748b', marginBottom: '40px', lineHeight: '1.8' },
  formSide: { backgroundColor: 'white', padding: '50px', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '20px', flex: 1 },
  label: { display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary-navy)', textTransform: 'uppercase' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  success: { padding: '15px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 'bold' },
  contactDetails: { marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' },
  detailItem: { padding: '15px 25px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.03)', color: 'var(--primary-navy)' }
};

export default ContactForm;
