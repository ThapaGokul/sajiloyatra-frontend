import Image from 'next/image';
import Link from 'next/link';
import styles from './LodgingCard.module.css';

export default function LodgingCard({id, name, description, imageUrl }) {
  return (
    <Link href={`/lodging/${id}`} className={styles.link}>
    <div className={styles.card}>
      <Image src={imageUrl} alt={name} width={400} height={220} className={styles.image} />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
    </Link>
  );
}