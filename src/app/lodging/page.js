// [REACT COMPONENT] /src/app/lodging/page.js
"use client"; // This makes it a Client Component

import { useState, useEffect } from 'react'; // Import hooks
import PageHeader from '../../components/PageHeader';
import LodgingCard from '../../components/LodgingCard';
import FilterSidebar from '../../components/FilterSidebar';
import styles from './LodgingPage.module.css';

export default function LodgingPage() {
  // State to hold all lodgings fetched from the API
  const [allLodgings, setAllLodgings] = useState([]);
  // State to hold the lodgings that are currently visible after filtering
  const [filteredLodgings, setFilteredLodgings] = useState([]);
   // ADD a state to track which filters are active
  const [activeFilters, setActiveFilters] = useState({
    area: [], // This will store the names of the checked areas, e.g., ['Kathmandu Valley']
  });

  // ADD a function to handle changes from the sidebar
  const handleFilterChange = (category, value) => {
    setActiveFilters(prevFilters => {
      const currentValues = prevFilters[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value) // Uncheck: remove value
        : [...currentValues, value]; // Check: add value
      
      return {
        ...prevFilters,
        [category]: newValues,
      };
    });
  };

  // Fetch lodgings from our API when the component mounts
  useEffect(() => {
    async function getLodgings() {
      const response = await fetch('/api/lodging'); // No need for full URL on client-side
      if (response.ok) {
        const data = await response.json();
        setAllLodgings(data);
        setFilteredLodgings(data); // Initially, all lodgings are visible
      } else {
        console.error("Failed to fetch lodgings");
      }
    }
    getLodgings();
  }, []); // The empty array [] means this effect runs only once

    useEffect(() => {
    let results = [...allLodgings]; // Start with all lodgings

    // Apply area filter
    if (activeFilters.area.length > 0) {
      results = results.filter(lodging => 
        activeFilters.area.includes(lodging.area)
      );
    }

    // You could add more filters here later (e.g., price, amenities)

    setFilteredLodgings(results);
  }, [activeFilters, allLodgings]); // This effect runs when filters or the main list change

  return (
    <div>
      <PageHeader
        imageUrl="/images/nepal-hotel-hero.jpg"
        title="Find Your Perfect Stay"
        description="From cozy inns with stunning peak views to rustic cabins by the serene river, discover the best places to rest in the heart of the Himalayas."
      />

      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className={styles.resultsGrid}>
            {/* We now map over the filteredLodgings state variable */}
            {filteredLodgings.map(lodging => (
              <LodgingCard
                key={lodging.id}
                id={lodging.id}
                name={lodging.name}
                description={lodging.description}
                imageUrl={lodging.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}