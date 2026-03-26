import React, { useState, useEffect, useCallback } from 'react';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewingBooking, setViewingBooking] = useState(null); 
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPackage, setNewPackage] = useState({ title: '', price: '', category: 'ramadan' });
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({
    ramadan: [
      { id: 1, title: "Standard", price: "4,000,000", status: 'Active' },
      { id: 2, title: "Premium", price: "4,500,000", status: 'Active' },
      { id: 3, title: "VIP", price: "5,000,000", status: 'Active' }
    ],
    hajj: [
      { id: 4, title: "Standard", price: "7,000,000", status: 'Active' },
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
    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings'));
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages'));
    const savedSettings = JSON.parse(localStorage.getItem('na_allah_settings'));

    if (savedBookings) setBookings(savedBookings);
    else setBookings([
      { id: 111, name: 'Ibrahim Musa', package: 'VIP Hajj', status: 'Pending', date: '2026-03-24', phone: '08034747257', email: 'ibrahim@example.com', message: 'I want to inquire about the VIP Hajj package for my whole family of 5.' },
      { id: 222, name: 'Aisha Bello', package: 'Standard Ramadan', status: 'Confirmed', date: '2026-03-25', phone: '08123456789', email: 'aisha.b@mail.com', message: 'Already made the deposit for the Standard package.' }
    ]);

    if (savedPackages) setPackages(savedPackages);
    if (savedSettings) setSettings(savedSettings);
  }, []);

  useEffect(() => {
    loadData();
    const handleStorageChange = (e) => {
      if (['na_allah_bookings', 'na_allah_packages', 'na_allah_settings'].includes(e.key)) loadData();
    };
    window.addEventListener('storage', handleStorageChange);
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadData]);

  useEffect(() => {
    document.body.style.overflow = (viewingBooking || showAddPackage) ? 'hidden' : 'auto';
  }, [viewingBooking, showAddPackage]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (['2026', 'admin2026'].includes(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
    } else setError('Invalid Passcode.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('na_allah_auth');
    window.location.hash = '';
  };

  const savePackages = (updated) => {
    setPackages(updated);
    localStorage.setItem('na_allah_packages', JSON.stringify(updated));
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    if (!newPackage.title || !newPackage.price) return alert("Please provide title and price!");
    const updated = { ...packages };
    const newItem = {
      id: Date.now(),
      title: newPackage.title,
      price: newPackage.price,
      status: 'Active'
    };
    updated[newPackage.category].push(newItem);
    savePackages(updated);
    setShowAddPackage(false);
    setNewPackage({ title: '', price: '', category: 'ramadan' });
  };

  const handleUpdatePrice = (cat, id, newPrice) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].map(p => p.id === id ? { ...p, price: newPrice } : p);
    savePackages(updated);
  };

  const handleDeletePackage = (cat, id) => {
    if (!window.confirm("Delete this package permanently?")) return;
    const updated = { ...packages };
    updated[cat] = updated[cat].filter(p => p.id !== id);
    savePackages(updated);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem('na_allah_bookings', JSON.stringify(updated));
    if(viewingBooking && viewingBooking.id === id) setViewingBooking({...viewingBooking, status: newStatus});
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin} style={{textAlign: 'left', marginTop: '30px'}}>
            <label style={styles.label}>Control Passcode</label>
            <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
            {error && <p style={{color: 'red', marginTop: '-10px', marginBottom: '15px'}}>{error}</p>}
            <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '15px'}}>Unlock Console</button>
            <button type="button" onClick={() => window.location.hash = ''} style={styles.guestBtn}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><h2>Admin</h2><p style={{fontSize: '0.8rem'}}>{settings.companyName}</p></div>
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
             <h1 style={{margin: 0, fontSize: '1.2rem'}}>{activeTab.toUpperCase()}</h1>
          </div>
          <button onClick={loadData} style={styles.refreshBtn}>🔄 Refresh</button>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'packages' && (
             <div className="animate-fade-in">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
                  <div>
                    <h3>Live Packages Management</h3>
                    <p style={{opacity: 0.6, fontSize: '0.9rem'}}>Add, edit, or remove travel deals from the landing page.</p>
                  </div>
                  <button onClick={() => setShowAddPackage(true)} style={styles.addPkgBtn}>+ New Package</button>
                </div>

                <div style={styles.packageEditorGrid}>
                   {['ramadan', 'hajj'].map(cat => (
                     <div key={cat} style={styles.editorCard}>
                        <h3 style={{marginBottom: '20px', textTransform: 'capitalize'}}>{cat === 'ramadan' ? '🌙 Ramadan' : '🕋 Hajj'} Pricing</h3>
                        {packages[cat].map(p => (
                          <div key={p.id} style={styles.itemRow}>
                             <div style={{flex: 1}}>
                               <p style={{margin: 0, fontWeight: 'bold'}}>{p.title}</p>
                               <button onClick={() => handleDeletePackage(cat, p.id)} style={styles.delPkgLink}>Delete</button>
                             </div>
                             <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                               <span style={{fontSize: '0.9rem'}}>₦</span>
                               <input defaultValue={p.price} onBlur={e => handleUpdatePrice(cat, p.id, e.target.value)} style={styles.inlineInput}/>
                             </div>
                          </div>
                        ))}
                     </div>
                   ))}
                </div>
             </div>
          )}

          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Customer</th><th style={styles.th}>Package</th><th style={styles.th}>Status</th><th style={styles.th}>Action</th></tr></thead>
                  <tbody>{bookings.map(b => (
                    <tr key={b.id}>
                      <td style={styles.td}>{b.name}</td>
                      <td style={styles.td}>{b.package}</td>
                      <td style={styles.td}><span style={b.status === 'Pending' ? styles.statusPending : styles.statusConfirmed}>{b.status}</span></td>
                      <td style={styles.td}><button onClick={() => setViewingBooking(b)} style={styles.actionBtn}>View</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
             <div style={styles.statsGrid}>
                <div style={styles.statCard}><h3>Inquiries</h3><p style={styles.statNumber}>{bookings.length}</p></div>
                <div style={styles.statCard}><h3>Packages</h3><p style={styles.statNumber}>{packages.ramadan.length + packages.hajj.length}</p></div>
             </div>
          )}
        </div>
      </main>

      {/* ADD PACKAGE MODAL */}
      {showAddPackage && (
        <div style={styles.modalOverlay} onClick={() => setShowAddPackage(false)}>
           <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={styles.modalHeader}><h2>Add New Package</h2><button onClick={() => setShowAddPackage(false)} style={styles.closeBtn}>✕</button></div>
              <div style={styles.modalBody}>
                 <form onSubmit={handleAddPackage}>
                    <div style={styles.formGroup}><label>Title</label><input required value={newPackage.title} onChange={e => setNewPackage({...newPackage, title: e.target.value})} style={styles.input} placeholder="e.g. Economy Ramadan"/></div>
                    <div style={styles.formGroup}><label>Price (₦)</label><input required value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} style={styles.input} placeholder="e.g. 3,500,000"/></div>
                    <div style={styles.formGroup}><label>Category</label><select value={newPackage.category} onChange={e => setNewPackage({...newPackage, category: e.target.value})} style={styles.input}><option value="ramadan">Ramadan</option><option value="hajj">Hajj</option></select></div>
                    <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '18px', marginTop: '20px'}}>Publish Package</button>
                 </form>
              </div>
           </div>
        </div>
      )}

      {/* VIEW INQUIRY MODAL */}
      {viewingBooking && (
        <div style={styles.modalOverlay} onClick={() => setViewingBooking(null)}>
           <div style={styles.modalScrollContainer}><div style={styles.modalContent} onClick={e => e.stopPropagation()}>
               <div style={styles.modalHeader}><h2>Inquiry</h2><button onClick={() => setViewingBooking(null)} style={styles.closeBtn}>✕</button></div>
               <div style={styles.modalBody}>
                  <p><strong>Name:</strong> {viewingBooking.name}</p>
                  <p><strong>Email:</strong> {viewingBooking.email}</p>
                  <p><strong>Package:</strong> {viewingBooking.package}</p>
                  <div style={styles.messageBox}>{viewingBooking.message}</div>
                  <div style={{marginTop: '30px', display: 'flex', gap: '10px'}}><button onClick={() => handleUpdateStatus(viewingBooking.id, 'Confirmed')} className="btn btn-navy" style={{flex: 1}}>Confirm Booking</button></div>
               </div>
           </div></div>
        </div>
      )}
    </div>
  );
}

