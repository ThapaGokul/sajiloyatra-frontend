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
  // 1. Check for the VERCEL_URL (production/preview)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // 2. Fallback for local development
  return 'http://localhost:3000'; 
}

// 1. Make the component async
export default async function Home() {
  
  const baseUrl = getBaseUrl(); // Get the correct base URL
  
  // ✅ FIX: Construct the full, absolute URL
  const fetchUrl = `${baseUrl}/api/stories`;

  let storiesData = [];

  // 2. Fetch the data from our API on the server
  try {
    const storiesResponse = await fetch(fetchUrl, { 
      // Keep revalidate set for performance. It will fetch from the local handler.
      next: { revalidate: 60} 
    });

    // --- CRITICAL FIX: Check response status BEFORE parsing JSON ---
    if (!storiesResponse.ok) {
      console.error(`Fetch error: Received status ${storiesResponse.status} from ${fetchUrl}`);
      const errorText = await storiesResponse.text();
      console.error("Internal API error response:", errorText.substring(0, 200) + '...');
      
      // We do not throw an error here; storiesData remains [].
    } else {
      // --- CRITICAL FIX: Wrap JSON parsing in try/catch ---
      const contentType = storiesResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        storiesData = await storiesResponse.json();
      } else {
        console.error("Received non-JSON content type from local API, skipping JSON parsing.");
      }
    }
  } catch (error) {
    // This catches network errors (rare for internal fetch) or the JSON parse error.
    console.error("Internal fetch or JSON parse failure during story fetch:", error);
  }

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
            // Display a user-friendly message if no stories are loaded
            <p>No stories found. Please check the backend connection.</p>
          )}
        </div>
      </section>
    </main>
  );
}