import React, { useState, useEffect } from 'react';

function Payment() {
  const [formData, setFormData] = useState({ name: '', email: '', packageDetails: 'Standard Ramadan Package (Full)' });
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/\?pkg=(.*)/);
    if (match) setFormData(prev => ({...prev, packageDetails: decodeURIComponent(match[1])}));
  }, []);

  const saveToAdmin = (type, message) => {
    const currentBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const newEntry = {
      id: Date.now(),
      ...formData,
      package: formData.packageDetails,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      phone: 'Web User',
      message: type === 'booking' ? `OFFICIAL BOOKING: ${formData.packageDetails}` : `INQUIRY: ${message}`
    };
    localStorage.setItem('na_allah_bookings', JSON.stringify([newEntry, ...currentBookings]));
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Please fill name and email!");
    saveToAdmin('booking');
    setCompleted(true);
    window.scrollTo(0, 0);
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!formData.name || !inquiryMsg) return alert("Please provide your name and message!");
    saveToAdmin('inquiry', inquiryMsg);
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setShowInquiryForm(false);
      setInquiryMsg('');
    }, 4000);
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hi Na-Allah Travels! I'm ${formData.name}. Interest: ${formData.packageDetails}. ${inquiryMsg}`;
    window.open(`https://wa.me/2348034747257?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (completed) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎊</div>
          <h2 style={{color: 'var(--primary-navy)'}}>Booking Received!</h2>
          <p style={{color: '#64748b', fontSize: '1.2rem', marginBottom: '30px', padding: '0 20px'}}>
            Assalamu Alaikum <strong>{formData.name}</strong>, your request for <strong>{formData.packageDetails}</strong> is now in our system. We will contact you at <strong>{formData.email}</strong> shortly.
          </p>
          <button onClick={() => window.location.hash = ''} className="btn btn-navy" style={{padding: '15px 40px'}}>Return to Website</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
           <button onClick={() => window.location.hash = ''} style={styles.backButtonTop}>← Home</button>
           <h3 style={{color: 'var(--primary-navy)', margin: 0, fontWeight: '800'}}>Booking & Inquiries</h3>
        </div>
        
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={{color: 'white', marginBottom: '10px'}}>Complete Your Trip</h2>
            <p style={{opacity: 0.9, fontSize: '0.9rem'}}>Official reservation form for Hajj & Umrah 2026.</p>
          </div>
          
          <div style={styles.paymentBox}>
            <h3 style={styles.bankTitle}>Deposit Bank Details</h3>
            <div style={styles.bankWrapper}>
              <p style={styles.bankLabel}>Bank Name</p>
              <h4 style={styles.bankName}>Access Bank</h4>
              <p style={styles.bankLabel}>Account Number</p>
              <h2 style={styles.accNumber}>1764915629</h2>
              <p style={styles.bankLabel}>Account Name</p>
              <h4 style={styles.accName}>Na-Allah Travels and Tours Ltd</h4>
            </div>
          </div>
          
          <div style={styles.actionContainer}>
            <div style={styles.formOuter}>
              {/* PRIMARY CONTACT INFO */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input type="text" placeholder="e.g. Ibrahim Musa" style={styles.input} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input type="email" placeholder="mail@example.com" style={styles.input} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Package</label>
                <select style={styles.input} value={formData.packageDetails} onChange={e => setFormData({...formData, packageDetails: e.target.value})}>
                  <option value="RAMADAN STANDARD Package">Standard Ramadan (4M)</option>
                  <option value="RAMADAN PREMIUM Package">Premium Ramadan (4.5M)</option>
                  <option value="RAMADAN VIP Package">VIP Ramadan (5M)</option>
                  <option value="HAJJ STANDARD Package">Hajj Standard (6.5M)</option>
                  <option value="HAJJ PREMIUM Package">Hajj Premium (8.5M)</option>
                  <option value="HAJJ ROYAL Package">Hajj Royal (12M)</option>
                </select>
              </div>

              {/* TOGGLABLE INQUIRY FORM */}
              {showInquiryForm ? (
                <div style={styles.inquirySection} className="animate-fade-in">
                  <label style={styles.label}>Ask Your Question</label>
                  <textarea placeholder="Tell us what you need to know..." style={styles.textarea} value={inquiryMsg} onChange={e => setInquiryMsg(e.target.value)} />
                  {inquirySent && <p style={styles.successMsg}>✓ Inquiry sent to Admin! We will email you.</p>}
                  <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <button onClick={handleSubmitInquiry} className="btn btn-navy" style={{flex: 1, padding: '15px'}}>Submit Question</button>
                    <button onClick={handleWhatsAppInquiry} style={styles.waBtnSimple}>WhatsApp Chat</button>
                  </div>
                  <button onClick={() => setShowInquiryForm(false)} style={styles.cancelLink}>← Back to Booking</button>
                </div>
              ) : (
                <div style={styles.buttonStack}>
                  <button onClick={handleConfirmBooking} className="btn btn-navy" style={{flex: 2, padding: '20px', borderRadius: '15px', fontWeight: 'bold'}}>
                    Confirm My Booking
                  </button>
                  <button onClick={() => setShowInquiryForm(true)} style={styles.inquireBtn}>
                    <span style={{fontSize: '1.4rem'}}>❓</span> Inquiry / Help
                  </button>
                </div>
              )}
            </div>
            
            <button onClick={() => window.location.hash = ''} className="btn" style={{marginTop: '30px', color: '#94a3b8'}}>Return Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f7fa', padding: '60px 0' },
  container: { maxWidth: '700px', width: '90%' },
  backButtonTop: { background: '#fff', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  card: { backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' },
  successCard: { backgroundColor: 'white', borderRadius: '32px', padding: '60px 40px', textAlign: 'center', width: '90%', maxWidth: '600px' },
  successIcon: { fontSize: '4rem', marginBottom: '20px' },
  header: { backgroundColor: 'var(--primary-navy)', color: 'white', padding: '40px', textAlign: 'center', borderBottom: '6px solid var(--primary-gold)' },
  paymentBox: { padding: '50px 40px 10px 40px', textAlign: 'center' },
  bankTitle: { color: 'var(--primary-navy)', fontSize: '1.5rem', marginBottom: '30px', fontWeight: '800' },
  bankWrapper: { backgroundColor: '#f8fafc', padding: '35px', borderRadius: '24px', border: '2px dashed #cbd5e1' },
  bankLabel: { fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px', textTransform: 'uppercase', fontWeight: 'bold' },
  bankName: { fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-navy)', marginBottom: '20px' },
  accNumber: { color: 'var(--primary-gold)', fontSize: '2.8rem', letterSpacing: '4px', fontWeight: 'bold' },
  accName: { fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-navy)', marginTop: '20px' },
  actionContainer: { padding: '0 40px 50px 40px', textAlign: 'center' },
  formOuter: { backgroundColor: '#f8fafc', padding: '35px', borderRadius: '28px', border: '1px solid #e2e8f0' },
  inputGroup: { marginBottom: '20px', textAlign: 'left' },
  label: { display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-navy)' },
  input: { width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '16px', minHeight: '120px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' },
  inquirySection: { marginTop: '20px', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '20px' },
  buttonStack: { display: 'flex', gap: '15px', marginTop: '30px' },
  inquireBtn: { flex: 1, backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', color: 'var(--primary-navy)' },
  waBtnSimple: { flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  cancelLink: { border: 'none', background: 'none', marginTop: '15px', cursor: 'pointer', fontSize: '0.9rem', color: '#64748b' },
  successMsg: { color: '#059669', padding: '10px 0', fontWeight: 'bold', fontSize: '0.9rem' }
};

export default Payment;
