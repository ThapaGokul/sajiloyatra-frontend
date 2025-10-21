import Image from 'next/image';
import styles from './LocalCard.module.css';

export default function LocalCard({ name, specialty, imageUrl }) {
  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        alt={`Profile of ${name}`}
        width={150}
        height={150}
        className={styles.image}
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.specialty}>{specialty}</p>
    </div>
  );
}