import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <a href="/" className={styles.logo}>
                    Na-Allah <span>Travels and Tours</span>
                </a>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <a href="/" className={styles.link}>Home</a>
                    <a href="/destinations" className={styles.link}>Destinations</a>
                    <a href="/about" className={styles.link}>About Us</a>
                    <a href="/contact" className={styles.link}>Contact</a>
                    <button className="btn btn-primary">Book Now</button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <a href="/" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Home</a>
                        <a href="/destinations" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Destinations</a>
                        <a href="/about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>About Us</a>
                        <a href="/contact" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Contact</a>
                        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Book Now</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
