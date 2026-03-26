import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Payment from './components/Payment';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Auto-scroll to top when hash changes
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#admin') {
    return <AdminPanel />;
  }
  
  if (currentHash.startsWith('#payment')) {
    return <Payment />;
  }

  if (currentHash.startsWith('#all-packages')) {
    return (
      <div className="app-container">
        <Navbar />
        <Packages />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Services />
      {/* Featured Packages Section on Home */}
      <Packages />
      <Footer />
    </div>
  );
}

export default App;
