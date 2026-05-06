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

    // 🎭 Na-Allah Motion Activation Engine
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale, .animate-slide-down');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [currentHash]);

  // Dedicated Admin Console
  if (currentHash === '#admin') return <AdminPanel />;
  
  // Dedicated Views (Focused Pages)
  if (currentHash.startsWith('#payment')) {
    return (<div className="app-container"><Navbar /><Payment /><Footer /></div>);
  }

  if (currentHash.startsWith('#all-packages')) {
    return (<div className="app-container"><Navbar /><Packages /><Footer /></div>);
  }

  // NEW: Dedicated Certifications Page
  if (currentHash.startsWith('#credentials')) {
    return (<div className="app-container"><Navbar /><Credentials /><Footer /></div>);
  }

  // Default Home Page
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
