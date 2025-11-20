// [REACT COMPONENT] /src/app/page.js
import Hero from '../components/Hero';
import TripPlannerNav from '../components/TripPlannerNav';
import PromoSection from '../components/PromoSection';
import styles from './page.module.css';
import Link from 'next/link';
import SeasonalGuide from '../components/SeasonalGuide';
import StoryCard from '../components/StoryCard';
import InfoSection from '../components/InfoSection';

const getBaseUrl = () => {

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000'; 
}


export default async function Home() {
  
  const baseUrl = getBaseUrl(); 

  const fetchUrl = `${baseUrl}/api/stories`;

  let storiesData = [];

  try {
    const storiesResponse = await fetch(fetchUrl, { 
      next: { revalidate: 60} 
    });
    if (!storiesResponse.ok) {
      console.error(`Fetch error: Received status ${storiesResponse.status} from ${fetchUrl}`);
      const errorText = await storiesResponse.text();
      console.error("Internal API error response:", errorText.substring(0, 200) + '...');
    } else {
     
      const contentType = storiesResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        storiesData = await storiesResponse.json();
      } else {
        console.error("Received non-JSON content type from local API, skipping JSON parsing.");
      }
    }
  } catch (error) {

    console.error("Internal fetch or JSON parse failure during story fetch:", error);
  }
  console.log("Stories Count:", storiesData.length, "First Story ID:", storiesData[0]?.id);

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
          {storiesData.length > 0 ? (
            storiesData.map(story => (
              <StoryCard
                key={story.id}
                title={story.title}
                author={story.author}
                imageUrl={story.imageUrl}
              />
            ))
          ) : (
            <p>No stories found. Please check the backend connection.</p>
          )}
        </div>
      </section>
    </main>
  );
}