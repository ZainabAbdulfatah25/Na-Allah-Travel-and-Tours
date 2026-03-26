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
    const currentBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const newInquiry = {
      id: Date.now(),
      ...formData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('na_allah_bookings', JSON.stringify([newInquiry, ...currentBookings]));
    const whatsappMsg = `Hi Na-Allah Travels! My name is ${formData.name}. I'm interested in ${formData.package}. Message: ${formData.message}`;
    window.open(`https://wa.me/2348034747257?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', phone: '', email: '', package: 'General Inquiry', message: '' });
  };

  return (
    <section id="contact-form" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.contentGrid}>
          <div style={styles.infoSide}>
            <h2 style={styles.heading}>Inquire <span style={{color: 'var(--primary-gold)'}}>Now</span></h2>
            <p style={styles.description}>Our travel consultants are ready to assist you. Send us a message and we'll get back to you within 24 hours.</p>
            <div style={styles.contactDetails}>
              <div style={styles.detailItem}><strong>🏢 Office:</strong> Ahead Plaza, Babangwari, Kano.</div>
              <div style={styles.detailItem}><strong>📞 Direct:</strong> 0803 474 7257</div>
            </div>
          </div>

          <div style={styles.formSide}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <h3 style={{marginBottom: '25px', color: 'var(--primary-navy)'}}>Send a Message</h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} placeholder="Your name" />
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
                    <option value="Visa Processing">Visa Processing</option>
                  </select>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Inquiry Details</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{...styles.input, minHeight: '100px'}} placeholder="How can we help?"></textarea>
              </div>
              {submitted && <p style={styles.success}>✓ Successfully sent to Admin!</p>}
              <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '15px'}}>Submit Inquiry</button>
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
  contentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' },
  infoSide: { textAlign: 'left' },
  heading: { fontSize: '3rem', color: 'var(--primary-navy)', marginBottom: '25px', lineHeight: '1.2' },
  description: { fontSize: '1.2rem', color: '#64748b', marginBottom: '40px' },
  formSide: { backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '20px', flex: 1 },
  label: { display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-navy)', textTransform: 'uppercase' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  success: { padding: '10px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '10px', marginBottom: '15px', fontWeight: 'bold', fontSize: '0.9rem' },
  contactDetails: { marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' },
  detailItem: { padding: '15px', backgroundColor: 'white', borderRadius: '12px', color: 'var(--primary-navy)', fontSize: '0.9rem' }
};

export default ContactForm;
