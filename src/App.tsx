import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import DestinationCard from './components/DestinationCard';

import hajjBg from './assets/hajj-bg.jpg';
import kaabaCloseup from './assets/kaaba-closeup.jpg';
import kaabaNight from './assets/kaaba-night.jpg';

function App() {
  const destinations = [
    {
      id: 1,
      title: "Hajj & Umrah Regular Package",
      location: "Mecca, Saudi Arabia",
      image: kaabaCloseup,
      rating: 5.0,
      price: "₦3,500,000",
      duration: "14 Days"
    },
    {
      id: 2,
      title: "Hajj & Umrah Exclusive Package",
      location: "Mecca, Saudi Arabia",
      image: kaabaNight,
      rating: 4.8,
      price: "₦5,500,000",
      duration: "14 Days"
    },
    {
      id: 3,
      title: "Hajj & Umrah VIP Package",
      location: "Mecca, Saudi Arabia",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.9,
      price: "₦8,200,000",
      duration: "14 Days"
    },
    {
      id: 4,
      title: "Visa Assistance",
      location: "Global Coverage",
      image: "https://images.unsplash.com/photo-1554466952-4a0048386b72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      price: "Varies",
      duration: "Flexible"
    }
  ];

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <main>
        <section className="section-padding container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Popular Destinations</h2>
            <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Explore our most sought-after packages, designed to give you the perfect blend of spiritual fulfillment and leisure.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {destinations.map(dest => (
              <DestinationCard
                key={dest.id}
                image={dest.image}
                title={dest.title}
                location={dest.location}
                rating={dest.rating}
                price={dest.price}
                duration={dest.duration}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
