import { promoData } from '../data/data';
import PromoCard from './PromoCard';
import styles from './PromoSection.module.css';

export default function PromoSection() {
  return (
    <section className={styles.section}>
      {promoData.map(promo => (
        <PromoCard 
          key={promo.id}
          title={promo.title}
          description={promo.description}
          linkText={promo.linkText}
          imageUrl={promo.imageUrl}
          href={promo.href}
        />
      ))}
    </section>
  );
}