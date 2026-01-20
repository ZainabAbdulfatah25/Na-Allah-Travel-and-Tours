import { MapPin, Star, ArrowRight } from 'lucide-react';
import styles from './DestinationCard.module.css';

interface DestinationCardProps {
    image: string;
    title: string;
    location: string;
    rating: number;
    price: string;
    duration: string;
}

const DestinationCard = ({ image, title, location, rating, price, duration }: DestinationCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
                <div className={styles.overlay}>
                    <span className={styles.duration}>{duration}</span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.location}>
                        <MapPin size={16} />
                        <span>{location}</span>
                    </div>
                    <div className={styles.rating}>
                        <Star size={16} fill="currentColor" />
                        <span>{rating}</span>
                    </div>
                </div>

                <h3 className={styles.title}>{title}</h3>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        <span className={styles.label}>From</span>
                        <span className={styles.amount}>{price}</span>
                    </div>
                    <button className={styles.button}>
                        Explore <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
