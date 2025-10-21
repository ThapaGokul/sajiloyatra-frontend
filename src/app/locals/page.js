import LocalCard from '../../components/LocalCard';
import { localsData } from '../../data/data';
import styles from '../../app/page.module.css'; // We can reuse the homepage styles

export default function LocalsPage() {
  return (
    <main>
      <div className={styles.container}>
        <h2>Connect with a Local Expert</h2>
        <div className={styles.trekList}>
          {localsData.map(local => (
            <LocalCard
              key={local.id}
              name={local.name}
              specialty={local.specialty}
              imageUrl={local.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}