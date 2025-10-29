// /src/app/locals/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import LocalGuideCard from '../../components/LocalGuideCard';
import ContactGuideModal from '../../components/ContactGuideModal'; // <-- 1. Import the new modal
import styles from './LocalsPage.module.css';

export default function LocalsPage() {
  const [guides, setGuides] = useState([]);
  
  // --- 2. ADD STATE FOR THE MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    async function fetchGuides() {
      try {
        const response = await fetch('/api/locals');
        if (response.ok) {
          const data = await response.json();
          setGuides(data);
        } else {
          console.error("Failed to fetch guides");
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    }
    fetchGuides();
  }, []);

  // --- 3. ADD FUNCTIONS TO OPEN/CLOSE THE MODAL ---
  const handleOpenModal = (guide) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuide(null);
  };

  return (
    <div>
      <PageHeader
        imageUrl="/images/locals-hero.jpg"
        title="Find a Local Guide"
        description="Connect with friendly locals for an authentic Nepali experience."
      />

      <div className={styles.container}>
        <div className={styles.callToAction}>
          <p>Want to share your home and culture?</p>
          <Link href="/locals/join" className={styles.joinButton}>
            Become a Host
          </Link>
        </div>
        
        <div className={styles.grid}>
          {guides.map(guide => (
            <LocalGuideCard 
              key={guide.id} 
              guide={guide} 
              onContactClick={handleOpenModal} // <-- 4. Pass the function as a prop
            />
          ))}
        </div>
      </div>

      {/* 5. RENDER THE MODAL (if open) */}
      {isModalOpen && (
        <ContactGuideModal 
          guide={selectedGuide} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}