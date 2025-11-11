// /src/app/guides/page.js
"use client";

import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import LocalGuideCard from '../../components/LocalGuideCard';
// We can reuse the same CSS module from the /locals page!
import styles from '../locals/LocalsPage.module.css'; 
import ContactGuideModal from '../../components/ContactGuideModal';

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    // Fetch guides from our new API endpoint
    async function fetchGuides() {
      try {
        const response = await fetch('/api/guides'); // <-- Fetching from the new /api/guides
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

  // --- Modal Functions ---
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
        imageUrl="/images/guide1.jpg" // You'll need a new hero image
        title="Find a Professional Guide"
        description="Hire certified professionals for trekking, tours, and expeditions."
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          {guides.map(guide => (
            <LocalGuideCard 
              key={guide.id} 
              guide={guide} 
              onContactClick={handleOpenModal} // The contact button will work
            />
          ))}
        </div>
      </div>

      {/* We can even reuse the modal logic! */}
      {isModalOpen && (
        <ContactGuideModal 
          guide={selectedGuide} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}