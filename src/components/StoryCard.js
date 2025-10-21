// [REACT COMPONENT] /src/components/StoryCard.js
'use client'; // Required for hooks

import Image from 'next/image';
import styles from './StoryCard.module.css';
import { useInView } from 'react-intersection-observer'; // 1. Import the hook

export default function StoryCard({ title, author, imageUrl }) {
  // 2. Use the hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation happens once
    threshold: 0.1,    // Trigger when 10% of the card is visible
  });

  // 3. Conditionally apply a 'visible' class
  const cardClassName = `${styles.card} ${inView ? styles.visible : ''}`;

  return (
    // 4. Attach the 'ref' and the new className
    <div ref={ref} className={cardClassName}>
      <Image
        src={imageUrl}
        alt={title}
        fill={true}
        className={styles.image}
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>By {author}</p>
      </div>
    </div>
  );
}