// /src/components/PageHeader.js
import Image from 'next/image';
// Import our new CSS module
import styles from './PageHeader.module.css';

const PageHeader = ({ imageUrl, title, description }) => {
  return (
    <section>
      {/* Use the styles from our CSS module file */}
      <div className={styles.heroContainer}>
        <Image
          src={imageUrl}
          alt={`${title} hero image`}
          fill // Use the new 'fill' prop
          className={styles.heroImage} // Apply the 'object-fit' style
          priority
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};

export default PageHeader;