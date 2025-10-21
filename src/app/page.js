// [REACT COMPONENT] /src/app/page.js
import Hero from '../components/Hero';
import TripPlannerNav from '../components/TripPlannerNav';
import PromoSection from '../components/PromoSection';
import styles from './page.module.css';
import Link from 'next/link';
import SeasonalGuide from '../components/SeasonalGuide';
import StoryCard from '../components/StoryCard';
import InfoSection from '../components/InfoSection';

// 1. Make the component async
export default async function Home() {
  // Use a sensible default for the URL for safety
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const fetchUrl = `${API_URL}/api/stories`;

  let storiesData = []; // Initialize data as an empty array

  // 2. Fetch the data from our API on the server
  try {
    const storiesResponse = await fetch(fetchUrl, { 
      cache: 'no-store',
      // Add a timeout for robustness if needed, but not required here
    });

    // --- CRITICAL FIX: Check response status BEFORE parsing JSON ---
    if (!storiesResponse.ok) {
      console.error(`Fetch error: Received status ${storiesResponse.status} from ${fetchUrl}`);
      // Read the body as text to see what the server sent (e.g., an HTML error page)
      const errorText = await storiesResponse.text();
      console.error("Backend error response:", errorText.substring(0, 200) + '...');
      
      // If the fetch fails (e.g., 404/500), we return an empty array, 
      // preventing the app from crashing and allowing the rest of the page to render.
      // throw new Error(`Failed to fetch stories: ${storiesResponse.status}`); // Option to crash
      
    } else {
      // --- CRITICAL FIX: Wrap JSON parsing in try/catch ---
      const contentType = storiesResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        storiesData = await storiesResponse.json();
      } else {
        // Handle case where status is 200 but content is not JSON (e.g., empty string)
        console.error("Received non-JSON content type, skipping JSON parsing.");
      }
    }
  } catch (error) {
    // This catches network errors or the "Unexpected end of JSON input" error
    console.error("Network or JSON parse failure during story fetch:", error);
    // storiesData remains [] (empty array), allowing the rest of the page to load.
  }

  // NOTE: Remove the unused local import from a previous state:
  // import { storiesData } from '../data/data'; 
  // You no longer need this, as you're fetching data from the API.

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
            // 3. Render cards only if data is available
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