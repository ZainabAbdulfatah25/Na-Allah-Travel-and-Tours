import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import ContactForm from './components/ContactForm';
import Credentials from './components/Credentials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Payment from './components/Payment';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0); 
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dedicated Admin View
  if (currentHash === '#admin') {
    return <AdminPanel />;
  }
  
  // Dedicated Payment View
  if (currentHash.startsWith('#payment')) {
    return (
      <div className="app-container">
        <Navbar />
        <Payment />
        <Footer />
      </div>
    );
  }

  // NEW: Dedicated Packages Page (Triggered by Book Now)
  if (currentHash.startsWith('#all-packages')) {
    return (
      <div className="app-container">
        <Navbar />
        <Packages />
        <Footer />
      </div>
    );
  }

  // Default Landing Page Experience
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Services />
      <Credentials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
