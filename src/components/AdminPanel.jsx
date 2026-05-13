import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import Logo from './Logo';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [masterPin, setMasterPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const [viewingBooking, setViewingBooking] = useState(null);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showAddLicense, setShowAddLicense] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [pinPopup, setPinPopup] = useState(null);
  const [newPersonalPin, setNewPersonalPin] = useState('');

  const [editingLicense, setEditingLicense] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingDestination, setEditingDestination] = useState(null);

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

  const [isProcessing, setIsProcessing] = useState(false);

  const [newPackage, setNewPackage] = useState({ title: '', price: '', category: 'ramadan' });
  const [newLicense, setNewLicense] = useState({ title: '', link: '', status: 'Verified Member' });
  const [newService, setNewService] = useState({ title: '', icon: '✈️', desc: '' });
  const [newDestination, setNewDestination] = useState({ name: '', val: '' });
  const [newAdminData, setNewAdminData] = useState({ email: '', pin: '' });

  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState({ ramadan: [], hajj: [] });
  const [licenses, setLicenses] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [services, setServices] = useState([]);
  const [admins, setAdmins] = useState([]);

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
    const dst = JSON.parse(localStorage.getItem('na_allah_destinations')) || [
      { id: 1, name: 'Mecca (Hajj/Umrah)', val: 'mecca' },
      { id: 2, name: 'Medina', val: 'medina' }
    ];
    const sv = JSON.parse(localStorage.getItem('na_allah_services')) || [
      { id: 1, title: 'Flight Bookings', icon: '✈️', desc: 'Premium flight reservations for all sacred routes.' },
      { id: 2, title: 'Hajj & Umrah Tours', icon: '🕌', desc: 'Expertly guided spiritual journeys with local scholars.' },
      { id: 3, title: 'Visa Processing', icon: '🛂', desc: 'Swift and reliable visa assistance for Saudi Arabia.' }
    ];
    const ad = JSON.parse(localStorage.getItem('na_allah_admins')) || [
      { id: 1, email: 'admin@naallahtravels.com', pin: '2026', role: 'Super Admin', date: new Date().toISOString().split('T')[0] }
    ];
    setSettings(s);
    setBookings(b);
    setPackages(p);
    setLicenses(l);
    setDestinations(dst);
    setServices(sv);
    setAdmins(ad);

    // Sync with Cloud (Supabase)
    const fetchCloudData = async () => {
      try {
        const { data: bookingsData, error: bErr } = await supabase.from('na_allah_bookings').select('*').order('id', { ascending: false });
        if (!bErr) {
          const cloudBookings = bookingsData || [];
          const localBookings = JSON.parse(localStorage.getItem('na_allah_bookings')) || [];

          // Merge local bookings that failed to upload
          const cloudIds = new Set(cloudBookings.map(b => b.id));
          const unsyncedBookings = localBookings.filter(b => !cloudIds.has(b.id));

          if (unsyncedBookings.length > 0) {
            try {
              await supabase.from('na_allah_bookings').insert(unsyncedBookings);
            } catch (err) { console.error("Error syncing local bookings:", err); }
          }

          const combinedBookings = [...unsyncedBookings, ...cloudBookings].sort((a, b) => b.id - a.id);
          setBookings(combinedBookings);
          localStorage.setItem('na_allah_bookings', JSON.stringify(combinedBookings));
        }

        const { data: adminsData, error: aErr } = await supabase.from('na_allah_admins').select('*').order('id', { ascending: true });
        if (adminsData && !aErr && adminsData.length > 0) {
          setAdmins(adminsData);
          localStorage.setItem('na_allah_admins', JSON.stringify(adminsData));
        }

        const tables = [
          { name: 'na_allah_services', setter: setServices },
          { name: 'na_allah_destinations', setter: setDestinations },
          { name: 'na_allah_licenses', setter: setLicenses }
        ];

        for (const t of tables) {
          const { data } = await supabase.from(t.name).select('*').order('id', { ascending: true });
          if (data && data.length > 0) {
            t.setter(data);
            localStorage.setItem(t.name, JSON.stringify(data));
          }
        }

        const { data: pkgData } = await supabase.from('na_allah_packages').select('*').order('id', { ascending: true });
        if (pkgData && pkgData.length > 0) {
          const pObj = { ramadan: [], hajj: [] };
          pkgData.forEach(p => { if (p.category === 'ramadan') pObj.ramadan.push(p); else if (p.category === 'hajj') pObj.hajj.push(p); });
          setPackages(pObj);
          localStorage.setItem('na_allah_packages', JSON.stringify(pObj));
        }

      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    };
    fetchCloudData();

  }, []);

  useEffect(() => {
    loadData();
    const handleSync = (e) => { if (e.key && e.key.startsWith('na_allah_')) loadData(); };
    window.addEventListener('storage', handleSync);
    if (sessionStorage.getItem('na_allah_auth') === 'true') {
      setIsAuthenticated(true);
      setCurrentUser(sessionStorage.getItem('na_allah_user') || 'admin@naallahtravels.com');
    }
    return () => window.removeEventListener('storage', handleSync);
  }, [loadData]);

  const save = async (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    loadData();

    try {
      if (key === 'na_allah_services' || key === 'na_allah_destinations' || key === 'na_allah_licenses') {
        const table = key;
        const ids = data.map(d => d.id);
        if (ids.length > 0) {
          await supabase.from(table).delete().not('id', 'in', `(${ids.join(',')})`);
          await supabase.from(table).upsert(data);
        } else {
          await supabase.from(table).delete().neq('id', 0);
        }
      } else if (key === 'na_allah_packages') {
        const flatPackages = [...(data.ramadan || []).map(p => ({ ...p, category: 'ramadan' })), ...(data.hajj || []).map(p => ({ ...p, category: 'hajj' }))];
        const ids = flatPackages.map(p => p.id);
        if (ids.length > 0) {
          await supabase.from('na_allah_packages').delete().not('id', 'in', `(${ids.join(',')})`);
          await supabase.from('na_allah_packages').upsert(flatPackages);
        } else {
          await supabase.from('na_allah_packages').delete().neq('id', 0);
        }
      }
    } catch (err) { console.error('Supabase sync error', err); }
  };

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
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set worker for pdf.js
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
       const result = event.target.result;
       let thumbnail = result;

       // If it's a PDF, generate a thumbnail
       if (file.type === 'application/pdf') {
         thumbnail = await generateThumbnailFromPdf(result);
       }

       if (editingLicense) setEditingLicense({...editingLicense, link: result, thumbnail: thumbnail});
       else setNewLicense({...newLicense, link: result, thumbnail: thumbnail});
    };
    reader.readAsDataURL(file);
  };

  const generateThumbnailFromPdf = async (dataUri) => {
    try {
      let pdfLib = window.pdfjsLib;
      if (!pdfLib) {
        await new Promise(resolve => {
          const check = setInterval(() => {
            if (window.pdfjsLib) { clearInterval(check); resolve(); }
          }, 100);
        });
        pdfLib = window.pdfjsLib;
      }
      pdfLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

      const pdf = await pdfLib.getDocument({ data: atob(dataUri.split(',')[1]) }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5, rotation: page.rotate });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch (err) {
      console.error('PDF Thumbnail Error:', err);
      return dataUri;
    }
  };

  const handleRegenerateThumbnail = async (license) => {
    if (!license.link) return alert('No file link found to regenerate from.');
    
    setIsProcessing(true);
    console.log(`[Admin] Regenerating preview for: ${license.title}`);
    
    try {
      const isPdf = license.link.includes('pdf') || license.link.startsWith('data:application/pdf');
      let thumbnail = null;
      
      if (isPdf) {
        thumbnail = await generateThumbnailFromPdf(license.link);
      } else {
        // If it's an image, just use the link as thumbnail
        thumbnail = license.link;
      }
      
      if (thumbnail) {
        const updated = licenses.map(l => l.id === license.id ? { ...l, thumbnail } : l);
        setLicenses(updated);
        await save('na_allah_licenses', updated);
        if (editingLicense && editingLicense.id === license.id) {
          setEditingLicense({ ...editingLicense, thumbnail });
        }
        console.log(`[Admin] Successfully regenerated preview for: ${license.title}`);
      }
    } catch (err) {
      console.error('[Admin] Regeneration failed:', err);
      alert('Failed to regenerate preview. Please check console for details.');
    } finally {
      setIsProcessing(false);
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
    setShowAddLicense(false); setEditingLicense(null); setNewLicense({ title: '', link: '', thumbnail: '', status: 'Verified Member' });
  };

  const handleDestinationSave = (e) => {
    e.preventDefault();
    let updated;
    if (editingDestination) updated = destinations.map(d => d.id === editingDestination.id ? editingDestination : d);
    else updated = [...destinations, { id: Date.now(), ...newDestination }];
    save('na_allah_destinations', updated);
    setShowAddDestination(false); setEditingDestination(null); setNewDestination({ name: '', val: '' });
  };

  const handleGlobalSync = (e) => {
    e.preventDefault();
    save('na_allah_settings', settings);
    alert('Global Systems Synced. Branding and contact details updated across the site.');
  };

  const handleAdminCreate = async (e) => {
    e.preventDefault();
    if (newAdminData.pin.length < 4) return alert('PIN must be at least 4 digits');
    if (admins.some(a => a.email === newAdminData.email)) return alert('An admin with this email already exists.');

    const newAdmin = { id: Date.now(), email: newAdminData.email, pin: newAdminData.pin, role: 'Admin', date: new Date().toISOString().split('T')[0] };

    // Cloud sync
    try {
      const { error } = await supabase.from('na_allah_admins').insert([newAdmin]);
      if (error) console.error('Error syncing admin to Supabase:', error);
    } catch (err) {
      console.error(err);
    }

    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    save('na_allah_admins', updatedAdmins);

    setShowAddAdmin(false);
    setNewAdminData({ email: '', pin: '' });
    alert(`Admin account successfully created for ${newAdminData.email}!`);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (authMode === 'signin') {
      setIsLoading(true);
      let user = admins.find(a => a.email === email && a.pin === passcode);

      try {
        const { data, error } = await supabase.from('na_allah_admins').select('*').eq('email', email).eq('pin', passcode).single();
        if (data && !error) user = data;
      } catch (err) { console.error('Supabase auth error:', err); }

      if (user || (['2026', settings.adminPin].includes(passcode) && email === 'admin@naallahtravels.com')) {
        setTimeout(() => {
          setIsAuthenticated(true);
          setCurrentUser(email);
          sessionStorage.setItem('na_allah_auth', 'true');
          sessionStorage.setItem('na_allah_user', email);
          setIsLoading(false);
        }, 1000);
      }
      else { setError('Invalid Email or PIN Error.'); setIsLoading(false); }
    } else if (authMode === 'forgot') {
      if (!email) { setError('Email is required'); return; }
      if (passcode.length < 4) { setError('New PIN must be at least 4 digits'); return; }

      const userIndex = admins.findIndex(a => a.email === email);
      if (userIndex !== -1) {
        setIsLoading(true);
        setTimeout(async () => {
          const updatedAdmins = [...admins];
          updatedAdmins[userIndex].pin = passcode;
          setAdmins(updatedAdmins);
          save('na_allah_admins', updatedAdmins);

          try { await supabase.from('na_allah_admins').update({ pin: passcode }).eq('email', email); } catch (err) { }

          setAuthMode('signin');
          setPasscode('');
          setError('PIN Reset Successful! Please login with your new PIN.');
          setIsLoading(false);
        }, 1000);
      } else if (email === 'admin@naallahtravels.com') {
        setIsLoading(true);
        setTimeout(() => {
          setSettings({ ...settings, adminPin: passcode });
          save('na_allah_settings', { ...settings, adminPin: passcode });
          setAuthMode('signin');
          setPasscode('');
          setError('Super Admin PIN Reset Successful! Please login.');
          setIsLoading(false);
        }, 1000);
      } else {
        setError('Email not found in our records.');
      }
    } else {
      if (!email) { setError('Email is required'); return; }
      if (!['2026', settings.adminPin].includes(masterPin)) {
        setError('Unauthorized: Valid Master PIN required.');
        return;
      }
      if (passcode.length < 4) { setError('New PIN must be at least 4 digits'); return; }

      setIsLoading(true);
      setTimeout(() => {
        const newAdmin = { id: Date.now(), email, pin: passcode, role: 'Admin', date: new Date().toISOString().split('T')[0] };
        const updatedAdmins = [...admins, newAdmin];
        setAdmins(updatedAdmins);
        save('na_allah_admins', updatedAdmins);
        setAuthMode('signin');
        setPasscode('');
        setError('Account created successfully! Please log in.');
        setIsLoading(false);
      }, 1500);
    }
  };

  const generatePin = () => {
    if (!email) {
      setError('Please enter your admin email first to receive the PIN.');
      return;
    }
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPasscode(randomPin);

    setPinPopup({ email, pin: randomPin });
    setError(`New PIN generated successfully!`);
  };

  const handleChangeMyPin = async (e) => {
    e.preventDefault();
    if (newPersonalPin.length < 4) return alert('PIN must be at least 4 digits');

    if (currentUser === 'admin@naallahtravels.com') {
      setSettings({ ...settings, adminPin: newPersonalPin });
      save('na_allah_settings', { ...settings, adminPin: newPersonalPin });
    } else {
      const userIndex = admins.findIndex(a => a.email === currentUser);
      if (userIndex !== -1) {
        const updatedAdmins = [...admins];
        updatedAdmins[userIndex].pin = newPersonalPin;
        setAdmins(updatedAdmins);
        save('na_allah_admins', updatedAdmins);
        try { await supabase.from('na_allah_admins').update({ pin: newPersonalPin }).eq('email', currentUser); } catch (err) { }
      }
    }
    alert('Personal PIN updated successfully!');
    setShowChangePin(false);
    setNewPersonalPin('');
  };

  if (!isAuthenticated) return (
    <div style={{ ...styles.loginPage, position: 'relative', overflow: 'hidden' }}>
      {/* 3D background elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ ...styles.blurBlob, top: '20%', right: '15%', background: 'rgba(212, 175, 55, 0.25)' }}></div>
        <div style={{ ...styles.blurBlob, bottom: '10%', left: '15%', background: 'rgba(255, 255, 255, 0.1)', animationDelay: '-5s' }}></div>
      </div>
      <div style={{ ...styles.loginCard, position: 'relative', zIndex: 1 }} className="animate-fade-in-up glass-panel">
        <Logo size={80} />
        <h3 style={{ color: 'var(--primary-navy)', marginTop: '20px', fontSize: '1.8rem', letterSpacing: '-0.5px' }}>Admin Console</h3>

        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
          <button type="button" onClick={() => { setAuthMode('signin'); setError(''); }} style={{ ...styles.tabBtn, ...(authMode === 'signin' ? styles.activeTabBtn : {}) }}>Sign In</button>
          <button type="button" onClick={() => { setAuthMode('signup'); setError(''); }} style={{ ...styles.tabBtn, ...(authMode === 'signup' ? styles.activeTabBtn : {}) }}>Sign Up</button>
        </div>

        <form onSubmit={handleAuth} style={{ textAlign: 'left', marginTop: '20px' }}>
          <label style={styles.label}>Admin Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...styles.input, marginBottom: '15px' }} placeholder="admin@naallahtravels.com" />

          {authMode === 'signup' && (
            <>
              <label style={styles.label}>Master PIN (Authorization)</label>
              <input type="password" value={masterPin} onChange={e => setMasterPin(e.target.value)} style={{ ...styles.input, marginBottom: '15px' }} placeholder="Enter current HQ PIN" />
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <label style={styles.label}>{authMode === 'signin' ? 'Control PIN' : 'New Control PIN'}</label>
            {authMode === 'signup' && (
              <button type="button" onClick={generatePin} style={{ color: 'var(--primary-gold)', border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', paddingBottom: '5px' }}>Auto-Generate</button>
            )}
            {authMode === 'signin' && (
              <button type="button" onClick={() => { setAuthMode('forgot'); setError(''); }} style={{ color: 'var(--primary-navy)', border: 'none', background: 'none', fontSize: '0.75rem', cursor: 'pointer', paddingBottom: '5px', fontWeight: 'bold' }}>Forgot PIN?</button>
            )}
            {authMode === 'forgot' && (
              <button type="button" onClick={() => { setAuthMode('signin'); setError(''); }} style={{ color: 'var(--text-muted)', border: 'none', background: 'none', fontSize: '0.75rem', cursor: 'pointer', paddingBottom: '5px' }}>Back to Login</button>
            )}
          </div>
          <input type={authMode === 'signin' ? "password" : "text"} value={passcode} onChange={e => setPasscode(e.target.value)} style={styles.input} placeholder="****" autoFocus />
          {error && <p style={{ color: error.includes('Successful') || error.includes('securely') ? '#27ae60' : 'red', fontSize: '0.8rem', marginTop: '10px' }}>{error}</p>}
          <button type="submit" disabled={isLoading} className="btn btn-navy hover-lift" style={{ width: '100%', marginTop: '15px', padding: '16px', opacity: isLoading ? 0.8 : 1, transition: 'all 0.3s' }}>
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <span className="spinner" style={styles.spinner}></span> Processing...
              </span>
            ) : (
              authMode === 'signin' ? 'Login' : authMode === 'forgot' ? 'Reset PIN' : 'Create Admin Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={styles.adminContainer} className="mobile-stack">
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}><Logo size={60} /><p style={{ color: 'var(--primary-gold)', fontWeight: 'bold', fontSize: '0.7rem', marginTop: '12px', letterSpacing: '2.5px' }}>NA-ALLAH CONSOLE</p></div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ ...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('dashboard')}>📊 Summary</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'bookings' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('bookings')}>📝 Inquiries</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'packages' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('packages')}>📦 Travel Plans</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'destinations' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('destinations')}>🌍 Destinations</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'services' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('services')}>🛠️ Core Services</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'licenses' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('licenses')}>📜 Credentials</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'users' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('users')}>👥 Team Access</li>
          <li style={{ ...styles.navItem, ...(activeTab === 'settings' ? styles.activeNavItem : {}) }} onClick={() => setActiveTab('settings')}>⚙️ Global Control</li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setShowChangePin(true)} style={{ ...styles.logoutBtn, background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary-gold)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '10px', padding: '12px' }}>Change My PIN</button>
          <button onClick={() => { sessionStorage.removeItem('na_allah_auth'); sessionStorage.removeItem('na_allah_user'); setIsAuthenticated(false); }} style={styles.logoutBtn}>Sign Out</button>
        </div>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topbar}>
          <h2 style={{ color: 'var(--primary-navy)', margin: 0 }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--primary-gold)' }}>Welcome, {currentUser.split('@')[0]}</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{currentUser.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <div style={styles.contentArea}>
          {activeTab === 'settings' && (
            <div className="animate-fade-in"><div style={styles.statCard}><h3 style={{ marginBottom: '30px', color: 'var(--primary-gold)' }}>Site-Wide Authority Control</h3>
              <form onSubmit={handleGlobalSync} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div><label style={styles.label}>Agency Name</label><input style={styles.input} value={settings.companyName} onChange={e => setSettings({ ...settings, companyName: e.target.value })} /></div>
                <div><label style={styles.label}>Official Hotline</label><input style={styles.input} value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} /></div>

                <div><label style={styles.label}>Corporate Email</label><input style={styles.input} value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} /></div>
                <div><label style={styles.label}>Support Email</label><input style={styles.input} value={settings.supportEmail || ''} onChange={e => setSettings({ ...settings, supportEmail: e.target.value })} /></div>

                <div><label style={styles.label}>Sales Email</label><input style={styles.input} value={settings.salesEmail || ''} onChange={e => setSettings({ ...settings, salesEmail: e.target.value })} /></div>
                <div><label style={styles.label}>Official Address</label><input style={styles.input} value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} /></div>

                <div><label style={styles.label}>WhatsApp Link ID/Number</label><input style={styles.input} value={settings.whatsapp} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} /></div>
                <div><label style={styles.label}>Facebook Link/Username</label><input style={styles.input} value={settings.facebook} onChange={e => setSettings({ ...settings, facebook: e.target.value })} /></div>

                <div><label style={styles.label}>Instagram Link/Username</label><input style={styles.input} value={settings.instagram} onChange={e => setSettings({ ...settings, instagram: e.target.value })} /></div>
                <div><label style={styles.label}>Twitter Link/Username</label><input style={styles.input} value={settings.twitter || ''} onChange={e => setSettings({ ...settings, twitter: e.target.value })} /></div>

                <div style={{ gridColumn: 'span 2' }}><label style={styles.label}>Hero Attraction Slogan</label><textarea style={{ ...styles.input, height: '80px' }} value={settings.heroSlogan} onChange={e => setSettings({ ...settings, heroSlogan: e.target.value })} /></div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <label style={styles.label}>Master PIN (HQ Authorization)</label>
                    <button type="button" onClick={() => setSettings({ ...settings, adminPin: Math.floor(1000 + Math.random() * 9000).toString() })} style={{ color: 'var(--primary-gold)', border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', paddingBottom: '5px' }}>Auto-Generate Master PIN</button>
                  </div>
                  <input type="text" value={settings.adminPin} style={{ ...styles.input, border: '2px solid var(--primary-gold)', fontWeight: 'bold', color: 'var(--primary-navy)' }} placeholder="Modify Master PIN" onChange={e => setSettings({ ...settings, adminPin: e.target.value })} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>This is the Master PIN required to authorize the creation of new admin accounts.</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}><button className="btn btn-navy hover-lift" style={{ width: '100%', padding: '18px', fontWeight: 'bold' }}>SYNC GLOBAL SETTINGS</button></div>
              </form>
            </div></div>
          )}

          {activeTab === 'services' && (
            <div className="animate-fade-in"><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}><h3 style={{ margin: 0 }}>Service Management</h3><button onClick={() => setShowAddService(true)} className="btn btn-navy">📦 + New Service</button></div>
              <div style={styles.grid2}>{services.map(s => (
                <div key={s.id} style={styles.statCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><span style={{ fontSize: '2rem' }}>{s.icon}</span><strong>{s.title}</strong></div>
                    <div>
                      <button onClick={() => setEditingService(s)} style={{ color: 'var(--primary-navy)', marginRight: '15px', fontWeight: 'bold', border: 'none', background: 'none' }}>Edit</button>
                      <button onClick={() => save('na_allah_services', services.filter(svx => svx.id !== s.id))} style={{ color: 'red', fontWeight: 'bold', border: 'none', background: 'none' }}>✕</button>
                    </div>
                  </div>
                  <p style={{ marginTop: '10px', color: '#666', fontSize: '0.85rem' }}>{s.desc}</p>
                </div>
              ))}</div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ ...styles.statCard, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('bookings')} className="hover-lift">
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Inquiries</h3><p style={{ ...styles.statNum, fontSize: '3rem' }}>{bookings.length}</p>
              </div>
              <div style={{ ...styles.statCard, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('packages')} className="hover-lift">
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Travel Plans</h3><p style={{ ...styles.statNum, fontSize: '3rem' }}>{packages.ramadan.length + packages.hajj.length}</p>
              </div>
              <div style={{ ...styles.statCard, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('destinations')} className="hover-lift">
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Destinations</h3><p style={{ ...styles.statNum, fontSize: '3rem' }}>{destinations.length}</p>
              </div>
              <div style={{ ...styles.statCard, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('services')} className="hover-lift">
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Core Services</h3><p style={{ ...styles.statNum, fontSize: '3rem' }}>{services.length}</p>
              </div>
              <div style={{ ...styles.statCard, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('licenses')} className="hover-lift">
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Credentials</h3><p style={{ ...styles.statNum, fontSize: '3rem' }}>{licenses.length}</p>
              </div>
              <div style={{ ...styles.statCard, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('users')} className="hover-lift">
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Team Access</h3><p style={{ ...styles.statNum, fontSize: '3rem' }}>{admins.length}</p>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div style={styles.tableCard}><table style={styles.table}>
              <thead><tr><th>Date</th><th>Visitor</th><th>Email</th><th>Inquiry</th><th>Status</th><th style={{ width: '120px' }}>Control</th></tr></thead>
              <tbody>{bookings.map(b => (
                <tr key={b.id}>
                  <td style={{ color: '#64748b' }}>{b.date || 'Today'}</td>
                  <td><strong>{b.name || 'Unknown'}</strong></td>
                  <td>{b.email || 'N/A'}</td>
                  <td>{b.package || 'General'}</td>
                  <td>
                    <select
                      value={b.status || 'Pending'}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        const updated = bookings.map(bx => bx.id === b.id ? { ...bx, status: newStatus } : bx);
                        setBookings(updated);
                        save('na_allah_bookings', updated);
                        try { await supabase.from('na_allah_bookings').update({ status: newStatus }).eq('id', b.id); } catch (err) { }
                      }}
                      style={{ padding: '5px', borderRadius: '5px', border: '1px solid #cbd5e1', outline: 'none', background: b.status === 'Confirmed' ? '#e6f4ea' : b.status === 'Paid' ? '#e8f0fe' : '#fff' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Paid">Paid</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td><button onClick={() => setViewingBooking(b)} style={styles.btnSm}>Review</button></td>
                </tr>
              ))}</tbody>
            </table></div>
          )}

          {activeTab === 'packages' && (
            <div className="animate-fade-in"><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}><h3 style={{ margin: 0 }}>Travel Package Console</h3><button onClick={() => setShowAddPackage(true)} className="btn btn-navy">✈️ + New Package</button></div>
              <div style={styles.grid2}>{['ramadan', 'hajj'].map(cat => (
                <div key={cat} style={styles.statCard}><h4 style={{ textTransform: 'uppercase', marginBottom: '20px', color: 'var(--primary-gold)' }}>{cat} control</h4>
                  {packages[cat].map(p => (
                    <div key={p.id} style={styles.row}>
                      <div style={{ flex: 1 }}><strong>{p.title}</strong></div>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}><span>₦</span><input defaultValue={p.price} onBlur={e => save('na_allah_packages', { ...packages, [cat]: packages[cat].map(px => px.id === p.id ? { ...px, price: e.target.value } : px) })} style={styles.inlineInput} /></div>
                        <button onClick={() => setEditingPackage({ ...p, category: cat })} style={{ color: 'var(--primary-navy)', fontWeight: 'bold', cursor: 'pointer', border: 'none', background: 'none' }}>Edit</button>
                        <button onClick={() => save('na_allah_packages', { ...packages, [cat]: packages[cat].filter(px => px.id !== p.id) })} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}</div>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Available Destinations</h3>
                <button onClick={() => setShowAddDestination(true)} className="btn btn-navy hover-lift">🌍 + New Destination</button>
              </div>
              <div style={styles.tableCard}>
                <table style={styles.table}>
                  <thead><tr><th>Destination Name</th><th>Value (System Code)</th><th style={{ width: '120px', textAlign: 'right' }}>Control</th></tr></thead>
                  <tbody>{destinations.map(d => (
                    <tr key={d.id}>
                      <td><strong>{d.name}</strong></td>
                      <td style={{ color: '#64748b' }}>{d.val}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button onClick={() => setEditingDestination(d)} style={{ color: 'var(--primary-navy)', marginRight: '15px', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => save('na_allah_destinations', destinations.filter(dx => dx.id !== d.id))} style={{ color: 'red', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'licenses' && (
            <div style={styles.tableCard}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><h3 style={{ margin: 0 }}>Trust Center Hub</h3><button onClick={() => setShowAddLicense(true)} className="btn btn-navy">📜 + Add Credential</button></div><table style={styles.table}><thead><tr><th>Preview</th><th>Doc Title</th><th>Status</th><th>Options</th></tr></thead>
              <tbody>{licenses.map(l => (
                <tr key={l.id}>
                  <td style={{ width: '80px', padding: '10px' }}>
                    <div style={{ width: '60px', height: '40px', borderRadius: '6px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {l.thumbnail || (l.link && !l.link.includes('pdf')) ? (
                        <img src={l.thumbnail || l.link} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} alt="Preview" />
                      ) : (
                        <span style={{ fontSize: '1.2rem' }}>📜</span>
                      )}
                    </div>
                  </td>
                  <td><strong>{l.title}</strong></td><td><span style={{ color: 'var(--primary-gold)', fontWeight: 'bold' }}>{l.status || 'Verified Member'}</span></td><td><div style={{ display: 'flex', gap: '15px' }}>
                    {(!l.thumbnail || l.thumbnail === '#') && l.link && l.link !== '#' && (
                      <button 
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleRegenerateThumbnail(l)} 
                        style={{ color: 'var(--primary-navy)', fontWeight: 'bold', fontSize: '0.8rem', border: 'none', background: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer', borderBottom: '1px solid', opacity: isProcessing ? 0.5 : 1 }}
                      >
                        {isProcessing ? 'Processing...' : 'Regen Preview'}
                      </button>
                    )}
                    <button type="button" onClick={() => openSecureView(l.link)} style={{ color: 'var(--primary-navy)', fontWeight: 'bold', fontSize: '0.8rem', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid' }}>View</button>
                    <button type="button" onClick={() => setEditingLicense(l)} style={{ color: 'var(--primary-gold)', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
                    <button type="button" onClick={() => save('na_allah_licenses', licenses.filter(lx => lx.id !== l.id))} style={{ color: '#ff7675', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                  </div></td></tr>
              ))}</tbody>
            </table></div>
          )}

          {activeTab === 'users' && (
            <div className="animate-fade-in"><div style={styles.tableCard}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><h3 style={{ margin: 0 }}>Admin Directory</h3><button onClick={() => setShowAddAdmin(true)} className="btn btn-navy">👥 + Create Admin</button></div><table style={styles.table}><thead><tr><th>Email</th><th>Role</th><th>Date Added</th><th>Options</th></tr></thead>
              <tbody>{admins.map(a => (
                <tr key={a.id}><td><strong>{a.email}</strong></td><td><span style={{ color: a.role === 'Super Admin' ? 'var(--primary-gold)' : 'var(--primary-navy)', fontWeight: 'bold', background: 'rgba(0,0,0,0.05)', padding: '5px 10px', borderRadius: '10px' }}>{a.role}</span></td><td>{a.date}</td><td>
                  {a.role !== 'Super Admin' && (
                    <button onClick={async () => {
                      const updated = admins.filter(ax => ax.id !== a.id);
                      setAdmins(updated);
                      save('na_allah_admins', updated);
                      try { await supabase.from('na_allah_admins').delete().eq('id', a.id); } catch (err) { }
                    }} style={{ color: '#ff7675', background: 'rgba(255,118,117,0.1)', border: '1px solid rgba(255,118,117,0.3)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem', padding: '8px 15px', borderRadius: '8px' }}>Revoke Access</button>
                  )}
                </td></tr>
              ))}</tbody>
            </table></div></div>
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
                <input required style={styles.input} value={editingService ? editingService.title : newService.title} onChange={e => editingService ? setEditingService({ ...editingService, title: e.target.value }) : setNewService({ ...newService, title: e.target.value })} />

                <label style={styles.label}>Icon Emoji</label>
                <input required style={{ ...styles.input, marginBottom: '10px' }} value={editingService ? editingService.icon : newService.icon} onChange={e => editingService ? setEditingService({ ...editingService, icon: e.target.value }) : setNewService({ ...newService, icon: e.target.value })} />

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                  {['✈️', '🕋', '🕌', '🛂', '🧳', '🏨', '🚌', '🍽️', '📜', '🌍', '🤝', '📅', '🛡️', '💎'].map(emoji => (
                    <span
                      key={emoji}
                      onClick={() => editingService ? setEditingService({ ...editingService, icon: emoji }) : setNewService({ ...newService, icon: emoji })}
                      style={{ cursor: 'pointer', fontSize: '1.5rem', transition: 'transform 0.2s', padding: '5px', borderRadius: '5px' }}
                      onMouseOver={e => e.target.style.transform = 'scale(1.2)'}
                      onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>

                <label style={styles.label}>Brief Description</label>
                <textarea required style={{ ...styles.input, height: '80px' }} value={editingService ? editingService.desc : newService.desc} onChange={e => editingService ? setEditingService({ ...editingService, desc: e.target.value }) : setNewService({ ...newService, desc: e.target.value })} />

                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                  <button type="submit" className="btn btn-navy hover-lift" style={{ flex: 1, padding: '16px' }}>{editingService ? 'Update' : 'Launch'}</button>
                  <button type="button" onClick={() => { setShowAddService(false); setEditingService(null); }} className="btn btn-outline hover-lift" style={{ padding: '16px' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {viewingBooking && (
        <div style={styles.overlay} onClick={() => setViewingBooking(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.mHead}><h2>Private Inquiry Detail</h2></div>
            <div style={styles.mBody}>

              <div style={{ textAlign: 'left', marginBottom: '20px', padding: '20px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }}>
                <p style={{ margin: '0 0 10px 0' }}><strong>👤 Name:</strong> {viewingBooking.name}</p>
                <p style={{ margin: '0 0 10px 0' }}><strong>📧 Email:</strong> {viewingBooking.email}</p>
                <p style={{ margin: '0 0 10px 0' }}><strong>📞 Phone:</strong> {viewingBooking.phone}</p>
                <p style={{ margin: '0 0 10px 0' }}><strong>🕋 Interest:</strong> {viewingBooking.package}</p>
                <p style={{ margin: '0' }}><strong>📊 Status:</strong> {viewingBooking.status || 'Pending'}</p>
              </div>

              <div style={{ ...styles.msg, background: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                <strong>Message:</strong><br /><br />
                {viewingBooking.message}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
                <a href={`mailto:${viewingBooking.email}`} className="btn btn-navy hover-lift" style={{ textDecoration: 'none', padding: '14px', display: 'block', textAlign: 'center' }}>✉️ Email</a>
                <a href={`tel:${viewingBooking.phone}`} className="btn btn-outline hover-lift" style={{ textDecoration: 'none', padding: '14px', color: 'var(--primary-navy)', borderColor: 'var(--primary-navy)', display: 'block', textAlign: 'center' }}>📞 Call</a>

                <button onClick={() => setViewingBooking(null)} className="btn btn-navy hover-lift" style={{ padding: '14px' }}>Close</button>
                <button onClick={() => {
                  if (window.confirm('Are you sure you want to delete this inquiry?')) {
                    const updated = bookings.filter(b => b.id !== viewingBooking.id);
                    setBookings(updated);
                    save('na_allah_bookings', updated);
                    setViewingBooking(null);
                  }
                }} className="btn btn-outline hover-lift" style={{ padding: '14px', color: '#e74c3c', borderColor: '#e74c3c' }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddAdmin && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.mHead}><h2>👥 Create New Admin</h2></div>
            <div style={styles.mBody}>
              <form onSubmit={handleAdminCreate} style={{ textAlign: 'left' }}>
                <label style={styles.label}>Admin Email</label>
                <input required type="email" style={{ ...styles.input, marginBottom: '20px' }} value={newAdminData.email} onChange={e => setNewAdminData({ ...newAdminData, email: e.target.value })} placeholder="new.admin@naallahtravels.com" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <label style={styles.label}>Control PIN</label>
                  <button type="button" onClick={() => {
                    const gen = Math.floor(1000 + Math.random() * 9000).toString();
                    setNewAdminData({ ...newAdminData, pin: gen });
                    setPinPopup({ email: newAdminData.email || 'New Admin', pin: gen });
                  }} style={{ color: 'var(--primary-gold)', border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', paddingBottom: '5px' }}>Auto-Generate</button>
                </div>
                <input required type="text" style={{ ...styles.input, marginBottom: '20px' }} value={newAdminData.pin} onChange={e => setNewAdminData({ ...newAdminData, pin: e.target.value })} placeholder="****" />

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-navy hover-lift" style={{ flex: 1, padding: '16px' }}>Authorize & Create</button>
                  <button type="button" onClick={() => { setShowAddAdmin(false); setNewAdminData({ email: '', pin: '' }); }} className="btn btn-outline hover-lift" style={{ padding: '16px' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {(showAddPackage || editingPackage) && (<div style={styles.overlay}><div style={styles.modal}><div style={styles.mHead}><h2>📦 {editingPackage ? 'Edit' : 'New'} Plan</h2></div><div style={styles.mBody}><form onSubmit={handlePackageSave}><label style={styles.label}>Plan Title</label><input required style={styles.input} value={editingPackage ? editingPackage.title : newPackage.title} onChange={e => editingPackage ? setEditingPackage({ ...editingPackage, title: e.target.value }) : setNewPackage({ ...newPackage, title: e.target.value })} /><label style={styles.label}>Price (₦)</label><input required style={styles.input} value={editingPackage ? editingPackage.price : newPackage.price} onChange={e => editingPackage ? setEditingPackage({ ...editingPackage, price: e.target.value }) : setNewPackage({ ...newPackage, price: e.target.value })} /><label style={styles.label}>Spiritual Category</label><select disabled={!!editingPackage} style={styles.input} value={editingPackage ? editingPackage.category : newPackage.category} onChange={e => setNewPackage({ ...newPackage, category: e.target.value })}><option value="ramadan">Ramadan</option><option value="hajj">Hajj</option></select><div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}><button type="submit" className="btn btn-navy" style={{ flex: 1, padding: '16px' }}>🕋 {editingPackage ? 'Update' : 'Publish'}</button><button type="button" onClick={() => { setShowAddPackage(false); setEditingPackage(null); }} className="btn btn-outline" style={{ padding: '16px' }}>Cancel</button></div></form></div></div></div>)}
      {(showAddLicense || editingLicense) && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.mHead}><h2>📜 {editingLicense ? 'Edit' : 'Upload'} Doc</h2></div>
            <div style={styles.mBody}>
              <form onSubmit={handleLicenseSave}>
                <label style={styles.label}>Document Title</label>
                <input required style={styles.input} value={editingLicense ? editingLicense.title : newLicense.title} onChange={e => editingLicense ? setEditingLicense({ ...editingLicense, title: e.target.value }) : setNewLicense({ ...newLicense, title: e.target.value })} />

                <label style={styles.label}>Credential Status</label>
                <select
                  style={{ ...styles.input, marginBottom: '20px' }}
                  value={editingLicense ? (editingLicense.status || 'Verified Member') : (newLicense.status || 'Verified Member')}
                  onChange={e => editingLicense ? setEditingLicense({ ...editingLicense, status: e.target.value }) : setNewLicense({ ...newLicense, status: e.target.value })}
                >
                  <option value="Verified Member">Verified Member</option>
                  <option value="Official">Official</option>
                  <option value="Registered">Registered</option>
                  <option value="Certified">Certified</option>
                </select>

                <label style={styles.label}>Attach Certificate (PDF/JPG)</label>
                <div style={styles.fileBox}>
                  <input type="file" accept="application/pdf,image/*" onChange={handleFileUpload} style={{ width: '100%', cursor: 'pointer' }} />
                  {(editingLicense?.thumbnail || newLicense.thumbnail) && (
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                      <p style={{ color: 'var(--primary-gold)', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>Preview Header</p>
                      <div style={{ width: '100%', height: '120px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <img 
                          src={editingLicense ? editingLicense.thumbnail : newLicense.thumbnail} 
                          style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'top' }} 
                          alt="Thumbnail preview"
                        />
                      </div>
                      <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <p style={{ color: 'green', fontSize: '0.75rem', fontWeight: 'bold' }}>✅ File Processed</p>
                        {editingLicense && editingLicense.link && editingLicense.link.includes('pdf') && (
                          <button type="button" onClick={() => handleRegenerateThumbnail(editingLicense)} style={{ fontSize: '0.7rem', color: 'var(--primary-navy)', border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Regenerate</button>
                        )}
                      </div>
                    </div>
                  )}
                  {(!editingLicense?.thumbnail && !newLicense.thumbnail && (editingLicense?.link || newLicense.link)) && (
                    <p style={{ color: 'green', fontSize: '0.75rem', marginTop: '10px', fontWeight: 'bold' }}>✅ File Attached (Generating Preview...)</p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '30px', paddingBottom: '20px' }}>
                  <button type="submit" className="btn btn-navy" style={{ flex: 1, padding: '16px' }}>{editingLicense ? 'Update' : 'Store'}</button>
                  <button type="button" onClick={() => { setShowAddLicense(false); setEditingLicense(null); }} className="btn btn-outline" style={{ padding: '16px' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {(showAddDestination || editingDestination) && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.mHead}><h2>🌍 {editingDestination ? 'Edit' : 'New'} Destination</h2></div>
            <div style={styles.mBody}>
              <form onSubmit={handleDestinationSave} style={{ textAlign: 'left' }}>
                <label style={styles.label}>Display Name (e.g. Mecca - Hajj)</label>
                <input required style={{ ...styles.input, marginBottom: '20px' }} value={editingDestination ? editingDestination.name : newDestination.name} onChange={e => editingDestination ? setEditingDestination({ ...editingDestination, name: e.target.value }) : setNewDestination({ ...newDestination, name: e.target.value })} />

                <label style={styles.label}>System Value (Lowercase, no spaces)</label>
                <input required style={{ ...styles.input, marginBottom: '20px' }} value={editingDestination ? editingDestination.val : newDestination.val} onChange={e => editingDestination ? setEditingDestination({ ...editingDestination, val: e.target.value.toLowerCase().replace(/\s+/g, '-') }) : setNewDestination({ ...newDestination, val: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. mecca" />

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-navy hover-lift" style={{ flex: 1, padding: '16px' }}>{editingDestination ? 'Update' : 'Add'}</button>
                  <button type="button" onClick={() => { setShowAddDestination(false); setEditingDestination(null); }} className="btn btn-outline hover-lift" style={{ padding: '16px' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {pinPopup && (
        <div style={styles.overlay} onClick={() => setPinPopup(null)}>
          <div style={{ ...styles.modal, maxWidth: '400px' }} onClick={e => e.stopPropagation()} className="animate-fade-in-up">
            <div style={styles.modalIcon}>🔑</div>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '10px' }}>PIN Generated!</h3>
            <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: '1.5', fontSize: '0.95rem' }}>
              A new secure PIN has been successfully generated for <strong>{pinPopup.email}</strong>.
            </p>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px dashed var(--primary-gold)' }}>
              <h1 style={{ margin: 0, color: 'var(--primary-gold)', fontSize: '3rem', letterSpacing: '5px' }}>{pinPopup.pin}</h1>
            </div>
            <p style={{ color: '#e74c3c', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '20px' }}>⚠️ Please copy this PIN now and share it securely. It will not be shown again.</p>
            <button onClick={() => setPinPopup(null)} className="btn btn-navy hover-lift" style={{ width: '100%', padding: '14px', borderRadius: '15px' }}>I have copied the PIN</button>
          </div>
        </div>
      )}

      {showChangePin && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.mHead}><h2>🔒 Change My PIN</h2></div>
            <div style={styles.mBody}>
              <form onSubmit={handleChangeMyPin} style={{ textAlign: 'left' }}>
                <label style={styles.label}>Logged in as</label>
                <input disabled type="text" style={{ ...styles.input, marginBottom: '20px', background: '#f8fafc', color: '#64748b' }} value={currentUser} />

                <label style={styles.label}>New Personal PIN</label>
                <input required type="text" style={{ ...styles.input, marginBottom: '20px' }} value={newPersonalPin} onChange={e => setNewPersonalPin(e.target.value)} placeholder="Enter 4+ digits" />

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-navy hover-lift" style={{ flex: 1, padding: '16px' }}>Update PIN</button>
                  <button type="button" onClick={() => { setShowChangePin(false); setNewPersonalPin(''); }} className="btn btn-outline hover-lift" style={{ padding: '16px' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
  loginPage: { minHeight: '100vh', padding: '20px', boxSizing: 'border-box', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 60%)' },
  loginCard: { background: 'rgba(255, 255, 255, 0.95)', padding: '40px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '8px', boxSizing: 'border-box', fontSize: '1rem', transition: 'border-color 0.3s', outline: 'none' },
  inlineInput: { width: '120px', padding: '10px 15px', border: '1px solid #e2e8f0', borderRadius: '10px', textAlign: 'right', fontWeight: '800', color: 'var(--primary-navy)', background: 'var(--off-white)' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 16, 36, 0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', width: '500px', borderRadius: 'var(--radius-lg)', maxHeight: '90vh', overflowY: 'auto', textAlign: 'center', boxShadow: 'var(--shadow-lg)' },
  mHead: { background: 'var(--primary-navy)', color: 'white', padding: '25px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 2 },
  mBody: { padding: '30px' },
  msg: { marginTop: '20px', padding: '25px', background: 'var(--off-white)', borderRadius: '15px', minHeight: '100px', border: '1px solid var(--border-dark)', textAlign: 'left', lineHeight: '1.6' },
  label: { fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '5px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '1px' },
  fileBox: { marginTop: '10px', padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '15px', textAlign: 'center', background: 'var(--off-white)', cursor: 'pointer' },
  blurBlob: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatElement 20s ease-in-out infinite' },
  tabBtn: { padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '800', cursor: 'pointer', border: 'none', background: 'transparent', color: 'var(--text-muted)', transition: 'all 0.3s' },
  activeTabBtn: { background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary-gold)' },
  spinner: { width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', display: 'inline-block' }
};

export default AdminPanel;
