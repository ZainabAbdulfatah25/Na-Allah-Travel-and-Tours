import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewingBooking, setViewingBooking] = useState(null); // Modal state
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({
    ramadan: [
      { id: 1, title: "Standard", price: "4,000,000", status: 'Active' },
      { id: 2, title: "Premium", price: "4,500,000", status: 'Active' },
      { id: 3, title: "VIP", price: "5,000,000", status: 'Active' }
    ],
    hajj: [
      { id: 4, title: "Standard", price: "6,500,000", status: 'Active' },
      { id: 5, title: "Premium", price: "8,500,000", status: 'Active' },
      { id: 6, title: "Royal", price: "12,000,000", status: 'Active' }
    ]
  });
  const [settings, setSettings] = useState({
    companyName: 'Na-ALLAH Travels & Tours Ltd.',
    contactPhone: '08034747257',
    contactEmail: 'naallahtravels@gmail.com'
  });

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('na_allah_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [
      { id: 1, name: 'Ibrahim Musa', package: 'VIP Hajj', status: 'Pending', date: '2026-03-24', phone: '08034747257', email: 'ibrahim@example.com', message: 'I want to inquire about the VIP Hajj package for my whole family of 5. Please send the final quote.' },
      { id: 2, name: 'Aisha Bello', package: 'Standard Ramadan', status: 'Confirmed', date: '2026-03-25', phone: '08123456789', email: 'aisha.b@mail.com', message: 'Already made the deposit for the Standard package. Finding my receipt attached for confirmation.' }
    ];
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages'));
    const savedSettings = JSON.parse(localStorage.getItem('na_allah_settings'));

    setBookings(savedBookings);
    if (savedPackages) setPackages(savedPackages);
    if (savedSettings) setSettings(savedSettings);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '2026' || passcode === 'admin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
      setError('');
    } else {
      setError('Invalid Passcode. Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('na_allah_auth');
    window.location.hash = '';
  };

  const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleUpdatePrice = (cat, id, newPrice) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].map(p => p.id === id ? { ...p, price: newPrice } : p);
    setPackages(updated);
    saveToLocal('na_allah_packages', updated);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    saveToLocal('na_allah_bookings', updated);
    if(viewingBooking && viewingBooking.id === id) setViewingBooking({...viewingBooking, status: newStatus});
  };

  const handleUpdateSettings = (key, val) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    saveToLocal('na_allah_settings', updated);
  };

  const handleDeleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    saveToLocal('na_allah_bookings', updated);
    setViewingBooking(null);
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <div style={styles.loginIcon}>🔒</div>
            <h2>Admin Control Center</h2>
            <p>Please enter your access passcode to continue.</p>
          </div>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <div style={{marginBottom: '20px'}}>
              <label style={styles.label}>Access Passcode</label>
              <input type="password" placeholder="Enter passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} style={styles.input} autoFocus />
            </div>
            {error && <p style={styles.loginError}>{error}</p>}
            <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '15px'}}>Unlock Dashboard</button>
            <button type="button" onClick={() => window.location.hash = ''} style={styles.guestBtn}>Cancel & Back Home</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.adminContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2>Admin Console</h2>
          <p style={{fontSize: '0.8rem', opacity: 0.7}}>{settings.companyName}</p>
        </div>
        <ul style={styles.nav}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Packages</li>
          <li style={{...styles.navItem, ...(activeTab === 'settings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('settings')}>⚙️ Settings</li>
        </ul>
        <div style={{marginTop: 'auto', padding: '20px'}}>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sign Out</button>
        </div>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <button onClick={() => window.location.hash = ''} style={styles.backButtonTop}>← Back to Site</button>
            <h1 style={{fontSize: '1.5rem', margin: 0}}>{activeTab.toUpperCase()}</h1>
          </div>
          <div style={styles.userProfile}>
            <span style={styles.avatar}>A</span>
            <span>Admin Control</span>
          </div>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <div style={styles.statsGrid}>
                <div style={styles.statCard}><h3>Packages</h3><p style={styles.statNumber}>{packages.ramadan.length + packages.hajj.length}</p></div>
                <div style={styles.statCard}><h3>New Inquiries</h3><p style={styles.statNumber}>{bookings.filter(b => b.status === 'Pending').length}</p></div>
                <div style={styles.statCard}><h3>Forecast Revenue</h3><p style={styles.statNumber}>₦42.5M</p></div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <h3>Inquiry Tracking</h3>
                <span>{bookings.length} inquiries total</span>
              </div>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Customer</th>
                      <th style={styles.th}>Package</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id}>
                        <td style={styles.td}>{b.name}</td>
                        <td style={styles.td}>{b.package}</td>
                        <td style={styles.td}>{b.date}</td>
                        <td style={styles.td}><span style={b.status === 'Pending' ? styles.statusPending : styles.statusConfirmed}>{b.status}</span></td>
                        <td style={styles.td}>
                          <button onClick={() => setViewingBooking(b)} style={styles.actionBtn}>View</button>
                          <button onClick={() => handleDeleteBooking(b.id)} style={{...styles.actionBtn, color: 'red'}}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div style={styles.packageEditorGrid}>
               <div style={styles.editorCard}>
                  <h4 style={{marginBottom: '20px'}}>🌙 Ramadan Pricing</h4>
                  {packages.ramadan.map(p => (
                    <div key={p.id} style={styles.itemRow}><span>{p.title}</span><input defaultValue={p.price} onBlur={(e) => handleUpdatePrice('ramadan', p.id, e.target.value)} style={styles.inlineInput} /></div>
                  ))}
               </div>
               <div style={styles.editorCard}>
                  <h4 style={{marginBottom: '20px'}}>🕋 Hajj Pricing</h4>
                  {packages.hajj.map(p => (
                    <div key={p.id} style={styles.itemRow}><span>{p.title}</span><input defaultValue={p.price} onBlur={(e) => handleUpdatePrice('hajj', p.id, e.target.value)} style={styles.inlineInput} /></div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{maxWidth: '500px'}}>
              <h3>Site Settings</h3>
              <div style={styles.formGroup}><label>Company Name</label><input value={settings.companyName} onChange={e => handleUpdateSettings('companyName', e.target.value)} style={styles.input} /></div>
              <div style={styles.formGroup}><label>Contact Phone</label><input value={settings.contactPhone} onChange={e => handleUpdateSettings('contactPhone', e.target.value)} style={styles.input} /></div>
            </div>
          )}
        </div>
      </main>

      {/* INQUIRY MODAL */}
      {viewingBooking && (
        <div style={styles.modalOverlay} onClick={() => setViewingBooking(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{color: 'white', margin: 0}}>Inquiry Details</h2>
              <button onClick={() => setViewingBooking(null)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.modalBody}>
               <div style={styles.infoGrid}>
                 <div style={styles.infoBox}><strong>Name:</strong><p>{viewingBooking.name}</p></div>
                 <div style={styles.infoBox}><strong>Date:</strong><p>{viewingBooking.date}</p></div>
                 <div style={styles.infoBox}><strong>Phone:</strong><p>{viewingBooking.phone}</p></div>
                 <div style={styles.infoBox}><strong>Email:</strong><p>{viewingBooking.email}</p></div>
                 <div style={{...styles.infoBox, gridColumn: 'span 2'}}><strong>Selected Package:</strong><p>{viewingBooking.package}</p></div>
                 <div style={{...styles.infoBox, gridColumn: 'span 2'}}>
                    <strong>Customer Message:</strong>
                    <div style={styles.messageBox}>{viewingBooking.message}</div>
                 </div>
               </div>
               <div style={styles.modalFooter}>
                  <button 
                    onClick={() => handleUpdateStatus(viewingBooking.id, viewingBooking.status === 'Pending' ? 'Confirmed' : 'Pending')} 
                    style={{...styles.btnLarge, backgroundColor: viewingBooking.status === 'Pending' ? '#059669' : '#d97706'}}
                  >
                    {viewingBooking.status === 'Pending' ? 'Mark as Confirmed' : 'Revert to Pending'}
                  </button>
                  <button onClick={() => handleDeleteBooking(viewingBooking.id)} style={{...styles.btnLarge, backgroundColor: '#ef4444'}}>Delete Inquiry Permanently</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  // ... existing styles ...
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: 'white', width: '90%', maxWidth: '650px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)' },
  modalHeader: { backgroundColor: 'var(--primary-navy)', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' },
  modalBody: { padding: '40px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  infoBox: { marginBottom: '10px' },
  messageBox: { marginTop: '10px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '80px', lineHeight: '1.6' },
  modalFooter: { marginTop: '40px', display: 'flex', gap: '15px' },
  btnLarge: { flex: 1, padding: '15px', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'filter 0.3s' },
  
  // Re-adding essential base styles from previous turn
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-navy)', fontFamily: '"Outfit", sans-serif' },
  loginCard: { backgroundColor: 'white', width: '100%', maxWidth: '450px', padding: '50px', borderRadius: '24px', textAlign: 'center' },
  loginIcon: { fontSize: '3rem', marginBottom: '15px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-navy)' },
  input: { width: '100%', padding: '14px 18px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', marginBottom: '15px' },
  guestBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem', width: '100%', marginTop: '10px' },
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: '"Outfit", sans-serif' },
  sidebar: { width: '280px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  nav: { listStyle: 'none', padding: '20px 0' },
  navItem: { padding: '18px 30px', cursor: 'pointer', opacity: 0.7, fontWeight: '500' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderLeft: '5px solid var(--primary-gold)', opacity: 1 },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  contentArea: { padding: '40px' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' },
  statCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px' },
  statNumber: { fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-navy)', marginTop: '10px' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', color: '#64748b' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  statusPending: { backgroundColor: '#fffbeb', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' },
  statusConfirmed: { backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' },
  actionBtn: { background: '#f1f5f9', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#ff4d4d', border: 'none', padding: '10px', width: '100%', cursor: 'pointer' },
  packageEditorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  editorCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f1f5f9' },
  inlineInput: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 12px', width: '140px', fontWeight: 'bold' },
  formGroup: { marginBottom: '20px' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '40px', height: '40px', backgroundColor: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }
};

export default AdminPanel;
