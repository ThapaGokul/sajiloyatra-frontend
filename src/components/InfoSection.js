// [REACT COMPONENT] /src/components/InfoSection.js
import Image from 'next/image';
import Link from 'next/link';
import styles from './InfoSection.module.css';

export default function InfoSection() {
  return (
    <section className={styles.section}>
      {/* Left Column for Text */}
      <div className={styles.textColumn}>
        {/* --- Start of updated content --- */}
        <h2 className={styles.title}>Culture & Himalayas: A Perfect Blend</h2>
        <p>Discover an experience unlike any other. From the ancient temples of Kathmandu to the breathtaking heights of the Everest region, Nepal offers a journey for the soul. Ready for a destination you have to see to believe?</p>
        <div className={styles.buttonContainer}>
          <Link href="#" className={styles.button}>Explore Kathmandu</Link>
          <Link href="#" className={styles.button}>Trek Everest</Link>
        </div>
        {/* --- End of updated content --- */}
      </div>

      {/* Right Column for Images */}
      <div className={styles.imageColumn}>
        <Image
          src="/images/primary-story.jpg"
          alt="Primary scenic view of Nepal"
          fill={true}
          objectFit="cover"
          className={styles.primaryImage}
        />
        <Image
          src="/images/secondary-story.jpg"
          alt="Secondary stylized view of Nepal"
          width={220}
          height={280}
          className={styles.secondaryImage}
        />
      </div>
    </section>
  );
}