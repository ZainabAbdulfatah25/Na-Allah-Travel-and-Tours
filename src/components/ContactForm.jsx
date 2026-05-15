import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', package: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [info, setInfo] = useState({ address: 'No 12, Babangwari, Kano.', phone: '0803 474 7257', whatsapp: '2348034747257' });
  const [dynamicInterests, setDynamicInterests] = useState([]);

  const loadSettings = async () => {
    const saved = JSON.parse(localStorage.getItem('na_allah_settings'));
    if (saved) setInfo(saved);

    const savedInt = JSON.parse(localStorage.getItem('na_allah_interests'));
    if (savedInt) setDynamicInterests(savedInt);

    try {
      const { data, error } = await supabase.from('na_allah_interests').select('*').order('id', { ascending: true });
      if (data && !error && data.length > 0) {
        setDynamicInterests(data);
        localStorage.setItem('na_allah_interests', JSON.stringify(data));
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadSettings();
    const handleSync = (e) => { if (e.key === 'na_allah_settings') loadSettings(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInquiry = { id: Date.now(), ...formData, status: 'Pending', date: new Date().toISOString().split('T')[0] };
    
    // Local fallback
    const currentBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    localStorage.setItem('na_allah_bookings', JSON.stringify([newInquiry, ...currentBookings]));
    
    // Cloud sync
    try {
      const { error } = await supabase
        .from('na_allah_bookings')
        .insert([{ 
           id: newInquiry.id,
           name: formData.name, 
           phone: formData.phone, 
           email: formData.email, 
           package: formData.package, 
           message: formData.message,
           status: 'Pending',
           date: new Date().toISOString().split('T')[0]
        }]);
      if (error) console.error("Error saving to Supabase:", error);
    } catch (err) {
      console.error("Supabase connection error:", err);
    }

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', package: 'General Inquiry', message: '' });
  };

  return (
    <section id="contact-form" style={{...styles.section, position: 'relative', overflow: 'hidden'}}>
      {/* 3D background elements */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '20%', right: '-10%', background: 'rgba(212, 175, 55, 0.15)'}}></div>
        <div style={{...styles.blurBlob, bottom: '-10%', left: '-10%', background: 'rgba(5, 16, 36, 0.08)', animationDelay: '-3s'}}></div>
      </div>

      <div className="container" style={{...styles.container, position: 'relative', zIndex: 1}}>
        <div style={styles.contentGrid}>
          <div style={styles.infoSide} className="animate-fade-in-up">
            <h2 style={styles.heading}>Inquire <span style={{color: 'var(--primary-gold)'}}>Now</span></h2>
            <p style={styles.description}>Our travel consultants are ready to assist you. Send us a message and we'll get back to you within 24 hours.</p>
            <div style={styles.contactDetails}>
              <div style={styles.detailItem} className="animate-fade-in-up delay-1 glass-panel"><strong>🏢 HQ Office:</strong> {info.address}</div>
              <div style={styles.detailItem} className="animate-fade-in-up delay-2 glass-panel"><strong>📞 Direct:</strong> {info.phone}</div>
            </div>
          </div>
          <div style={styles.formSide} className="animate-fade-in-up delay-3 glass-panel">
            <form onSubmit={handleSubmit} style={styles.form}>
              <h3 style={{marginBottom: '25px', color: 'var(--primary-navy)'}}>Contact Desk</h3>
              <div style={styles.inputGroup}><label style={styles.label}>Full Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} placeholder="Your name" /></div>
              <div style={styles.row}>
                <div style={styles.inputGroup}><label style={styles.label}>Phone Number</label><input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={styles.input} placeholder="+234..." /></div>
                <div style={styles.inputGroup}><label style={styles.label}>Interest</label>
                  <select value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} style={styles.input}>
                    {dynamicInterests.length > 0 ? dynamicInterests.map(i => (
                      <option key={i.id} value={i.name}>{i.name}</option>
                    )) : (
                      <>
                        <option value="General">General Inquiry</option>
                        <option value="Ramadan">Ramadan 2026</option>
                        <option value="Hajj">Hajj 2026</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div style={styles.inputGroup}><label style={styles.label}>Inquiry Details</label><textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{...styles.input, minHeight: '100px'}} placeholder="How can we help?"></textarea></div>
              <button type="submit" className="btn btn-navy hover-lift" style={{width: '100%', padding: '15px'}}>Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL POPUP */}
      {submitted && (
        <div style={styles.overlay} onClick={() => setSubmitted(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()} className="animate-fade-in-up">
            <div style={styles.modalIcon}>✅</div>
            <h3 style={{color: 'var(--primary-navy)', marginBottom: '10px'}}>Inquiry Received!</h3>
            <p style={{color: '#64748b', marginBottom: '25px', lineHeight: '1.5', fontSize: '0.95rem'}}>
              Thank you for choosing Na-Allah Travels & Tours. Our team has received your message and will reach out to you shortly.
            </p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <button 
                onClick={() => {
                  window.open(`https://wa.me/${info.whatsapp}?text=Hi%20Na-Allah%20travels!%20I%20just%20submitted%20an%20inquiry%20on%20your%20website.`, '_blank');
                  setSubmitted(false);
                }} 
                className="btn btn-primary hover-lift" 
                style={{width: '100%', padding: '14px', borderRadius: '15px', background: '#25D366', color: 'white', border: 'none', boxShadow: '0 10px 20px -5px rgba(37, 211, 102, 0.4)'}}
              >
                💬 Chat on WhatsApp
              </button>
              <button onClick={() => setSubmitted(false)} className="btn btn-outline hover-lift" style={{width: '100%', padding: '14px', borderRadius: '15px'}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: { backgroundColor: '#f8fafc', padding: '100px 0' },
  container: { maxWidth: '1100px' },
  contentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' },
  infoSide: { textAlign: 'left' },
  heading: { fontSize: '3.5rem', color: 'var(--primary-navy)', marginBottom: '25px', lineHeight: '1.2', fontWeight: '900' },
  description: { fontSize: '1.2rem', color: '#64748b', marginBottom: '40px' },
  formSide: { backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', padding: '45px', borderRadius: '40px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.4)' },
  inputGroup: { marginBottom: '20px', flex: 1 },
  label: { display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-navy)', textTransform: 'uppercase', letterSpacing: '1px' },
  input: { width: '100%', padding: '18px', borderRadius: '15px', border: '1px solid #e1e1e1', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  contactDetails: { marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' },
  detailItem: { padding: '20px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)', borderRadius: '20px', color: 'var(--primary-navy)', fontSize: '0.95rem', boxShadow: '0 5px 15px rgba(0,0,0,0.02)', border: '1px solid rgba(255,255,255,0.4)' },
  blurBlob: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(90px)', animation: 'floatElement 25s ease-in-out infinite' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 16, 36, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', width: '90%', maxWidth: '420px', borderRadius: '30px', padding: '40px', textAlign: 'center', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.8)' },
  modalIcon: { fontSize: '4rem', marginBottom: '20px', animation: 'floatElement 3s ease-in-out infinite' }
};

export default ContactForm;
