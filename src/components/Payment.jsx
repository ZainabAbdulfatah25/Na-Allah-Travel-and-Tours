import React, { useState, useEffect } from 'react';

function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    packageDetails: 'Standard Ramadan Package (Full)'
  });

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/\?pkg=(.*)/);
    if (match) {
      setFormData(prev => ({...prev, packageDetails: decodeURIComponent(match[1])}));
    }
  }, []);

  const handleWhatsAppConfirm = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter your name first!");
      return;
    }
    const message = `Hello Na-Allah Travels! My name is ${formData.name}. I have just made a deposit for the ${formData.packageDetails} and would like to confirm my booking. Please find my receipt attached.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348034747257?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <button onClick={() => window.location.hash = ''} style={styles.backButton}>
          Back to Home
        </button>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2>Complete Your Booking</h2>
            <p>You have selected a comprehensive Umrah/Ramadan package.</p>
          </div>
          
          <div style={styles.paymentBox}>
            <h3 style={styles.bankTitle}>Payment Details</h3>
            <div style={styles.bankWrapper}>
              <p style={{opacity: 0.8, marginBottom: '5px'}}>Bank Name</p>
              <h4 style={{fontSize: '1.4rem'}}>Access Bank</h4>
              
              <p style={{opacity: 0.8, marginTop: '20px', marginBottom: '5px'}}>Account Number</p>
              <h2 style={{color: 'var(--primary-gold)', fontSize: '2.5rem', letterSpacing: '2px', wordBreak: 'break-all'}}>1764915629</h2>
              
              <p style={{opacity: 0.8, marginTop: '20px', marginBottom: '5px'}}>Account Name</p>
              <h4 style={{fontSize: '1.2rem', color: 'var(--primary-navy)'}}>Na-Allah Travels and Tours Ltd</h4>
            </div>
            
            <p style={styles.note}>
              Please ensure you make a deposit to secure your seat successfully. Keep your payment receipt.
            </p>
          </div>
          
          <div style={styles.actionContainer}>
            <h4 style={{marginBottom: '15px', color: 'var(--primary-navy)'}}>Payment Confirmation</h4>
            <form onSubmit={handleWhatsAppConfirm} style={styles.form}>
              <div style={{marginBottom: '15px', textAlign: 'left'}}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your full name" 
                  style={styles.input} 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div style={{marginBottom: '20px', textAlign: 'left'}}>
                <label style={styles.label}>Which Package?</label>
                <select 
                  style={styles.input}
                  value={formData.packageDetails}
                  onChange={e => setFormData({...formData, packageDetails: e.target.value})}
                >
                  <option value="Standard Ramadan Package (Full)">Standard Ramadan (Full - 4M)</option>
                  <option value="Premium Ramadan Package (Full)">Premium Ramadan (Full - 4.5M)</option>
                  <option value="VIP Ramadan Package (Full)">VIP Ramadan (Full - 5M)</option>
                  <option value="Standard Ramadan (Half)">Standard Ramadan (Half - 2M)</option>
                  <option value="Premium Ramadan (Half)">Premium Ramadan (Half - 2.4M)</option>
                  <option value="VIP Ramadan (Half)">VIP Ramadan (Half - 2.7M)</option>
                  <option value="Visa Only">Visa Only (1.2M)</option>
                  <option value="Custom Tour / Flight">Custom Tour / Flight Booking</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '15px', fontSize: '1.1rem'}}>
                Confirm Payment on WhatsApp
              </button>
            </form>

            <button onClick={() => window.location.hash = ''} className="btn" style={{marginTop: '15px', width: '100%', color: 'var(--text-muted)'}}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--off-white)',
    padding: '40px 0'
  },
  container: {
    maxWidth: '600px',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  },
  header: {
    backgroundColor: 'var(--primary-navy)',
    color: 'white',
    padding: '30px',
    textAlign: 'center',
    borderBottom: '4px solid var(--primary-gold)'
  },
  paymentBox: {
    padding: '40px 30px',
    textAlign: 'center'
  },
  bankTitle: {
    color: 'var(--primary-navy)',
    fontSize: '1.5rem',
    marginBottom: '30px'
  },
  bankWrapper: {
    backgroundColor: '#f8fafc',
    padding: '30px',
    borderRadius: '12px',
    border: '1px dashed rgba(10, 31, 61, 0.2)'
  },
  note: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#fffbeb',
    color: '#b45309',
    borderRadius: '8px',
    fontSize: '0.9rem'
  },
  actionContainer: {
    padding: '0 30px 40px 30px',
    textAlign: 'center'
  },
  form: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'var(--primary-navy)'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontFamily: '"Outfit", sans-serif',
    fontSize: '1rem'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: 'var(--primary-navy)',
    fontSize: '1.05rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontFamily: '"Outfit", sans-serif',
    marginBottom: '20px',
    padding: '0'
  }
};

export default Payment;
