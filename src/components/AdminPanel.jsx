import React, { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewingBooking, setViewingBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({ ramadan: [], hajj: [] });
  const [licenses, setLicenses] = useState([
    { id: 1, title: 'Corporate Affairs Commission (CAC)', link: '#', status: 'Official' },
    { id: 2, title: 'NAHCON License 2026', link: '#', status: 'Active' },
    { id: 3, title: 'IATA Accredited Agency', link: '#', status: 'Verified' }
  ]);

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
    const handleSync = (e) => {
      if (['na_allah_bookings', 'na_allah_packages', 'na_allah_licenses'].includes(e.key)) loadData();
    };
    window.addEventListener('storage', handleSync);
    if (sessionStorage.getItem('na_allah_auth') === 'true') setIsAuthenticated(true);
    return () => window.removeEventListener('storage', handleSync);
  }, [loadData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (['2026', 'admin2026'].includes(passcode)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('na_allah_auth', 'true');
    } else setError('Access Denied.');
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem('na_allah_bookings', JSON.stringify(updated));
    setViewingBooking(null);
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
        <div style={styles.sidebarHeader}><Logo size={80} showText={false} /><p style={{color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '0.7rem', marginTop: '10px'}}>ADMIN CONSOLE</p></div>
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
          <button onClick={() => window.location.hash = ''} style={styles.backBtn}>← Back to Site</button>
          <h3 style={{margin: 0}}>NA-ALLAH CONTROL CONSOLE</h3>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <div style={styles.statsGrid}>
                <div style={styles.statCard}><h3>Total Inquiries</h3><p style={{fontSize: '3rem', margin: '10px 0'}}>{bookings.length}</p></div>
                <div style={styles.statCard}><h3>Certifications</h3><p style={{fontSize: '3rem', margin: '10px 0'}}>{licenses.length}</p></div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Package</th><th style={styles.th}>Status</th><th style={styles.th}>Action</th></tr></thead>
                  <tbody>{bookings.map(b => (
                    <tr key={b.id}>
                      <td style={styles.td}><strong>{b.name}</strong></td>
                      <td style={styles.td}>{b.package}</td>
                      <td style={styles.td}>{b.status}</td>
                      <td style={styles.td}><button onClick={() => setViewingBooking(b)} style={styles.viewBtn}>View</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL VIEW */}
      {viewingBooking && (
        <div style={styles.modalOverlay} onClick={() => setViewingBooking(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
             <div style={styles.modalHeader}><h2>Inquiry Details</h2><button onClick={() => setViewingBooking(null)} style={{background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer'}}>✕</button></div>
             <div style={styles.modalBody}>
                <p><strong>Customer:</strong> {viewingBooking.name}</p>
                <p><strong>Email:</strong> {viewingBooking.email}</p>
                <p><strong>Phone:</strong> {viewingBooking.phone}</p>
                <div style={styles.msgBox}>{viewingBooking.message}</div>
                <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                  <button onClick={() => handleUpdateStatus(viewingBooking.id, 'Confirmed')} className="btn btn-navy" style={{flex: 1, padding: '15px'}}>Mark Confirmed</button>
                  <button onClick={() => setViewingBooking(null)} className="btn btn-outline" style={{borderColor: '#ccc', color: '#666'}}>Close</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  adminContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' },
  sidebar: { width: '260px', backgroundColor: 'var(--primary-navy)', color: 'white', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { padding: '40px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  nav: { listStyle: 'none', padding: 0, margin: 0 },
  navItem: { padding: '20px 30px', cursor: 'pointer', opacity: 0.6, fontWeight: '700' },
  activeNavItem: { backgroundColor: 'rgba(212, 175, 55, 0.15)', borderLeft: '6px solid var(--primary-gold)', opacity: 1, color: 'var(--primary-gold)' },
  mainContent: { flex: 1 },
  topbar: { backgroundColor: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #e2e8f0' },
  contentArea: { padding: '40px' },
  backBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer' },
  statsGrid: { display: 'flex', gap: '30px' },
  statCard: { flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '20px', backgroundColor: '#f8fafc', fontSize: '0.8rem', textTransform: 'uppercase' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
  viewBtn: { background: '#f1f5f9', padding: '8px 18px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' },
  loginPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-navy)' },
  loginCard: { backgroundColor: 'white', padding: '50px', borderRadius: '40px', textAlign: 'center', width: '90%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '10px', boxSizing: 'border-box' },
  label: { fontWeight: '700', color: '#64748b' },
  logoutBtn: { marginTop: 'auto', background: 'none', color: '#ff4d4d', border: 'none', padding: '30px', cursor: 'pointer', fontWeight: 'bold' },
  guestBtn: { background: 'none', border: 'none', marginTop: '20px', cursor: 'pointer', color: '#64748b' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', z : 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: 'white', width: '90%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden' },
  modalHeader: { backgroundColor: 'var(--primary-navy)', color: 'white', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalBody: { padding: '35px' },
  msgBox: { marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', minHeight: '100px' }
};

export default AdminPanel;
