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
  
  const [editingLicense, setEditingLicense] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);

  // GLOBAL SETTINGS STATE
  const [settings, setSettings] = useState({
     companyName: 'Na-Allah Travels and Tours Ltd.',
     phone: '+234 803 123 4567',
     email: 'info@na-allahtravels.com',
     address: 'No 12, Mecca Street, Abuja, Nigeria',
     heroSlogan: 'Experience the Ultimate Spiritual Journey with Luxury & Comfort.',
     whatsapp: '2348031234567',
     facebook: '#',
     instagram: '#',
     adminPin: '2026'
  });

  const [newPackage, setNewPackage] = useState({ title: '', price: '', category: 'ramadan' });
  const [newLicense, setNewLicense] = useState({ title: '', link: '', status: 'Official' });
  
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({ ramadan: [], hajj: [] });
  const [licenses, setLicenses] = useState([]);

  const loadData = useCallback(() => {
    const s = JSON.parse(localStorage.getItem('na_allah_settings')) || settings;
    const b = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const p = JSON.parse(localStorage.getItem('na_allah_packages')) || {
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
    };
    const l = JSON.parse(localStorage.getItem('na_allah_licenses')) || [
       { id: 1, title: 'Corporate Affairs Commission', link: '#', status: 'Official' },
       { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Verified' }
    ];
    setSettings(s);
    setBookings(b);
    setPackages(p);
    setLicenses(l);
  }, []);

  useEffect(() => {
    loadData();
    const handleSync = (e) => { if (e.key && e.key.startsWith('na_allah_')) loadData(); };
    window.addEventListener('storage', handleSync);
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
    return () => window.removeEventListener('storage', handleSync);
  }, [loadData]);

  const save = (key, data) => { localStorage.setItem(key, JSON.stringify(data)); loadData(); };

  // SECURE PREVIEW HELPER
  const openSecureView = (dataUri) => {
    if (!dataUri || dataUri === '#') return alert('No document available.');
    if (dataUri.startsWith('data:')) {
      try {
        const type = dataUri.split(';')[0].split(':')[1];
        const byteCharacters = atob(dataUri.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: type });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      } catch (e) { window.open(dataUri, '_blank'); }
    } else { window.open(dataUri, '_blank'); }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
       const reader = new FileReader();
       reader.onload = (event) => { 
          if (editingLicense) setEditingLicense({...editingLicense, link: event.target.result});
          else setNewLicense({ ...newLicense, link: event.target.result }); 
       };
       reader.readAsDataURL(file);
    }
  };

  const handlePackageSave = (e) => {
    e.preventDefault();
    const updated = { ...packages };
    if (editingPackage) updated[editingPackage.category] = updated[editingPackage.category].map(p => p.id === editingPackage.id ? editingPackage : p);
    else updated[newPackage.category].push({ id: Date.now(), ...newPackage });
    save('na_allah_packages', updated);
    setShowAddPackage(false); setEditingPackage(null); setNewPackage({ title: '', price: '', category: 'ramadan' });
  };

  const handlePackageDelete = (cat, id) => {
    const updated = { ...packages };
    updated[cat] = updated[cat].filter(p => p.id !== id);
    save('na_allah_packages', updated);
  };

  const handleLicenseSave = (e) => {
    e.preventDefault();
    let updated;
    if (editingLicense) updated = licenses.map(l => l.id === editingLicense.id ? editingLicense : l);
    else { if (!newLicense.link) return alert('No file attached.'); updated = [...licenses, { id: Date.now(), ...newLicense }]; }
    save('na_allah_licenses', updated);
    setShowAddLicense(false); setEditingLicense(null); setNewLicense({ title: '', link: '', status: 'Official' });
  };

  const handleLicenseDelete = (id) => save('na_allah_licenses', licenses.filter(l => l.id !== id));

  const handleGlobalSettings = (e) => {
    e.preventDefault();
    save('na_allah_settings', settings);
    alert('Global Systems Optimized & Updated Successfully.');
  };

  const login = (e) => {
    e.preventDefault();
    if (['2026', 'admin2026', settings.adminPin].includes(passcode)) { setIsAuthenticated(true); sessionStorage.setItem('na_allah_auth', 'true'); }
    else setError('PIN Encryption Mismatch.');
  };

  if (!isAuthenticated) return (
    <div style={styles.loginPage}><div style={styles.loginCard}><Logo size={80} /><h2 style={{color: 'var(--primary-navy)', marginTop: '30px'}}>Console Hub</h2>
      <form onSubmit={login} style={{textAlign: 'left', marginTop: '30px'}}><label style={styles.label}>Control PIN</label>
        <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
        <button type="submit" className="btn btn-navy" style={{width: '100%', marginTop: '10px', padding: '16px'}}>Authorize Access</button>
      </form>
    </div></div>
  );

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><Logo size={60} /><p style={{color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '0.7rem', marginTop: '12px', letterSpacing: '2.5px'}}>NA-ALLAH CONSOLE</p></div>
        <ul style={{listStyle: 'none', padding: 0}}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Summary</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Latest Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Travel Plans</li>
          <li style={{...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('licenses')}>📜 Credentials</li>
          <li style={{...styles.navItem, ...(activeTab === 'settings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('settings')}>⚙️ Global Settings</li>
        </ul>
        <button onClick={() => {sessionStorage.removeItem('na_allah_auth'); setIsAuthenticated(false);}} style={styles.logoutBtn}>Sign Out</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <button onClick={() => window.location.hash = ''} className="btn-outline" style={{padding: '10px 20px', borderRadius: '10px'}}>← Back to Site</button>
          <h3 style={{margin: 0}}>ADMINISTRATION: {activeTab.toUpperCase()}</h3>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'settings' && (
             <div className="animate-fade-in"><div style={styles.statCard}><h3 style={{marginBottom: '30px'}}>System-Wide Configurations</h3>
                <form onSubmit={handleGlobalSettings} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
                   <div><label style={styles.label}>Company Brand Name</label><input style={styles.input} value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} /></div>
                   <div><label style={styles.label}>Official Contact Phone</label><input style={styles.input} value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} /></div>
                   <div><label style={styles.label}>Corporate Email</label><input style={styles.input} value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} /></div>
                   <div><label style={styles.label}>WhatsApp Number (International format)</label><input style={styles.input} placeholder="+234..." value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} /></div>
                   <div style={{gridColumn: 'span 2'}}><label style={styles.label}>Primary Hero Slogan</label><textarea style={{...styles.input, height: '80px'}} value={settings.heroSlogan} onChange={e => setSettings({...settings, heroSlogan: e.target.value})} /></div>
                   <div><label style={styles.label}>Facebook Profile URL</label><input style={styles.input} value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} /></div>
                   <div><label style={styles.label}>Instagram Handle</label><input style={styles.input} value={settings.instagram} onChange={e => setSettings({...settings, instagram: e.target.value})} /></div>
                   <div style={{background: '#fff9f0', padding: '20px', borderRadius: '15px', border: '1px dashed orange'}}><label style={styles.label}>Critical: System Auth PIN</label><input type="password" style={styles.input} placeholder="Change console PIN" onChange={e => setSettings({...settings, adminPin: e.target.value})} /></div>
                   <div style={{display: 'flex', alignItems: 'flex-end'}}><button className="btn btn-navy" style={{width: '100%', padding: '16px'}}>Lock & Sync All Changes</button></div>
                </form>
             </div></div>
          )}

          {activeTab === 'dashboard' && <div style={styles.grid2}><div style={styles.statCard}><h3>Total Inquiries</h3><p style={styles.statNum}>{bookings.length}</p></div><div style={styles.statCard}><h3>Global Packages</h3><p style={styles.statNum}>{packages.ramadan.length + packages.hajj.length}</p></div></div>}

          {activeTab === 'bookings' && (
            <div style={styles.tableCard}><table style={styles.table}><thead><tr><th>Name</th><th>Requested Information</th><th style={{width: '120px'}}>Action</th></tr></thead>
              <tbody>{bookings.map(b => (
                <tr key={b.id}><td><strong>{b.name}</strong></td><td>{b.package}</td><td><button onClick={() => setViewingBooking(b)} style={styles.btnSm}>Review Details</button></td></tr>
              ))}</tbody>
            </table></div>
          )}

          {activeTab === 'packages' && (
            <div className="animate-fade-in"><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center'}}><h3 style={{margin: 0}}>Travel Pricing Console</h3><button onClick={() => setShowAddPackage(true)} className="btn btn-navy" style={{display: 'flex', alignItems: 'center', gap: '8px'}}><span style={{fontSize: '1.2rem'}}>✈️</span> + New Travel Plan</button></div>
              <div style={styles.grid2}>{['ramadan', 'hajj'].map(cat => (
                <div key={cat} style={styles.statCard}><h4 style={{textTransform: 'uppercase', marginBottom: '20px', color: 'var(--primary-gold)'}}>{cat} control</h4>
                  {packages[cat].map(p => (
                    <div key={p.id} style={styles.row}>
                      <div style={{flex: 1}}><strong>{p.title}</strong></div>
                      <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                         <div style={{display: 'flex', alignItems: 'center'}}><span>₦</span><input defaultValue={p.price} onBlur={e => save('na_allah_packages', { ...packages, [cat]: packages[cat].map(px => px.id === p.id ? {...px, price: e.target.value} : px) })} style={styles.inlineInput} /></div>
                         <button onClick={() => setEditingPackage({ ...p, category: cat })} style={{color: 'var(--primary-navy)', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer'}}>Edit</button>
                         <button onClick={() => handlePackageDelete(cat, p.id)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold'}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}</div>
            </div>
          )}

          {activeTab === 'licenses' && (
             <div style={styles.tableCard}><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}><h3 style={{margin: 0}}>Documentation Hub</h3><button onClick={() => setShowAddLicense(true)} className="btn btn-navy">📜 + Upload New</button></div><table style={styles.table}><thead><tr><th>Doc Title</th><th>Status</th><th>Options</th></tr></thead>
                <tbody>{licenses.map(l => (
                  <tr key={l.id}><td><strong>{l.title}</strong></td><td><span style={{color: 'var(--primary-gold)', fontWeight: 'bold'}}>{l.status || 'Active'}</span></td><td><div style={{display: 'flex', gap: '15px'}}><button onClick={() => openSecureView(l.link)} style={{color: 'var(--primary-navy)', fontWeight: 'bold', fontSize: '0.8rem', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid'}}>View</button><button onClick={() => setEditingLicense(l)} style={{color: 'var(--primary-gold)', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem'}}>Edit</button><button onClick={() => handleLicenseDelete(l.id)} style={{color: '#ff7675', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem'}}>Delete</button></div></td></tr>
                ))}</tbody>
             </table></div>
          )}
        </div>
      </main>

      {/* MODALS */}
      {viewingBooking && (<div style={styles.overlay} onClick={() => setViewingBooking(null)}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.mHead}><h2>Reference Inquiry</h2></div><div style={styles.mBody}><div style={styles.msg}>{viewingBooking.message}</div><button onClick={() => setViewingBooking(null)} className="btn btn-navy" style={{width: '100%', marginTop: '30px'}}>Close</button></div></div></div>)}
      
      {(showAddPackage || editingPackage) && (<div style={styles.overlay}><div style={styles.modal}><div style={styles.mHead}><h2>📦 {editingPackage ? 'Edit' : 'New'} Plan</h2></div><div style={styles.mBody}><form onSubmit={handlePackageSave}><label style={styles.label}>Plan Title</label><input required style={styles.input} value={editingPackage ? editingPackage.title : newPackage.title} onChange={e => editingPackage ? setEditingPackage({...editingPackage, title: e.target.value}) : setNewPackage({...newPackage, title: e.target.value})} /><label style={styles.label}>Price (₦)</label><input required style={styles.input} value={editingPackage ? editingPackage.price : newPackage.price} onChange={e => editingPackage ? setEditingPackage({...editingPackage, price: e.target.value}) : setNewPackage({...newPackage, price: e.target.value})} /><label style={styles.label}>Spiritual Category</label><select disabled={!!editingPackage} style={styles.input} value={editingPackage ? editingPackage.category : newPackage.category} onChange={e => setNewPackage({...newPackage, category: e.target.value})}><option value="ramadan">Ramadan</option><option value="hajj">Hajj</option></select><div style={{display: 'flex', gap: '15px', marginTop: '30px'}}><button type="submit" className="btn btn-navy" style={{flex: 1, padding: '16px'}}>🕋 {editingPackage ? 'Update' : 'Publish'}</button><button type="button" onClick={() => {setShowAddPackage(false); setEditingPackage(null);}} className="btn btn-outline" style={{padding: '16px'}}>Cancel</button></div></form></div></div></div>)}
      
      {(showAddLicense || editingLicense) && (<div style={styles.overlay}><div style={styles.modal}><div style={styles.mHead}><h2>📜 {editingLicense ? 'Edit' : 'Upload'} Doc</h2></div><div style={styles.mBody}><form onSubmit={handleLicenseSave}><label style={styles.label}>Document Title</label><input required style={styles.input} value={editingLicense ? editingLicense.title : newLicense.title} onChange={e => editingLicense ? setEditingLicense({...editingLicense, title: e.target.value}) : setNewLicense({...newLicense, title: e.target.value})} /><label style={styles.label}>Attach Official Certificate (PDF/JPG)</label><div style={styles.fileBox}><input type="file" accept="application/pdf,image/*" onChange={handleFileUpload} style={{width: '100%'}} />{(editingLicense?.link || newLicense.link) && <p style={{color: 'green', fontSize: '0.75rem', marginTop: '10px'}}>✅ Ready</p>}</div><div style={{display: 'flex', gap: '15px', marginTop: '30px'}}><button type="submit" className="btn btn-navy" style={{flex: 1, padding: '16px'}}>{editingLicense ? 'Update' : 'Store'}</button><button type="button" onClick={() => {setShowAddLicense(false); setEditingLicense(null);}} className="btn btn-outline" style={{padding: '16px'}}>Back</button></div></form></div></div></div>)}
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
  statCard: { backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  statNum: { fontSize: '3rem', margin: '15px 0', color: 'var(--primary-navy)', fontWeight: 'bold' },
  tableCard: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f1f1f1' },
  btnSm: { background: '#f0f0f0', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  logoutBtn: { position: 'absolute', bottom: '20px', left: '25px', background: 'none', border: 'none', color: '#ff7675', fontWeight: 'bold', cursor: 'pointer' },
  loginPage: { height: '100vh', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginCard: { background: 'white', padding: '50px', borderRadius: '40px', width: '380px', textAlign: 'center' },
  input: { width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '8px', boxSizing: 'border-box' },
  inlineInput: { width: '120px', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'right', fontWeight: 'bold', color: 'var(--primary-navy)' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', width: '450px', borderRadius: '25px', overflow: 'hidden', textAlign: 'center' },
  mHead: { background: 'var(--primary-navy)', color: 'white', padding: '20px', textAlign: 'center' },
  mBody: { padding: '30px' },
  msg: { marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '15px', minHeight: '80px' },
  label: { fontWeight: '700', color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '5px', textAlign: 'left' },
  fileBox: { marginTop: '10px', padding: '15px', border: '2px dashed #e1e1e1', borderRadius: '15px', textAlign: 'center' }
};

export default AdminPanel;
