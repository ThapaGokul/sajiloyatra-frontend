// [REACT COMPONENT] /src/components/SeasonalGuide.js
import SeasonCard from './SeasonCard';
import styles from './SeasonalGuide.module.css';
import { seasonsData } from '../data/data'; // 1. Import the new data
import Link from 'next/link'; 

export default function SeasonalGuide() {
  return (
    <div className={styles.guide}>
      <h2>Plan Your Trip by Season</h2>
      <div className={styles.cardContainer}>
        {/* 2. Use .map() to render the cards from the data array */}
        {seasonsData.map(data => (
           <Link className={styles.cardLink} href={`/season/${data.slug}`} key={data.id}>
            <SeasonCard 
            season={data.season}
            description={data.description}
            imageUrl={data.imageUrl}
            />
            </Link>
        ))}
      </div>
    </div>
  );
}