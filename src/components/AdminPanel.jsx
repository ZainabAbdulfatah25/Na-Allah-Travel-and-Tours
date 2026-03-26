import React, { useState, useEffect, useCallback } from 'react';

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

  const loadData = useCallback(() => {
    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [
      { id: 111, name: 'Ibrahim Musa', package: 'VIP Hajj', status: 'Pending', date: '2026-03-24', phone: '08034747257', email: 'ibrahim@example.com', message: 'I want to inquire about the VIP Hajj package for my whole family of 5. Please send the final quote.' },
      { id: 222, name: 'Aisha Bello', package: 'Standard Ramadan', status: 'Confirmed', date: '2026-03-25', phone: '08123456789', email: 'aisha.b@mail.com', message: 'Already made the deposit for the Standard package. Finding my receipt attached for confirmation.' }
    ];
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages'));
    const savedSettings = JSON.parse(localStorage.getItem('na_allah_settings'));

    setBookings(savedBookings);
    if (savedPackages) setPackages(savedPackages);
    if (savedSettings) setSettings(savedSettings);
  }, []);

  useEffect(() => {
    loadData();

    // Auto-refresh when localStorage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'na_allah_bookings' || e.key === 'na_allah_packages' || e.key === 'na_allah_settings') {
        loadData();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    const sessionAuth = sessionStorage.getItem('na_allah_auth');
    if (sessionAuth === 'true') setIsAuthenticated(true);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadData]);

  useEffect(() => {
    if (viewingBooking) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [viewingBooking]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '2026' || passcode === 'admin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
    } else setError('Access Denied. Invalid Passcode.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('na_allah_auth');
    window.location.hash = '';
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem('na_allah_bookings', JSON.stringify(updated));
    if(viewingBooking && viewingBooking.id === id) setViewingBooking({...viewingBooking, status: newStatus});
  };

  const handleUpdatePrice = (cat, id, newPrice) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].map(p => p.id === id ? { ...p, price: newPrice } : p);
    setPackages(updated);
    localStorage.setItem('na_allah_packages', JSON.stringify(updated));
  };

  const handleDeleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('na_allah_bookings', JSON.stringify(updated));
    setViewingBooking(null);
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <h2>Admin Console</h2>
          <form onSubmit={handleLogin} style={{textAlign: 'left', marginTop: '30px'}}>
            <label style={styles.label}>Control Passcode</label>
            <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
            {error && <p style={{color: 'red', marginTop: '-10px', marginBottom: '15px'}}>{error}</p>}
            <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '15px'}}>Enter Console</button>
            <button type="button" onClick={() => window.location.hash = ''} style={styles.guestBtn}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2>Admin Control</h2>
          <p style={{opacity: 0.7, fontSize: '0.8rem'}}>{settings.companyName}</p>
        </div>
        <ul style={styles.nav}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Packages</li>
        </ul>
        <div style={{marginTop: 'auto', padding: '20px'}}><button onClick={handleLogout} style={styles.logoutBtn}>Sign Out</button></div>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <button onClick={() => window.location.hash = ''} style={styles.backButtonTop}>← Home</button>
            <h1 style={{margin: 0, fontSize: '1.4rem'}}>{activeTab.toUpperCase()}</h1>
          </div>
          <div style={{display: 'flex', gap: '15px'}}>
            <button onClick={loadData} style={styles.refreshBtn}>🔄 Refresh Data</button>
            <div style={styles.avatar}>A</div>
          </div>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                 <h3>Inquiry Tracking</h3>
                 <span style={{opacity: 0.6}}>{bookings.length} inquiries found</span>
              </div>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Customer</th><th style={styles.th}>Package</th><th style={styles.th}>Date</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
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

          {activeTab === 'dashboard' && (
             <div style={styles.statsGrid}>
                <div style={styles.statCard}><h3>Inquiries</h3><p style={styles.statNumber}>{bookings.length}</p></div>
                <div style={styles.statCard}><h3>Pending</h3><p style={styles.statNumber}>{bookings.filter(b => b.status === 'Pending').length}</p></div>
             </div>
          )}

          {activeTab === 'packages' && (
             <div style={styles.packageEditorGrid}>
                <div style={styles.editorCard}>
                   <h3>🌙 Ramadan Pricing</h3>
                   {packages.ramadan.map(p => (
                     <div key={p.id} style={styles.itemRow}><span>{p.title}</span><input defaultValue={p.price} onBlur={e => handleUpdatePrice('ramadan', p.id, e.target.value)} style={styles.inlineInput}/></div>
                   ))}
                </div>
                <div style={styles.editorCard}>
                   <h3>🕋 Hajj Pricing</h3>
                   {packages.hajj.map(p => (
                     <div key={p.id} style={styles.itemRow}><span>{p.title}</span><input defaultValue={p.price} onBlur={e => handleUpdatePrice('hajj', p.id, e.target.value)} style={styles.inlineInput}/></div>
                   ))}
                </div>
             </div>
          )}
        </div>
      </main>

      {viewingBooking && (
        <div style={styles.modalOverlay} onClick={() => setViewingBooking(null)}>
           <div style={styles.modalScrollContainer}>
             <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
               <div style={styles.modalHeader}><h2>Details</h2><button onClick={() => setViewingBooking(null)} style={styles.closeBtn}>✕</button></div>
               <div style={styles.modalBody}>
                  <div style={styles.infoGrid}>
                    <div><strong>Name:</strong><p>{viewingBooking.name}</p></div>
                    <div><strong>Email:</strong><p>{viewingBooking.email}</p></div>
                    <div style={{gridColumn: 'span 2'}}><strong>Message:</strong><div style={styles.messageBox}>{viewingBooking.message}</div></div>
                  </div>
                  <div style={{marginTop: '30px', display: 'flex', gap: '15px'}}>
                    <button onClick={() => handleUpdateStatus(viewingBooking.id, 'Confirmed')} className="btn btn-navy" style={{flex: 1, padding: '15px'}}>Mark Confirmed</button>
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
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7fa', fontFamily: '"Outfit", sans-serif' },
  sidebar: { width: '280px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  nav: { listStyle: 'none', padding: '20px 0' },
  navItem: { padding: '18px 30px', cursor: 'pointer', opacity: 0.6, fontWeight: '600' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderLeft: '6px solid var(--primary-gold)', opacity: 1, color: 'var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  avatar: { width: '40px', height: '40px', backgroundColor: 'var(--primary-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' },
  refreshBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 'bold' },
  contentArea: { padding: '40px' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', color: '#64748b' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  statusPending: { backgroundColor: '#fffbeb', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' },
  statusConfirmed: { backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' },
  actionBtn: { background: '#f1f5f9', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px' },
  statCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px', flex: 1 },
  statsGrid: { display: 'flex', gap: '20px' },
  statNumber: { fontSize: '2.5rem', fontWeight: '800', margin: '10px 0' },
  packageEditorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  editorCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f8fafc' },
  inlineInput: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 10px', width: '120px', textAlign: 'right' },
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-navy)', color: 'white' },
  loginCard: { backgroundColor: 'white', color: 'var(--primary-navy)', padding: '50px', borderRadius: '32px', width: '90%', maxWidth: '400px', textAlign: 'center' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '10px', marginBottom: '15px', boxSizing: 'border-box' },
  label: { fontWeight: '700', fontSize: '0.9rem', color: '#64748b' },
  guestBtn: { background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer', color: '#64748b', width: '100%' },
  logoutBtn: { background: 'rgba(255,255,255,0.05)', color: '#ff4d4d', border: 'none', padding: '12px', width: '100%', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000 },
  modalScrollContainer: { height: '100vh', overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '50px 0' },
  modalContent: { backgroundColor: 'white', width: '90%', maxWidth: '600px', borderRadius: '24px', margin: 'auto' },
  modalHeader: { backgroundColor: 'var(--primary-navy)', color: 'white', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' },
  modalBody: { padding: '40px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  messageBox: { marginTop: '10px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '100px' }
};

export default AdminPanel;
