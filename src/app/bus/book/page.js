// /src/app/bus/book/page.js
import { Suspense } from 'react';
import BusBookClient from './BusBookClient';
import styles from './BusBook.module.css'; // We might need this for a loading style

// This is a simple fallback component
function LoadingFallback() {
  return (
    <div className={styles.container}>
      <h2>Loading your booking...</h2>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BusBookClient />
    </Suspense>
  );
}