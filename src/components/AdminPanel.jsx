import React, { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState([]);
  const [licenses, setLicenses] = useState([
    { id: 1, title: 'Corporate Affairs Commission (CAC)', link: '#', status: 'Official' },
    { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Active' },
    { id: 3, title: 'IATA Accredited Agency', link: '#', status: 'Verified' }
  ]);
  const [packages, setPackages] = useState({ ramadan: [], hajj: [] });

  const loadData = useCallback(() => {
    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages')) || { ramadan: [], hajj: [] };
    const savedLicenses = JSON.parse(localStorage.getItem('na_allah_licenses'));

    setBookings(savedBookings);
    setPackages(savedPackages);
    if (savedLicenses) setLicenses(savedLicenses);
  }, []);

  useEffect(() => {
    loadData();
    const handleStorageSync = (e) => {
      if (['na_allah_bookings', 'na_allah_packages', 'na_allah_licenses'].includes(e.key)) loadData();
    };
    window.addEventListener('storage', handleStorageSync);
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, [loadData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (['2026', 'admin2026'].includes(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
    } else setError('Invalid Passcode.');
  };

  const logout = () => {
    sessionStorage.removeItem('na_allah_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <Logo size={100} showText={false} />
          <h2 style={{marginTop: '20px', color: 'var(--primary-navy)'}}>Admin Access</h2>
          <form onSubmit={handleLogin} style={{textAlign: 'left', marginTop: '30px'}}>
            <label style={styles.label}>Control Passcode</label>
            <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
            {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
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
        <div style={styles.sidebarHeader}>
           <Logo size={80} showText={false} />
           <p style={{fontSize: '0.65rem', color: 'var(--primary-gold)', marginTop: '10px', fontWeight: 'bold'}}>ADMIN PORTAL</p>
        </div>
        <ul style={styles.nav}>
          <li style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Packages</li>
          <li style={{...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('licenses')}>📜 Certificates</li>
        </ul>
        <button onClick={logout} style={styles.logoutBtn}>Sign Out</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <button onClick={() => window.location.hash = ''} style={styles.backBtn}>← Back to Website</button>
          <h3>NA-ALLAH CONTROL CONSOLE</h3>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'dashboard' && (
             <div className="animate-fade-in">
                <div style={styles.statsGrid}>
                   <div style={styles.statCard}><h3>Inquiries Total</h3><p style={{fontSize: '3rem', margin: 0}}>{bookings.length}</p></div>
                   <div style={styles.statCard}><h3>Certificates</h3><p style={{fontSize: '3rem', margin: 0}}>{licenses.length}</p></div>
                </div>
                <div style={{marginTop: '40px', padding: '30px', backgroundColor: '#fff', borderRadius: '24px'}}>
                   <h3 style={{marginBottom: '15px'}}>System Status</h3>
                   <p>Database connected. Cross-tab synchronization active.</p>
                   <button onClick={loadData} className="btn btn-navy" style={{padding: '10px 20px', fontSize: '0.8rem'}}>🔄 Refresh Database</button>
                </div>
             </div>
          )}

          {activeTab === 'bookings' && (
             <div style={styles.tableWrapper}>
                <table style={styles.table}>
                   <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Package</th><th style={styles.th}>Status</th></tr></thead>
                   <tbody>{bookings.map(b => (
                     <tr key={b.id}>
                       <td style={styles.td}>{b.name}</td>
                       <td style={styles.td}>{b.package}</td>
                       <td style={styles.td}>{b.status}</td>
                     </tr>
                   ))}</tbody>
                </table>
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
  sidebarHeader: { padding: '40px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  nav: { listStyle: 'none', padding: 0, margin: 0 },
  navItem: { padding: '18px 25px', cursor: 'pointer', opacity: 0.6, fontWeight: '700' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.15)', borderLeft: '6px solid var(--primary-gold)', opacity: 1, color: 'var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  contentArea: { padding: '40px' },
  backBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', fontSize: '0.8rem', textTransform: 'uppercase' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  statsGrid: { display: 'flex', gap: '30px' },
  statCard: { flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a1f3d' },
  loginCard: { backgroundColor: 'white', padding: '50px', borderRadius: '40px', textAlign: 'center', width: '90%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '10px', boxSizing: 'border-box' },
  label: { fontWeight: '700', color: '#64748b' },
  logoutBtn: { marginTop: 'auto', background: 'none', color: '#ff4d4d', border: 'none', padding: '30px', cursor: 'pointer', fontWeight: 'bold' },
  guestBtn: { background: 'none', border: 'none', marginTop: '20px', cursor: 'pointer', color: '#64748b' }
};

export default AdminPanel;
