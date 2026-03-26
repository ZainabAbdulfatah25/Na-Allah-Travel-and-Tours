import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewingBooking, setViewingBooking] = useState(null); 
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
    // Lock background scroll when modal is open
    if (viewingBooking) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [viewingBooking]);

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
                <span>{bookings.length} inquiries found</span>
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

      {/* MODAL SECTION - FIXED SCROLLING */}
      {viewingBooking && (
        <div style={styles.modalOverlay} onClick={() => setViewingBooking(null)}>
          <div style={styles.modalScrollContainer}>
             <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h2 style={{color: 'white', margin: 0, fontSize: '1.4rem'}}>Full Inquiry Details</h2>
                  <button onClick={() => setViewingBooking(null)} style={styles.closeBtn}>✕</button>
                </div>
                <div style={styles.modalBody}>
                   <div style={styles.infoGrid}>
                     <div style={styles.infoBox}><strong>Name:</strong><p>{viewingBooking.name}</p></div>
                     <div style={styles.infoBox}><strong>Date:</strong><p>{viewingBooking.date}</p></div>
                     <div style={styles.infoBox}><strong>Phone:</strong><p>{viewingBooking.phone}</p></div>
                     <div style={styles.infoBox}><strong>Email:</strong><p>{viewingBooking.email}</p></div>
                     <div style={{...styles.infoBox, gridColumn: 'span 2'}}><strong>Selected Package:</strong><p style={{color: 'var(--primary-navy)', fontWeight: 'bold'}}>{viewingBooking.package}</p></div>
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
                        {viewingBooking.status === 'Pending' ? 'Confirm Booking' : 'Set as Pending'}
                      </button>
                      <button onClick={() => handleDeleteBooking(viewingBooking.id)} style={{...styles.btnLarge, backgroundColor: '#ef4444'}}>Delete Forever</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  // Modal Overlays and Scroll management
  modalOverlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(5, 15, 30, 0.9)', 
    zIndex: 2000,
    backdropFilter: 'blur(5px)'
  },
  modalScrollContainer: {
    height: '100vh',
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0'
  },
  modalContent: { 
    backgroundColor: 'white', 
    width: '90%', 
    maxWidth: '700px', 
    borderRadius: '24px', 
    overflow: 'hidden', 
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    margin: 'auto' // Important for centering in scroll container
  },
  modalHeader: { backgroundColor: 'var(--primary-navy)', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--primary-gold)' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' },
  modalBody: { padding: '40px' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px' },
  infoBox: { marginBottom: '5px' },
  messageBox: { marginTop: '10px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '15px', border: '1px solid #e2e8f0', minHeight: '100px', lineHeight: '1.7', color: '#334155' },
  modalFooter: { marginTop: '50px', display: 'flex', gap: '20px' },
  btnLarge: { flex: 1, padding: '18px', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  
  // Base styles
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-navy)', fontFamily: '"Outfit", sans-serif' },
  loginCard: { backgroundColor: 'white', width: '100%', maxWidth: '450px', padding: '50px', borderRadius: '32px', textAlign: 'center' },
  loginIcon: { fontSize: '3rem', marginBottom: '15px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-navy)', textTransform: 'uppercase' },
  input: { width: '100%', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', marginBottom: '15px', boxSizing: 'border-box' },
  guestBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem', width: '100%', marginTop: '10px' },
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Outfit", sans-serif' },
  sidebar: { width: '300px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  nav: { listStyle: 'none', padding: '25px 0' },
  navItem: { padding: '18px 30px', cursor: 'pointer', opacity: 0.65, fontWeight: '600', transition: '0.2s' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.15)', borderLeft: '6px solid var(--primary-gold)', opacity: 1, color: 'var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '85px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  contentArea: { padding: '50px' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' },
  statCard: { backgroundColor: 'white', padding: '35px', borderRadius: '28px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' },
  statNumber: { fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-navy)', marginTop: '10px' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '22px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: '700' },
  td: { padding: '22px', borderBottom: '1px solid #f1f5f9' },
  statusPending: { backgroundColor: '#fffbeb', color: '#d97706', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold' },
  statusConfirmed: { backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold' },
  actionBtn: { background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', marginRight: '10px', fontWeight: '800' },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#ff4d4d', border: 'none', padding: '15px', width: '100%', cursor: 'pointer', fontWeight: 'bold' },
  packageEditorGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  editorCard: { backgroundColor: 'white', padding: '35px', borderRadius: '28px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid #f1f5f9' },
  inlineInput: { border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 15px', width: '160px', fontWeight: 'bold', textAlign: 'right' },
  formGroup: { marginBottom: '25px' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '15px' },
  avatar: { width: '45px', height: '45px', backgroundColor: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-navy)' }
};

export default AdminPanel;
