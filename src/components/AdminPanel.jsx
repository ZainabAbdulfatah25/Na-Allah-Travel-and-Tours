import React, { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [viewingBooking, setViewingBooking] = useState(null);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showAddLicense, setShowAddLicense] = useState(false);
  
  const [newPackage, setNewPackage] = useState({ title: '', price: '', category: 'ramadan' });
  const [newLicense, setNewLicense] = useState({ title: '', link: '', status: 'Active' });
  
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({ 
    ramadan: [
      { id: 1, title: 'Standard Ramadan', price: '4,000,000' },
      { id: 2, title: 'Premium Ramadan', price: '4,500,000' },
      { id: 3, title: 'VIP Ramadan', price: '5,000,000' }
    ],
    hajj: [
      { id: 4, title: 'Standard Hajj', price: '7,000,000' },
      { id: 5, title: 'Premium Hajj', price: '8,500,000' },
      { id: 6, title: 'Royal Hajj', price: '12,000,000' }
    ]
  });
  const [licenses, setLicenses] = useState([]);

  const loadData = useCallback(() => {
    const b = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const p = JSON.parse(localStorage.getItem('na_allah_packages')) || packages;
    const l = JSON.parse(localStorage.getItem('na_allah_licenses')) || [
       { id: 1, title: 'CAC Official Registration', link: '#', status: 'Official' },
       { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Verified' }
    ];

    setBookings(b);
    setPackages(p);
    setLicenses(l);
  }, []);

  useEffect(() => {
    loadData();
    const sync = (e) => { if (e.key && e.key.startsWith('na_allah_')) loadData(); };
    window.addEventListener('storage', sync);
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
    return () => window.removeEventListener('storage', sync);
  }, [loadData]);

  const save = (key, data) => { localStorage.setItem(key, JSON.stringify(data)); loadData(); };

  const handlePackageAdd = (e) => {
    e.preventDefault();
    const updated = { ...packages };
    updated[newPackage.category].push({ id: Date.now(), title: newPackage.title, price: newPackage.price });
    save('na_allah_packages', updated);
    setShowAddPackage(false);
    setNewPackage({ title: '', price: '', category: 'ramadan' });
  };

  const handlePackageDelete = (cat, id) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].filter(p => p.id !== id);
    save('na_allah_packages', updated);
  };

  const handleUpdatePrice = (cat, id, newPrice) => {
     const updated = { ...packages };
     updated[cat] = updated[cat].map(p => p.id === id ? { ...p, price: newPrice } : p);
     save('na_allah_packages', updated);
  };

  const handleLicenseAdd = (e) => {
    e.preventDefault();
    const updated = [...licenses, { id: Date.now(), ...newLicense }];
    save('na_allah_licenses', updated);
    setShowAddLicense(false);
    setNewLicense({ title: '', link: '', status: 'Active' });
  };

  const handleLicenseDelete = (id) => save('na_allah_licenses', licenses.filter(l => l.id !== id));

  const login = (e) => {
    e.preventDefault();
    if (['2026', 'admin2026'].includes(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
    } else setError('Invalid Passcode.');
  };

  if (!isAuthenticated) return (
    <div style={styles.loginPage}><div style={styles.loginCard}><Logo size={80} /><h2 style={{color: 'var(--primary-navy)', marginTop: '20px'}}>Access Control</h2>
      <form onSubmit={login} style={{textAlign: 'left', marginTop: '30px'}}><label style={styles.label}>Console PIN</label>
        <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" />
        <button type="submit" className="btn btn-navy" style={{width: '100%', marginTop: '10px', padding: '16px'}}>Authorize Access</button>
      </form>
    </div></div>
  );

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><Logo size={60} /><p style={{color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '0.7rem', marginTop: '10px'}}>NA-ALLAH CONSOLE</p></div>
        <ul style={{listStyle: 'none', padding: 0}}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Overall Stats</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Latest Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Travel Plans</li>
          <li style={{...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('licenses')}>📜 Credentials</li>
        </ul>
        <button onClick={() => {sessionStorage.removeItem('na_allah_auth'); setIsAuthenticated(false);}} style={styles.logoutBtn}>Sign Out</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}><button onClick={() => window.location.hash = ''} className="btn-outline" style={{padding: '10px 20px', borderRadius: '10px'}}>← Back to Site</button><h3>Admin Dashboard: {activeTab.toUpperCase()}</h3></header>
        <div style={styles.contentArea}>
          {activeTab === 'dashboard' && <div style={styles.grid2}><div style={styles.statCard}><h3>Inquiries (Total)</h3><p style={styles.statNum}>{bookings.length}</p></div><div style={styles.statCard}><h3>Active Licenses</h3><p style={styles.statNum}>{licenses.length}</p></div></div>}

          {activeTab === 'bookings' && (
            <div style={styles.tableCard}><table style={styles.table}><thead><tr><th>Name</th><th>Requested Package</th><th>Action</th></tr></thead>
              <tbody>{bookings.map(b => (
                <tr key={b.id}><td><strong>{b.name}</strong></td><td>{b.package}</td><td><button onClick={() => setViewingBooking(b)} style={styles.btnSm}>View Details</button></td></tr>
              ))}</tbody>
            </table></div>
          )}

          {activeTab === 'packages' && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center'}}>
                <h3 style={{margin: 0}}>Hajj & Umrah Travel Plans</h3>
                <button onClick={() => setShowAddPackage(true)} className="btn btn-navy" style={{padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                   <span style={{fontSize: '1.2rem'}}>✈️</span> + New Package
                </button>
              </div>
              <div style={styles.grid2}>{['ramadan', 'hajj'].map(cat => (
                <div key={cat} style={styles.statCard}><h4 style={{textTransform: 'uppercase', marginBottom: '20px', color: 'var(--primary-gold)'}}>{cat} Pricing control</h4>
                  {packages[cat].map(p => (
                    <div key={p.id} style={styles.row}>
                      <div style={{flex: 1}}><strong>{p.title}</strong></div>
                      <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                         <div style={{display: 'flex', alignItems: 'center'}}><span>₦</span><input defaultValue={p.price} onBlur={e => handleUpdatePrice(cat, p.id, e.target.value)} style={styles.inlineInput} /></div>
                         <button onClick={() => handlePackageDelete(cat, p.id)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold'}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}</div>
            </div>
          )}

          {activeTab === 'licenses' && (
             <div style={styles.tableCard}><table style={styles.table}><thead><tr><th>Credential Name</th><th>Action</th></tr></thead>
                <tbody>{licenses.map(l => (
                  <tr key={l.id}><td>{l.title}</td><td><a href={l.link} target="_blank" rel="noreferrer" style={{color: 'var(--primary-navy)', fontWeight: 'bold', fontSize: '0.8rem'}}>View</a></td></tr>
                ))}</tbody>
             </table></div>
          )}
        </div>
      </main>

      {/* MODALS */}
      {viewingBooking && (<div style={styles.overlay} onClick={() => setViewingBooking(null)}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.mHead}><h2>Reference Inquiry</h2></div><div style={styles.mBody}>
        <p><strong>Cust:</strong> {viewingBooking.name}</p><p><strong>Email:</strong> {viewingBooking.email}</p><div style={styles.msg}>{viewingBooking.message}</div><button onClick={() => setViewingBooking(null)} className="btn btn-navy" style={{width: '100%', marginTop: '20px'}}>Dismiss</button></div></div></div>)}
      
      {showAddPackage && (<div style={styles.overlay} onClick={() => setShowAddPackage(false)}><div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.mHead}>
           <h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
              <span style={{fontSize: '2rem'}}>📦</span> New Package
           </h2>
        </div>
        <div style={styles.mBody}><form onSubmit={handlePackageAdd}>
           <label style={styles.label}>Package Title</label><input required style={styles.input} value={newPackage.title} onChange={e => setNewPackage({...newPackage, title: e.target.value})} />
           <label style={styles.label}>Price (₦)</label><input required style={styles.input} value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} />
           <label style={styles.label}>Category</label><select style={styles.input} value={newPackage.category} onChange={e => setNewPackage({...newPackage, category: e.target.value})}><option value="ramadan">Ramadan</option><option value="hajj">Hajj</option></select>
           <button type="submit" className="btn btn-navy" style={{width: '100%', marginTop: '30px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem'}}>
              <span style={{fontSize: '1.4rem'}}>🕋</span> Add Package
           </button></form></div></div></div>)}
    </div>
  );
}

const styles = {
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' },
  sidebar: { width: '250px', backgroundColor: 'var(--primary-navy)', color: 'white' },
  sidebarHeader: { padding: '30px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  navItem: { padding: '20px 25px', cursor: 'pointer', opacity: 0.6, fontSize: '0.85rem', fontWeight: '800' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary-gold)', opacity: 1, borderRight: '4px solid var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e1e1e1' },
  contentArea: { padding: '40px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  statCard: { backgroundColor: 'white', padding: '25px', borderRadius: '15px' },
  statNum: { fontSize: '3rem', margin: '15px 0', color: 'var(--primary-navy)', fontWeight: 'bold' },
  tableCard: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f1f1f1' },
  btnSm: { background: '#f0f0f0', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  logoutBtn: { position: 'absolute', bottom: '20px', left: '25px', background: 'none', border: 'none', color: '#ff7675', fontWeight: 'bold', cursor: 'pointer' },
  loginPage: { height: '100vh', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginCard: { background: 'white', padding: '50px', borderRadius: '30px', width: '380px', textAlign: 'center' },
  input: { width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '8px', boxSizing: 'border-box' },
  inlineInput: { width: '120px', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'right', fontWeight: 'bold', color: 'var(--primary-navy)' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', width: '450px', borderRadius: '25px', overflow: 'hidden' },
  mHead: { background: 'var(--primary-navy)', color: 'white', padding: '20px', textAlign: 'center' },
  mBody: { padding: '30px' },
  msg: { marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '15px', minHeight: '80px' },
  label: { fontWeight: '700', color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '5px', textAlign: 'left' }
};

export default AdminPanel;
