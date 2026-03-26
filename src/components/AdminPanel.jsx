import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
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
    // Check if previously authenticated in this session
    const sessionAuth = sessionStorage.getItem('na_allah_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    const savedBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [
      { id: 1, name: 'Ibrahim Musa', package: 'VIP Hajj', status: 'Pending', date: '2026-03-24' },
      { id: 2, name: 'Aisha Bello', package: 'Standard Ramadan', status: 'Confirmed', date: '2026-03-25' }
    ];
    const savedPackages = JSON.parse(localStorage.getItem('na_allah_packages'));
    const savedSettings = JSON.parse(localStorage.getItem('na_allah_settings'));

    setBookings(savedBookings);
    if (savedPackages) setPackages(savedPackages);
    if (savedSettings) setSettings(savedSettings);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default passcode set to 2026
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
  };

  // Login Screen
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
              <input 
                type="password" 
                placeholder="Enter passcode" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={styles.input}
                autoFocus
              />
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
          <li style={{...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('bookings')}>📝 Manage Inquiries</li>
          <li style={{...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('packages')}>📦 Travel Packages</li>
          <li style={{...styles.navItem, ...(activeTab === 'settings' ? styles.activeNavItem : {})}} onClick={() => setActiveTab('settings')}>⚙️ Site Settings</li>
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
                <div style={styles.statCard}>
                  <h3>Active Packages</h3>
                  <p style={styles.statNumber}>{packages.ramadan.length + packages.hajj.length}</p>
                </div>
                <div style={styles.statCard}>
                  <h3>Pending Bookings</h3>
                  <p style={styles.statNumber}>{bookings.filter(b => b.status === 'Pending').length}</p>
                </div>
                <div style={styles.statCard}>
                  <h3>Estimated Revenue (2026)</h3>
                  <p style={styles.statNumber}>₦42.5M</p>
                </div>
              </div>
              
              <div style={styles.recentSection}>
                <h3>System Notice</h3>
                <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#fffbeb', borderRadius: '12px', borderLeft: '6px solid #d4af37'}}>
                   <strong>Notice:</strong> Your changes are automatically synced to the local database and visible on the website landing page instantly.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <h3>Inquiry Tracking</h3>
                <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{bookings.length} inquiries found</span>
              </div>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Customer</th>
                      <th style={styles.th}>Requested Package</th>
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
                        <td style={styles.td}>
                           <span style={b.status === 'Pending' ? styles.statusPending : styles.statusConfirmed}>
                             {b.status}
                           </span>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => handleUpdateStatus(b.id, b.status === 'Pending' ? 'Confirmed' : 'Pending')} style={styles.actionBtn}>
                             {b.status === 'Pending' ? 'Confirm' : 'Set Pending'}
                          </button>
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
            <div className="animate-fade-in">
              <h3>Live Pricing Control</h3>
              <p style={{marginBottom: '30px', opacity: 0.7}}>Update prices instantly across the website landing page.</p>
              
              <div style={styles.packageEditorGrid}>
                {/* Ramadan Section */}
                <div style={styles.editorCard}>
                   <h4 style={{marginBottom: '20px', color: 'var(--primary-gold)'}}>🌙 Ramadan 2026</h4>
                   {packages.ramadan.map(p => (
                     <div key={p.id} style={styles.itemRow}>
                        <span>{p.title}</span>
                        <div style={{display: 'flex', gap: '10px'}}>
                          <span>₦</span>
                          <input 
                            type="text" 
                            defaultValue={p.price} 
                            onBlur={(e) => handleUpdatePrice('ramadan', p.id, e.target.value)}
                            style={styles.inlineInput} 
                          />
                        </div>
                     </div>
                   ))}
                </div>

                {/* Hajj Section */}
                <div style={styles.editorCard}>
                   <h4 style={{marginBottom: '20px', color: 'var(--primary-gold)'}}>🕋 Hajj 2026</h4>
                   {packages.hajj.map(p => (
                     <div key={p.id} style={styles.itemRow}>
                        <span>{p.title}</span>
                        <div style={{display: 'flex', gap: '10px'}}>
                          <span>₦</span>
                          <input 
                            type="text" 
                            defaultValue={p.price} 
                            onBlur={(e) => handleUpdatePrice('hajj', p.id, e.target.value)}
                            style={styles.inlineInput} 
                          />
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in" style={{maxWidth: '600px'}}>
              <h3>Global Site Settings</h3>
              <div style={{marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Company Name</label>
                  <input value={settings.companyName} onChange={(e) => handleUpdateSettings('companyName', e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contact Phone Number</label>
                  <input value={settings.contactPhone} onChange={(e) => handleUpdateSettings('contactPhone', e.target.value)} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Support Email Address</label>
                  <input value={settings.contactEmail} onChange={(e) => handleUpdateSettings('contactEmail', e.target.value)} style={styles.input} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  loginPage: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--primary-navy)',
    fontFamily: '"Outfit", sans-serif'
  },
  loginCard: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '450px',
    padding: '50px',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    textAlign: 'center'
  },
  loginHeader: {
    marginBottom: '30px'
  },
  loginIcon: {
    fontSize: '3rem',
    marginBottom: '15px'
  },
  loginForm: {
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--primary-navy)'
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box'
  },
  loginError: {
    color: 'red',
    fontSize: '0.85rem',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  guestBtn: {
    marginTop: '15px',
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  logoutBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#ff4d4d',
    border: '1px solid rgba(255,77,77,0.3)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  adminContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: '"Outfit", sans-serif'
  },
  sidebar: {
    width: '300px',
    backgroundColor: 'var(--primary-navy)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeader: {
    padding: '40px 30px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  nav: {
    listStyle: 'none',
    padding: '20px 0'
  },
  navItem: {
    padding: '18px 30px',
    cursor: 'pointer',
    opacity: 0.7,
    fontWeight: '500',
    transition: '0.3s'
  },
  activeNavItem: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderLeft: '5px solid var(--primary-gold)',
    opacity: 1,
    color: 'var(--primary-gold)'
  },
  mainContent: {
    flex: 1
  },
  topbar: {
    backgroundColor: 'white',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    borderBottom: '1px solid #e2e8f0'
  },
  contentArea: {
    padding: '40px'
  },
  backButtonTop: {
    background: '#f1f5f9',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'var(--primary-navy)',
    marginTop: '10px'
  },
  packageEditorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  },
  editorCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '24px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  inlineInput: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '6px 12px',
    width: '140px',
    textAlign: 'right'
  },
  tableWrapper: {
    backgroundColor: 'white',
    borderRadius: '24px',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '20px',
    backgroundColor: '#f8fafc',
    color: '#64748b'
  },
  td: {
    padding: '20px',
    borderBottom: '1px solid #f1f5f9'
  },
  statusPending: {
    backgroundColor: '#fffbeb',
    color: '#d97706',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  statusConfirmed: {
    backgroundColor: '#ecfdf5',
    color: '#059669',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  actionBtn: {
    background: '#f1f5f9',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '8px'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: 'var(--primary-gold)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
};

export default AdminPanel;
