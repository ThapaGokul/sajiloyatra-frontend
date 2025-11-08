// /src/components/RouteCard.js
import Image from 'next/image';
import styles from './RouteCard.module.css';

export default function RouteCard({ route }) {
  const imageUrl = route.imageUrl || `https://placehold.co/1200x400/EFEFEF/333?text=${encodeURIComponent(route.name)}`;

  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        alt={route.name}
        width={1200}
        height={400}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{route.name}</h2>
          <span className={styles.duration}>
            {route.duration}
          </span>
        </div>
        <p className={styles.description}>{route.description}</p>
        <h3 className={styles.itineraryTitle}>Itinerary</h3>
        <div className={styles.itineraryDays}>
          {route.days && Array.isArray(route.days) ? (
            route.days.map(day => (
              <div key={day.dayNumber} className={styles.day}>
                <div className={styles.dayNumber}>
                  Day {day.dayNumber}
                </div>
                <div className={styles.dayContent}>
                  <h4>
                    {day.title} {day.destination && <span className={styles.dayDestination}>{day.destination.name}</span>}
                  </h4>
                  <p>{day.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No itinerary details available.</p>
          )}
        </div>
      </div>
    </div>
  );
}