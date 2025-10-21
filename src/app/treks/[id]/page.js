// [REACT COMPONENT] /src/app/treks/[id]/page.js
'use client';
import { treksData } from '../../../data/data';
import Link from 'next/link'; // 1. Import the Link component
import styles from './TrekDetail.module.css'; // 2. Import our new styles

export default function TrekDetailPage({ params }) {
  // 1. The ID from the URL is always a string. We need to convert it to a number.
  const trekId = parseInt(params.id, 10);

  // 2. Use the .find() method to search the array for the matching trek.
  // This is like saying, "Find the 't' where t.id is equal to our trekId."
  const trek = treksData.find(t => t.id === trekId);

  // 3. If no trek is found (e.g., for a URL like /treks/99), show a message.
  if (!trek) {
    return <h1>Trek not found!</h1>;
  }

  // 4. If a trek is found, display its details.
  return (
    <main>
      <div className={styles.container}>
        <h1>{trek.title}</h1>
        <p><strong>Duration:</strong> {trek.duration} days</p>
        <p><strong>Difficulty:</strong> {trek.difficulty}</p>
        <p>{trek.description}</p>
        <Link href={`/booking/${trek.id}`} className={styles.bookButton}>
          Book This Trek
        </Link>
      </div>
    </main>
  );
}