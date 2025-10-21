import Image from 'next/image';
import Link from 'next/link';
import styles from './PromoCard.module.css';

export default function PromoCard({ title, description, linkText, imageUrl, href }) {
  return (
    <div className={styles.card}>
      <Image src={imageUrl} alt={title} width={150} height={100} className={styles.image} />
      <div className={styles.content}>
        <h4>{title}</h4>
        <p>{description}</p>
        <Link href={href}>{linkText}</Link>
      </div>
    </div>
  );
}