// [REACT COMPONENT] /src/app/page.js
import Hero from '../components/Hero';
import TripPlannerNav from '../components/TripPlannerNav';
import PromoSection from '../components/PromoSection';
import styles from './page.module.css'; // Import our new homepage styles
import Link from 'next/link'; // 1. Make sure Link is imported
import SeasonalGuide from '../components/SeasonalGuide'; // 1. Import it
import StoryCard from '../components/StoryCard'; // Import the new component
import { storiesData } from '../data/data';
import InfoSection from '../components/InfoSection';

// 1. Make the component async
export default async function Home() {
  // 2. Fetch the data from our API on the server
  const storiesResponse = await fetch('http://localhost:3000/api/stories', { cache: 'no-store' });
  const storiesData = await storiesResponse.json();
  return (
    <main>
      <Hero />
      <TripPlannerNav />
      <PromoSection />
      <InfoSection />
      <SeasonalGuide />

      <section className={styles.container}>
        <h2>Stories from the Trail</h2>
        <div className={styles.trekList}>
          {/* 3. This now correctly uses storiesData */}
          {storiesData.map(story => (
            <StoryCard
              key={story.id}
              title={story.title}
              author={story.author}
              imageUrl={story.imageUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}