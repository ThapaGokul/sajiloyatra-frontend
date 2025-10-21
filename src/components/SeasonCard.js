// [REACT COMPONENT] /src/components/SeasonCard.js
import Image from 'next/image'; // 1. Import the special Image component
import styles from './SeasonCard.module.css';

export default function SeasonCard({ season, description, imageUrl }) {
  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        alt={`View of Nepal during ${season}`}
        width={320} 
        height={200}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3>{season}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}