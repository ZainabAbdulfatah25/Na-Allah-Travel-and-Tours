import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Flyers from './components/Flyers';
import Packages from './components/Packages';
import ContactForm from './components/ContactForm';
import Credentials from './components/Credentials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Payment from './components/Payment';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [selectedInterest, setSelectedInterest] = useState('');

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

  // NEW: Dedicated Standalone Premium Services Page
  if (currentHash.startsWith('#services-page')) {
    return (<div className="app-container"><Navbar /><Services standalone={true} /><Footer /></div>);
  }

  // Default Home Page
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Flyers />
      <Services onSelectService={(interest) => {
        if (interest === 'Flight Bookings') {
          window.location.hash = '#services-page?tab=0';
        } else if (interest === 'Professional Tours') {
          window.location.hash = '#services-page?tab=1';
        } else if (interest === 'Customized Tours') {
          window.location.hash = '#services-page?tab=2';
        } else {
          window.location.hash = '#services-page';
        }
      }} />
      <Credentials />
      <ContactForm initialInterest={selectedInterest} />
      <Footer />
    </div>
  );
}

export default App;
