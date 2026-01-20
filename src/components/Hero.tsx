import { Search } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={`container ${styles.content}`}>
                <h1 className={styles.title}>
                    Discover the World with <span className={styles.highlight}>Na-Allah Travels and tours</span>
                </h1>
                <p className={styles.subtitle}>
                    Your gateway to spiritual journeys and unforgettable adventures.
                    Expertly curated tours for Hajj, Umrah, and leisure.
                </p>

                <div className={styles.searchBox}>
                    <div className={styles.inputGroup}>
                        <label>Destination</label>
                        <input type="text" placeholder="Where do you want to go?" />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.inputGroup}>
                        <label>Date</label>
                        <input type="date" />
                    </div>
                    <button className={styles.searchButton}>
                        <Search size={20} />
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
