import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

// Inline SVGs to avoid dependency issues
const WhatsAppIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118 .571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
);

const TikTokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.48-1.15v6.16c0 6.48-5.59 9.38-10.16 8.52C2.41 21.82-.67 16.74 2.22 12.02c2.19-3.48 7.03-3.68 9.29-.68v-4.11H11.5c-4.99-.07-9.74 4.09-8.49 9.22 1.12 4.49 5.8 7.33 10.3 5.42 2.55-1.12 4.2-3.76 4.18-6.57-.01-4.75.01-9.5-.01-14.25-1.66-.02-3.32-.01-4.96.01L12.5.02z" />
    </svg>
);

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <h3 className={styles.brand}>Na-Allah <span>Travels and tours</span></h3>
                    <p className={styles.description}>
                        Your trusted partner for spiritual journeys and global adventures.
                        Experience the world with comfort and peace of mind.
                    </p>
                    <div className={styles.socials}>
                        <a href="#" className={`${styles.socialLink} ${styles.facebook}`}><Facebook size={20} /></a>
                        <a href="#" className={`${styles.socialLink} ${styles.twitter}`}><Twitter size={20} /></a>
                        <a href="#" className={`${styles.socialLink} ${styles.instagram}`}><Instagram size={20} /></a>
                        <a href="#" className={`${styles.socialLink} ${styles.whatsapp}`}><WhatsAppIcon size={20} /></a>
                        <a href="#" className={`${styles.socialLink} ${styles.tiktok}`}><TikTokIcon size={20} /></a>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/destinations">Destinations</a></li>
                        <li><a href="/packages">Hajj & Umrah</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Contact Us</h4>
                    <ul className={styles.contactInfo}>
                        <li>
                            <MapPin size={18} />
                            <span>123 Crescent Avenue, Abuja, Nigeria</span>
                        </li>
                        <li>
                            <Phone size={18} />
                            <span>+234 800 123 4567</span>
                        </li>
                        <li>
                            <Mail size={18} />
                            <span>info@na-allah-travels.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Na-Allah Travels and Tours. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
