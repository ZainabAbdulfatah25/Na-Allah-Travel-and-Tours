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
  const [packages, setPackages] = useState({ ramadan: [], hajj: [] });
  const [licenses, setLicenses] = useState([
    { id: 1, title: 'Corporate Affairs Commission (CAC)', link: '#', status: 'Verified' },
    { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Active' },
    { id: 3, title: 'IATA Certification', link: '#', status: 'Pending' }
  ]);
  const [settings, setSettings] = useState({
    companyName: 'Na-Allah Travels & Tours Ltd.',
    contactPhone: '08034747257',
    contactEmail: 'naallahtravels@gmail.com'
  });

  const loadData = useCallback(() => {
    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages')) || { ramadan: [], hajj: [] };
    const savedSettings = JSON.parse(localStorage.getItem('na_allah_settings')) || settings;
    const savedLicenses = JSON.parse(localStorage.getItem('na_allah_licenses'));

    setBookings(savedBookings);
    setPackages(savedPackages);
    setSettings(savedSettings);
    if (savedLicenses) setLicenses(savedLicenses);
  }, []);

  useEffect(() => {
    loadData();
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
  }, [loadData]);

  const saveLicenses = (updated) => {
    setLicenses(updated);
    localStorage.setItem('na_allah_licenses', JSON.stringify(updated));
  };

  const handleAddLicense = () => {
    const title = prompt("Enter License / Certification Title (e.g. IATA 2026):");
    const link = prompt("Enter Document Link (URL to PDF/Image):");
    if (title && link) {
      const updated = [...licenses, { id: Date.now(), title, link, status: 'Recent' }];
      saveLicenses(updated);
    }
  };

  const handleDeleteLicense = (id) => {
    const updated = licenses.filter(l => l.id !== id);
    saveLicenses(updated);
  };

  const handleLogin = (e) => {
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
          <form onSubmit={handleLogin} style={{textAlign: 'left', marginTop: '30px'}}>
            <label style={styles.label}>Control Passcode</label>
            <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit" className="btn btn-navy" style={{width: '100%', padding: '15px'}}>Continue</button>
            <button type="button" onClick={() => window.location.hash = ''} style={styles.guestBtn}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.adminContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><Logo size={80} showText={false} /></div>
        <ul style={styles.nav}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Dash</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Packages</li>
          <li style={{...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('licenses')}>📜 Certificates</li>
        </ul>
        <button onClick={() => {sessionStorage.removeItem('na_allah_auth'); setIsAuthenticated(false);}} style={styles.logoutBtn}>Sign Out</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <button onClick={() => window.location.hash = ''} style={styles.backBtn}>← Back Site</button>
          <h3>ADMIN PORTAL - {activeTab.toUpperCase()}</h3>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'licenses' && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                 <h3>Company Licenses & Certifications</h3>
                 <button onClick={handleAddLicense} style={styles.addBtn}>+ Add Credential</button>
              </div>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Title / Document</th><th style={styles.th}>Status</th><th style={styles.th}>Action</th></tr></thead>
                  <tbody>{licenses.map(l => (
                    <tr key={l.id}>
                      <td style={styles.td}><strong>{l.title}</strong><br/><a href={l.link} target="_blank" style={{fontSize: '0.8rem'}}>View File</a></td>
                      <td style={styles.td}><span style={styles.badge}>{l.status}</span></td>
                      <td style={styles.td}><button onClick={() => handleDeleteLicense(l.id)} style={{color: 'red', border: 'none', cursor: 'pointer'}}>Delete</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
             <div style={styles.tableWrapper}><table style={styles.table}>
                 <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Package</th><th style={styles.th}>Date</th></tr></thead>
                 <tbody>{bookings.map(b => (
                    <tr key={b.id}>
                      <td style={styles.td}>{b.name}</td>
                      <td style={styles.td}>{b.package}</td>
                      <td style={styles.td}>{b.date}</td>
                    </tr>
                 ))}</tbody>
             </table></div>
          )}

          {activeTab === 'dashboard' && (
             <div style={styles.statsGrid}>
                <div style={styles.statCard}><h3>Total Inquiries</h3><p style={{fontSize: '3rem', margin: 0}}>{bookings.length}</p></div>
                <div style={styles.statCard}><h3>Certifications</h3><p style={{fontSize: '3rem', margin: 0}}>{licenses.length}</p></div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' },
  sidebar: { width: '260px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px', textAlign: 'center' },
  nav: { listStyle: 'none', padding: 0, margin: 0 },
  navItem: { padding: '20px 30px', cursor: 'pointer', opacity: 0.6, fontWeight: '700' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.15)', borderLeft: '6px solid var(--primary-gold)', opacity: 1 },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  contentArea: { padding: '40px' },
  backBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer' },
  addBtn: { background: 'var(--primary-navy)', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', cursor: 'pointer' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', fontSize: '0.8rem', textTransform: 'uppercase' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  badge: { backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' },
  statsGrid: { display: 'flex', gap: '30px' },
  statCard: { flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '24px' },
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b' },
  loginCard: { backgroundColor: 'white', padding: '50px', borderRadius: '40px', textAlign: 'center', width: '90%', maxWidth: '400px' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '10px', boxSizing: 'border-box' },
  label: { fontWeight: '700', color: '#64748b' },
  logoutBtn: { marginTop: 'auto', background: 'none', color: '#ff4d4d', border: 'none', padding: '30px', cursor: 'pointer' },
  guestBtn: { background: 'none', border: 'none', marginTop: '20px', cursor: 'pointer', color: '#64748b' }
};

export default AdminPanel;