const styles = {
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Outfit", sans-serif' },
  sidebar: { width: '280px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  nav: { listStyle: 'none', padding: '20px 0' },
  navItem: { padding: '18px 30px', cursor: 'pointer', opacity: 0.6, fontWeight: '600' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderLeft: '6px solid var(--primary-gold)', opacity: 1, color: 'var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  refreshBtn: { background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold' },
  contentArea: { padding: '40px' },
  backButtonTop: { background: '#f1f5f9', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', color: '#64748b' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  statusPending: { backgroundColor: '#fffbeb', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' },
  statusConfirmed: { backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' },
  actionBtn: { background: '#f1f5f9', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  statsGrid: { display: 'flex', gap: '20px' },
  statCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px', flex: 1 },
  statNumber: { fontSize: '2.5rem', fontWeight: '800', margin: '10px 0' },
  addPkgBtn: { backgroundColor: 'var(--primary-navy)', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  packageEditorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  editorCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #f8fafc' },
  delPkgLink: { background: 'none', border: 'none', color: '#ff4d4d', padding: 0, fontSize: '0.8rem', cursor: 'pointer', marginTop: '5px' },
  inlineInput: { border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', width: '140px', textAlign: 'right', fontWeight: 'bold' },
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-navy)' },
  loginCard: { backgroundColor: 'white', padding: '50px', borderRadius: '32px', width: '90%', maxWidth: '400px', textAlign: 'center' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '5px', boxSizing: 'border-box' },
  formGroup: { marginBottom: '20px', textAlign: 'left' },
  label: { fontWeight: '800', fontSize: '0.85rem', color: '#64748b' },
  guestBtn: { background: 'none', border: 'none', marginTop: '15px', width: '100%', color: '#64748b', cursor: 'pointer' },
  logoutBtn: { background: 'rgba(255,255,255,0.05)', color: '#ff4d4d', border: 'none', padding: '12px', width: '100%', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: 'white', width: '90%', maxWidth: '500px', borderRadius: '24px', overflow: 'hidden' },
  modalHeader: { backgroundColor: 'var(--primary-navy)', color: 'white', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' },
  modalBody: { padding: '35px' },
  modalScrollContainer: { height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto' },
  messageBox: { marginTop: '15px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', minHeight: '100px' }
};

export default AdminPanel;
