// /src/components/DetailModal.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './DetailModal.module.css';

export default function DetailModal({ destination, onClose }) {
  if (!destination) return null;

  const [mainImage, setMainImage] = useState(
    (destination.imageUrls && destination.imageUrls.length > 0)
      ? destination.imageUrls[0]
      : `https://placehold.co/600x400/EFEFEF/333?text=${encodeURIComponent(destination.name)}`
  );

  useEffect(() => {
    setMainImage(
      (destination.imageUrls && destination.imageUrls.length > 0)
        ? destination.imageUrls[0]
        : `https://placehold.co/600x400/EFEFEF/333?text=${encodeURIComponent(destination.name)}`
    );
  }, [destination]);

  return (
    <div 
      className={styles.backdrop}
      onClick={onClose}
    >
      <div 
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{destination.name}</h3>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={`${styles.modalBody}`}>
          <div>
            <Image
              src={mainImage}
              alt="Main destination image"
              width={600}
              height={400}
              className={styles.mainImage}
            />
            <div className={styles.thumbnails}>
              {destination.imageUrls && destination.imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`${destination.name} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setMainImage(url)}
                  className={styles.thumbImage}
                />
              ))}
            </div>
          </div>
          <div className={styles.detailsContent}>
            <p className={styles.description}>{destination.longDescription}</p>
            <div>
              <span className={`${styles.tag} ${styles.tagProvince}`}>
                {destination.province}
              </span>
              <span className={`${styles.tag} ${styles.tagCategory}`}>
                {destination.category}
              </span>
            </div>
            <h4 className={styles.attractionsTitle}>Key Attractions</h4>
            <ul className={styles.attractionsList}>
              {destination.keyAttractions && destination.keyAttractions.length > 0 ? (
                destination.keyAttractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))
              ) : (
                <li>No key attractions listed.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}