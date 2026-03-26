import React, { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';

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
      { id: 1, title: "Standard", price: "4,000,000" },
      { id: 2, title: "Premium", price: "4,500,000" }
    ],
    hajj: [
      { id: 4, title: "Standard", price: "7,000,000" },
      { id: 5, title: "Premium", price: "8,500,000" }
    ]
  });
  const [licenses, setLicenses] = useState([
    { id: 1, title: 'Corporate Affairs Commission (CAC)', link: '#', status: 'Official' },
    { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Active' },
    { id: 3, title: 'IATA Accredited Agency', link: '#', status: 'Verified' }
  ]);

  const loadData = useCallback(() => {
    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages')) || packages;
    const savedLicenses = JSON.parse(localStorage.getItem('na_allah_licenses'));

    setBookings(savedBookings);
    setPackages(savedPackages);
    if (savedLicenses) setLicenses(savedLicenses);
  }, []);

  useEffect(() => {
    loadData();
    const handleSync = (e) => {
      if (['na_allah_bookings', 'na_allah_packages', 'na_allah_licenses'].includes(e.key)) loadData();
    };
    window.addEventListener('storage', handleSync);
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
    return () => window.removeEventListener('storage', handleSync);
  }, [loadData]);

  const savePackages = (updated) => {
    setPackages(updated);
    localStorage.setItem('na_allah_packages', JSON.stringify(updated));
  };

  const handleUpdatePrice = (cat, id, newPrice) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].map(p => p.id === id ? { ...p, price: newPrice } : p);
    savePackages(updated);
  };

  const handleDeletePackage = (cat, id) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].filter(p => p.id !== id);
    savePackages(updated);
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    const updated = { ...packages };
    updated[newPackage.category].push({ id: Date.now(), title: newPackage.title, price: newPackage.price });
    savePackages(updated);
    setShowAddPackage(false);
    setNewPackage({ title: '', price: '', category: 'ramadan' });
  };

  const login = (e) => {
    e.preventDefault();
    if (['2026', 'admin2026'].includes(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
    } else setError('Invalid Passcode.');
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <Logo size={100} showText={false} />
          <h2 style={{marginTop: '20px', color: 'var(--primary-navy)'}}>Admin Access</h2>
          <form onSubmit={login} style={{textAlign: 'left', marginTop: '30px'}}>
             <label style={styles.label}>Control Passcode</label>
             <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
             {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
             <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '15.5px'}}>Unlock Console</button>
             <button type="button" onClick={() => window.location.hash = ''} style={styles.guestBtn}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><Logo size={80} showText={false} /><p style={{color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '0.7rem', marginTop: '10px'}}>CONTROL CENTER</p></div>
        <ul style={styles.nav}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Packages</li>
          <li style={{...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('licenses')}>📜 Certificates</li>
        </ul>
        <button onClick={() => {sessionStorage.removeItem('na_allah_auth'); setIsAuthenticated(false);}} style={styles.logoutBtn}>Sign Out</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <button onClick={() => window.location.hash = ''} style={styles.backBtn}>← Back Site</button>
          <h3 style={{margin: 0}}>ADMIN CONSOLE - {activeTab.toUpperCase()}</h3>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'dashboard' && (
            <div style={styles.statsGrid}>
               <div style={styles.statCard}><h3>Inquiries</h3><p style={{fontSize: '3rem', margin: '5px 0'}}>{bookings.length}</p></div>
               <div style={styles.statCard}><h3>Certifications</h3><p style={{fontSize: '3rem', margin: '5px 0'}}>{licenses.length}</p></div>
            </div>
          )}

          {activeTab === 'bookings' && (
             <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Customer</th><th style={styles.th}>Package</th><th style={styles.th}>Action</th></tr></thead>
                  <tbody>{bookings.map(b => (
                    <tr key={b.id}>
                      <td style={styles.td}>{b.name}</td>
                      <td style={styles.td}>{b.package}</td>
                      <td style={styles.td}><button onClick={() => setViewingBooking(b)} style={styles.btnSm}>View</button></td>
                    </tr>
                  ))}</tbody>
                </table>
             </div>
          )}

          {activeTab === 'packages' && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
                <h3>Travel Package Management</h3>
                <button onClick={() => setShowAddPackage(true)} className="btn btn-navy" style={{padding: '10px 20px'}}>+ New Package</button>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
                {['ramadan', 'hajj'].map(cat => (
                  <div key={cat} style={styles.pkgEdCard}>
                    <h4 style={{textTransform: 'uppercase', marginBottom: '20px'}}>{cat} Pricing</h4>
                    {packages[cat].map(p => (
                      <div key={p.id} style={styles.pkgRow}>
                        <span>{p.title}</span>
                        <div style={{display: 'flex', gap: '10px'}}>
                          <input defaultValue={p.price} onBlur={e => handleUpdatePrice(cat, p.id, e.target.value)} style={styles.inlineInput} />
                          <button onClick={() => handleDeletePackage(cat, p.id)} style={{color: 'red'}}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}
      {viewingBooking && (
        <div style={styles.modalOverlay} onClick={() => setViewingBooking(null)}><div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={styles.modalHeader}><h2>Details</h2><button onClick={() => setViewingBooking(null)} style={{color: 'white', background: 'none', border: 'none'}}>✕</button></div>
          <div style={styles.modalBody}>
             <p><strong>Name:</strong> {viewingBooking.name}</p>
             <p><strong>Email:</strong> {viewingBooking.email}</p>
             <div style={styles.msgBox}>{viewingBooking.message}</div>
             <button onClick={() => setViewingBooking(null)} className="btn btn-navy" style={{width: '100%', marginTop: '20px'}}>Close</button>
          </div>
        </div></div>
      )}

      {showAddPackage && (
        <div style={styles.modalOverlay} onClick={() => setShowAddPackage(false)}><div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={styles.modalHeader}><h2>Add Package</h2><button onClick={() => setShowAddPackage(false)} style={{color: 'white', background: 'none', border: 'none'}}>✕</button></div>
          <div style={styles.modalBody}>
            <form onSubmit={handleAddPackage}>
              <div style={{marginBottom: '15px'}}><label>Title</label><input required value={newPackage.title} onChange={e => setNewPackage({...newPackage, title: e.target.value})} style={styles.input} /></div>
              <div style={{marginBottom: '15px'}}><label>Price</label><input required value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} style={styles.input} /></div>
              <div style={{marginBottom: '15px'}}><label>Category</label><select value={newPackage.category} onChange={e => setNewPackage({...newPackage, category: e.target.value})} style={styles.input}><option value="ramadan">Ramadan</option><option value="hajj">Hajj</option></select></div>
              <button type="submit" className="btn btn-navy" style={{width: '100%', marginTop: '20px'}}>Publish</button>
            </form>
          </div>
        </div></div>
      )}
    </div>
  );
}

const styles = {
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' },
  sidebar: { width: '260px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  nav: { listStyle: 'none', padding: 0 },
  navItem: { padding: '18px 25px', cursor: 'pointer', opacity: 0.6, fontWeight: '700' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.15)', borderLeft: '6px solid var(--primary-gold)', opacity: 1, color: 'var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  contentArea: { padding: '40px' },
  backBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 15px', borderRadius: '12px' },
  statsGrid: { display: 'flex', gap: '30px' },
  statCard: { flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '24px' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', fontSize: '0.8rem' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  pkgRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f1f5f9' },
  inlineInput: { width: '120px', padding: '5px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'right' },
  btnSm: { background: '#f1f5f9', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' },
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-navy)' },
  loginCard: { backgroundColor: 'white', padding: '50px', borderRadius: '40px', textAlign: 'center', width: '400px' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '10px', boxSizing: 'border-box' },
  logoutBtn: { marginTop: 'auto', background: 'none', color: '#ff4d4d', border: 'none', padding: '30px', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: 'white', width: '500px', borderRadius: '32px', overflow: 'hidden' },
  modalHeader: { backgroundColor: 'var(--primary-navy)', color: 'white', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalBody: { padding: '35px' },
  msgBox: { marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', minHeight: '100px' }
};

export default AdminPanel;
