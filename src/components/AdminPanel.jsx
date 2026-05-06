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
  const [showAddService, setShowAddService] = useState(false);
  
  const [editingLicense, setEditingLicense] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [editingService, setEditingService] = useState(null);

  // GLOBAL SETTINGS STATE
  const [settings, setSettings] = useState({
     companyName: 'Na-Allah Travels and Tours',
     phone: '0803 474 7257',
     email: 'info@naallahtravels.com',
     supportEmail: 'support@naallahtravels.com',
     salesEmail: 'sales@naallahtravels.com',
     address: 'No 12, Babangwari, Kano.',
     heroSlogan: 'Experience the Ultimate Spiritual Journey with Luxury & Comfort.',
     whatsapp: '2348034747257',
     facebook: 'naallahtravels',
     instagram: 'naallahtravels',
     twitter: 'naallahtravels',
     adminPin: '2026'
  });

  const [newPackage, setNewPackage] = useState({ title: '', price: '', category: 'ramadan' });
  const [newLicense, setNewLicense] = useState({ title: '', link: '', status: 'Official' });
  const [newService, setNewService] = useState({ title: '', icon: '✈️', desc: '' });
  
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({ ramadan: [], hajj: [] });
  const [licenses, setLicenses] = useState([]);
  const [services, setServices] = useState([]);

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
       { id: 2, title: 'IATA Approved Agency', link: '#', status: 'Verified' }
    ];
    const sv = JSON.parse(localStorage.getItem('na_allah_services')) || [
       { id: 1, title: 'Flight Bookings', icon: '✈️', desc: 'Premium flight reservations for all sacred routes.' },
       { id: 2, title: 'Hajj & Umrah Tours', icon: '🕌', desc: 'Expertly guided spiritual journeys with local scholars.' },
       { id: 3, title: 'Visa Processing', icon: '🛂', desc: 'Swift and reliable visa assistance for Saudi Arabia.' }
    ];
    setSettings(s);
    setBookings(b);
    setPackages(p);
    setLicenses(l);
    setServices(sv);
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

  // HANDLERS
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

  const handleServiceSave = (e) => {
    e.preventDefault();
    let updated;
    if (editingService) updated = services.map(s => s.id === editingService.id ? editingService : s);
    else updated = [...services, { id: Date.now(), ...newService }];
    save('na_allah_services', updated);
    setShowAddService(false); setEditingService(null); setNewService({ title: '', icon: '✈️', desc: '' });
  };

  const handleLicenseSave = (e) => {
    e.preventDefault();
    let updated;
    if (editingLicense) updated = licenses.map(l => l.id === editingLicense.id ? editingLicense : l);
    else { if (!newLicense.link) return alert('No file attached.'); updated = [...licenses, { id: Date.now(), ...newLicense }]; }
    save('na_allah_licenses', updated);
    setShowAddLicense(false); setEditingLicense(null); setNewLicense({ title: '', link: '', status: 'Official' });
  };

  const handleGlobalSync = (e) => {
    e.preventDefault();
    save('na_allah_settings', settings);
    alert('Global Systems Synced. Branding and contact details updated across the site.');
  };

  const login = (e) => {
    e.preventDefault();
    if (['2026', settings.adminPin].includes(passcode)) { setIsAuthenticated(true); sessionStorage.setItem('na_allah_auth', 'true'); }
    else setError('PIN Encryption Error.');
  };

  if (!isAuthenticated) return (
    <div style={{...styles.loginPage, position: 'relative', overflow: 'hidden'}}>
      {/* 3D background elements */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        <div style={{...styles.blurBlob, top: '20%', right: '15%', background: 'rgba(212, 175, 55, 0.25)'}}></div>
        <div style={{...styles.blurBlob, bottom: '10%', left: '15%', background: 'rgba(255, 255, 255, 0.1)', animationDelay: '-5s'}}></div>
      </div>
      <div style={{...styles.loginCard, position: 'relative', zIndex: 1}} className="animate-fade-in-up glass-panel">
        <Logo size={80} />
        <h2 style={{color: 'var(--primary-navy)', marginTop: '30px'}}>Admin Console</h2>
        <form onSubmit={login} style={{textAlign: 'left', marginTop: '30px'}}>
          <label style={styles.label}>Control PIN</label>
          <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
          {error && <p style={{color: 'red', fontSize: '0.8rem', marginTop: '10px'}}>{error}</p>}
          <button type="submit" className="btn btn-navy hover-lift" style={{width: '100%', marginTop: '15px', padding: '16px'}}>Login</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><Logo size={60} /><p style={{color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '0.7rem', marginTop: '12px', letterSpacing: '2.5px'}}>NA-ALLAH CONSOLE</p></div>
        <ul style={{listStyle: 'none', padding: 0}}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Summary</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Travel Plans</li>
          <li style={{...styles.navItem, ...(activeTab === 'services' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('services')}>🛠️ Core Services</li>
          <li style={{...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('licenses')}>📜 Credentials</li>
          <li style={{...styles.navItem, ...(activeTab === 'settings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('settings')}>⚙️ Global Control</li>
        </ul>
        <button onClick={() => {sessionStorage.removeItem('na_allah_auth'); setIsAuthenticated(false);}} style={styles.logoutBtn}>Sign Out</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <button onClick={() => window.location.hash = ''} className="btn-outline" style={{padding: '10px 20px', borderRadius: '10px'}}>← Back to Live Site</button>
          <h3 style={{margin: 0}}>{activeTab.toUpperCase()} OVERVIEW</h3>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'settings' && (
             <div className="animate-fade-in"><div style={styles.statCard}><h3 style={{marginBottom: '30px', color: 'var(--primary-gold)'}}>Site-Wide Authority Control</h3>
                 <form onSubmit={handleGlobalSync} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
                   <div><label style={styles.label}>Agency Name</label><input style={styles.input} value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} /></div>
                   <div><label style={styles.label}>Official Hotline</label><input style={styles.input} value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} /></div>
                   
                   <div><label style={styles.label}>Corporate Email</label><input style={styles.input} value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} /></div>
                   <div><label style={styles.label}>Support Email</label><input style={styles.input} value={settings.supportEmail || ''} onChange={e => setSettings({...settings, supportEmail: e.target.value})} /></div>
                   
                   <div><label style={styles.label}>Sales Email</label><input style={styles.input} value={settings.salesEmail || ''} onChange={e => setSettings({...settings, salesEmail: e.target.value})} /></div>
                   <div><label style={styles.label}>Official Address</label><input style={styles.input} value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} /></div>
                   
                   <div><label style={styles.label}>WhatsApp Link ID/Number</label><input style={styles.input} value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} /></div>
                   <div><label style={styles.label}>Facebook Link/Username</label><input style={styles.input} value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} /></div>
                   
                   <div><label style={styles.label}>Instagram Link/Username</label><input style={styles.input} value={settings.instagram} onChange={e => setSettings({...settings, instagram: e.target.value})} /></div>
                   <div><label style={styles.label}>Twitter Link/Username</label><input style={styles.input} value={settings.twitter || ''} onChange={e => setSettings({...settings, twitter: e.target.value})} /></div>

                   <div style={{gridColumn: 'span 2'}}><label style={styles.label}>Hero Attraction Slogan</label><textarea style={{...styles.input, height: '80px'}} value={settings.heroSlogan} onChange={e => setSettings({...settings, heroSlogan: e.target.value})} /></div>
                   <div style={{gridColumn: 'span 2'}}><label style={styles.label}>Registration PIN (Secure Access)</label><input type="password" style={{...styles.input, border: '1px solid orange'}} placeholder="Modify Admin PIN" onChange={e => setSettings({...settings, adminPin: e.target.value})} /></div>
                   <div style={{gridColumn: 'span 2'}}><button className="btn btn-navy" style={{width: '100%', padding: '18px', fontWeight: 'bold'}}>SYNC SITE CONTENT</button></div>
                </form>
             </div></div>
          )}

          {activeTab === 'services' && (
             <div className="animate-fade-in"><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}><h3 style={{margin: 0}}>Service Management</h3><button onClick={() => setShowAddService(true)} className="btn btn-navy">📦 + New Service</button></div>
                <div style={styles.grid2}>{services.map(s => (
                   <div key={s.id} style={styles.statCard}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                         <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}><span style={{fontSize: '2rem'}}>{s.icon}</span><strong>{s.title}</strong></div>
                         <div>
                            <button onClick={() => setEditingService(s)} style={{color: 'var(--primary-navy)', marginRight: '15px', fontWeight: 'bold', border: 'none', background: 'none'}}>Edit</button>
                            <button onClick={() => save('na_allah_services', services.filter(svx => svx.id !== s.id))} style={{color: 'red', fontWeight: 'bold', border: 'none', background: 'none'}}>✕</button>
                         </div>
                      </div>
                      <p style={{marginTop: '10px', color: '#666', fontSize: '0.85rem'}}>{s.desc}</p>
                   </div>
                ))}</div>
             </div>
          )}

          {activeTab === 'dashboard' && <div style={styles.grid2}><div style={styles.statCard}><h3>Inquiries</h3><p style={styles.statNum}>{bookings.length}</p></div><div style={styles.statCard}><h3>Travel Plans</h3><p style={styles.statNum}>{packages.ramadan.length + packages.hajj.length}</p></div></div>}

          {activeTab === 'bookings' && (
            <div style={styles.tableCard}><table style={styles.table}><thead><tr><th>Visitor</th><th>Inquiry</th><th style={{width: '120px'}}>Control</th></tr></thead>
              <tbody>{bookings.map(b => (
                <tr key={b.id}><td><strong>{b.name}</strong></td><td>{b.package}</td><td><button onClick={() => setViewingBooking(b)} style={styles.btnSm}>Review</button></td></tr>
              ))}</tbody>
            </table></div>
          )}

          {activeTab === 'packages' && (
            <div className="animate-fade-in"><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center'}}><h3 style={{margin: 0}}>Travel Package Console</h3><button onClick={() => setShowAddPackage(true)} className="btn btn-navy">✈️ + New Draft</button></div>
              <div style={styles.grid2}>{['ramadan', 'hajj'].map(cat => (
                <div key={cat} style={styles.statCard}><h4 style={{textTransform: 'uppercase', marginBottom: '20px', color: 'var(--primary-gold)'}}>{cat} control</h4>
                  {packages[cat].map(p => (
                    <div key={p.id} style={styles.row}>
                      <div style={{flex: 1}}><strong>{p.title}</strong></div>
                      <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                         <div style={{display: 'flex', alignItems: 'center'}}><span>₦</span><input defaultValue={p.price} onBlur={e => save('na_allah_packages', { ...packages, [cat]: packages[cat].map(px => px.id === p.id ? {...px, price: e.target.value} : px) })} style={styles.inlineInput} /></div>
                         <button onClick={() => setEditingPackage({ ...p, category: cat })} style={{color: 'var(--primary-navy)', fontWeight: 'bold', cursor: 'pointer', border: 'none', background: 'none'}}>Edit</button>
                         <button onClick={() => save('na_allah_packages', { ...packages, [cat]: packages[cat].filter(px => px.id !== p.id) })} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold'}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}</div>
            </div>
          )}

          {activeTab === 'licenses' && (
             <div style={styles.tableCard}><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}><h3 style={{margin: 0}}>Trust Center Hub</h3><button onClick={() => setShowAddLicense(true)} className="btn btn-navy">📜 + Add Credential</button></div><table style={styles.table}><thead><tr><th>Doc Title</th><th>Status</th><th>Options</th></tr></thead>
                <tbody>{licenses.map(l => (
                  <tr key={l.id}><td><strong>{l.title}</strong></td><td><span style={{color: 'var(--primary-gold)', fontWeight: 'bold'}}>{l.status || 'Verified'}</span></td><td><div style={{display: 'flex', gap: '15px'}}><button onClick={() => openSecureView(l.link)} style={{color: 'var(--primary-navy)', fontWeight: 'bold', fontSize: '0.8rem', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid'}}>View</button><button onClick={() => setEditingLicense(l)} style={{color: 'var(--primary-gold)', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem'}}>Edit</button><button onClick={() => save('na_allah_licenses', licenses.filter(lx => lx.id !== l.id))} style={{color: '#ff7675', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem'}}>Delete</button></div></td></tr>
                ))}</tbody>
             </table></div>
          )}
        </div>
      </main>

      {/* MODALS */}
      {(showAddService || editingService) && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.mHead}><h2>📦 {editingService ? 'Edit' : 'New'} Service</h2></div>
            <div style={styles.mBody}>
              <form onSubmit={handleServiceSave}>
                <label style={styles.label}>Service Title</label>
                <input required style={styles.input} value={editingService ? editingService.title : newService.title} onChange={e => editingService ? setEditingService({...editingService, title: e.target.value}) : setNewService({...newService, title: e.target.value})} />
                
                <label style={styles.label}>Icon Emoji</label>
                <input required style={{...styles.input, marginBottom: '10px'}} value={editingService ? editingService.icon : newService.icon} onChange={e => editingService ? setEditingService({...editingService, icon: e.target.value}) : setNewService({...newService, icon: e.target.value})} />
                
                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0'}}>
                  {['✈️', '🕋', '🕌', '🛂', '🧳', '🏨', '🚌', '🍽️', '📜', '🌍', '🤝', '📅', '🛡️', '💎'].map(emoji => (
                    <span 
                      key={emoji} 
                      onClick={() => editingService ? setEditingService({...editingService, icon: emoji}) : setNewService({...newService, icon: emoji})}
                      style={{cursor: 'pointer', fontSize: '1.5rem', transition: 'transform 0.2s', padding: '5px', borderRadius: '5px'}}
                      onMouseOver={e => e.target.style.transform = 'scale(1.2)'}
                      onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>

                <label style={styles.label}>Brief Description</label>
                <textarea required style={{...styles.input, height: '80px'}} value={editingService ? editingService.desc : newService.desc} onChange={e => editingService ? setEditingService({...editingService, desc: e.target.value}) : setNewService({...newService, desc: e.target.value})} />
                
                <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                  <button type="submit" className="btn btn-navy hover-lift" style={{flex: 1, padding: '16px'}}>{editingService ? 'Update' : 'Launch'}</button>
                  <button type="button" onClick={() => {setShowAddService(false); setEditingService(null);}} className="btn btn-outline hover-lift" style={{padding: '16px'}}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {viewingBooking && (<div style={styles.overlay} onClick={() => setViewingBooking(null)}><div style={styles.modal} onClick={e => e.stopPropagation()}><div style={styles.mHead}><h2>Private Inquiry Detail</h2></div><div style={styles.mBody}><div style={styles.msg}>{viewingBooking.message}</div><button onClick={() => setViewingBooking(null)} className="btn btn-navy" style={{width: '100%', marginTop: '30px'}}>Noted</button></div></div></div>)}
      
      {(showAddPackage || editingPackage) && (<div style={styles.overlay}><div style={styles.modal}><div style={styles.mHead}><h2>📦 {editingPackage ? 'Edit' : 'New'} Plan</h2></div><div style={styles.mBody}><form onSubmit={handlePackageSave}><label style={styles.label}>Plan Title</label><input required style={styles.input} value={editingPackage ? editingPackage.title : newPackage.title} onChange={e => editingPackage ? setEditingPackage({...editingPackage, title: e.target.value}) : setNewPackage({...newPackage, title: e.target.value})} /><label style={styles.label}>Price (₦)</label><input required style={styles.input} value={editingPackage ? editingPackage.price : newPackage.price} onChange={e => editingPackage ? setEditingPackage({...editingPackage, price: e.target.value}) : setNewPackage({...newPackage, price: e.target.value})} /><label style={styles.label}>Spiritual Category</label><select disabled={!!editingPackage} style={styles.input} value={editingPackage ? editingPackage.category : newPackage.category} onChange={e => setNewPackage({...newPackage, category: e.target.value})}><option value="ramadan">Ramadan</option><option value="hajj">Hajj</option></select><div style={{display: 'flex', gap: '15px', marginTop: '30px'}}><button type="submit" className="btn btn-navy" style={{flex: 1, padding: '16px'}}>🕋 {editingPackage ? 'Update' : 'Publish'}</button><button type="button" onClick={() => {setShowAddPackage(false); setEditingPackage(null);}} className="btn btn-outline" style={{padding: '16px'}}>Cancel</button></div></form></div></div></div>)}
      {(showAddLicense || editingLicense) && (<div style={styles.overlay}><div style={styles.modal}><div style={styles.mHead}><h2>📜 {editingLicense ? 'Edit' : 'Upload'} Doc</h2></div><div style={styles.mBody}><form onSubmit={handleLicenseSave}><label style={styles.label}>Document Title</label><input required style={styles.input} value={editingLicense ? editingLicense.title : newLicense.title} onChange={e => editingLicense ? setEditingLicense({...editingLicense, title: e.target.value}) : setNewLicense({...newLicense, title: e.target.value})} /><label style={styles.label}>Attach Official Certificate (PDF/JPG)</label><div style={styles.fileBox}><input type="file" accept="application/pdf,image/*" onChange={handleFileUpload} style={{width: '100%'}} />{(editingLicense?.link || newLicense.link) && <p style={{color: 'green', fontSize: '0.75rem', marginTop: '10px'}}>✅ Registered</p>}</div><div style={{display: 'flex', gap: '15px', marginTop: '30px'}}><button type="submit" className="btn btn-navy" style={{flex: 1, padding: '16px'}}>{editingLicense ? 'Update' : 'Store'}</button><button type="button" onClick={() => {setShowAddLicense(false); setEditingLicense(null);}} className="btn btn-outline" style={{padding: '16px'}}>Cancel</button></div></form></div></div></div>)}
    </div>
  );
}

const styles = {
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: 'var(--off-white)', backgroundImage: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.05), transparent 40%)' },
  sidebar: { width: '280px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)', boxShadow: '4px 0 24px rgba(0,0,0,0.02)' },
  sidebarHeader: { padding: '40px 30px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  navItem: { padding: '18px 30px', cursor: 'pointer', opacity: 0.6, fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.5px', transition: 'all 0.3s' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary-gold)', opacity: 1, borderRight: '4px solid var(--primary-gold)' },
  mainContent: { flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' },
  topbar: { background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', borderBottom: '1px solid var(--border-dark)', position: 'sticky', top: 0, zIndex: 10 },
  contentArea: { padding: '50px', maxWidth: '1200px', margin: '0 auto', width: '100%' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' },
  statCard: { backgroundColor: 'white', padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-dark)', transition: 'transform 0.3s, box-shadow 0.3s' },
  statNum: { fontSize: '4rem', margin: '15px 0', color: 'var(--primary-navy)', fontWeight: '900', lineHeight: 1 },
  tableCard: { backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '30px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-dark)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f1f5f9' },
  btnSm: { background: 'var(--off-white)', border: '1px solid var(--border-dark)', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', transition: 'all 0.3s', color: 'var(--primary-navy)' },
  logoutBtn: { margin: 'auto 30px 30px 30px', padding: '15px', background: 'rgba(255, 118, 117, 0.1)', border: '1px solid rgba(255, 118, 117, 0.3)', color: '#ff7675', fontWeight: 'bold', cursor: 'pointer', borderRadius: '12px', transition: 'all 0.3s' },
  loginPage: { height: '100vh', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 60%)' },
  loginCard: { background: 'rgba(255, 255, 255, 0.95)', padding: '60px', borderRadius: 'var(--radius-lg)', width: '420px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '8px', boxSizing: 'border-box', fontSize: '1rem', transition: 'border-color 0.3s', outline: 'none' },
  inlineInput: { width: '120px', padding: '10px 15px', border: '1px solid #e2e8f0', borderRadius: '10px', textAlign: 'right', fontWeight: '800', color: 'var(--primary-navy)', background: 'var(--off-white)' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 16, 36, 0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', width: '500px', borderRadius: 'var(--radius-lg)', maxHeight: '90vh', overflowY: 'auto', textAlign: 'center', boxShadow: 'var(--shadow-lg)' },
  mHead: { background: 'var(--primary-navy)', color: 'white', padding: '25px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 2 },
  mBody: { padding: '30px' },
  msg: { marginTop: '20px', padding: '25px', background: 'var(--off-white)', borderRadius: '15px', minHeight: '100px', border: '1px solid var(--border-dark)', textAlign: 'left', lineHeight: '1.6' },
  label: { fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '5px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '1px' },
  fileBox: { marginTop: '10px', padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '15px', textAlign: 'center', background: 'var(--off-white)', cursor: 'pointer' },
  blurBlob: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatElement 20s ease-in-out infinite' }
};

export default AdminPanel;
