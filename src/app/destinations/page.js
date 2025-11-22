// /src/app/destinations/page.js
"use client";

import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DestinationCard from '../../components/DestinationCard';
import RouteCard from '../../components/RouteCard'; // We will create this
import DetailModal from '../../components/DetailModal'; // We will create this
import styles from './DestinationsPage.module.css';

// --- CONFIGURATION ---
// This is your Spring Boot API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// ---

// --- HELPER FUNCTION TO FIX THE ERROR ---
// This function checks if a URL is valid before we pass it to <Image>
const isValidUrl = (url) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};
// ---

export default function DestinationsPage() {
  const [activeView, setActiveView] = useState('destinations');
  const [allDestinations, setAllDestinations] = useState([]);
  const [allRoutes, setAllRoutes] = useState([]);
  const [destSearch, setDestSearch] = useState('');
  const [routeSearch, setRouteSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    async function initializeApp() {
      setIsLoading(true);
      setError(null);
      try {
        const [destResponse, routeResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/destinations`),
          fetch(`${API_BASE_URL}/api/v1/routes`)
        ]);

        if (!destResponse.ok) throw new Error('Failed to load destinations');
        const destData = await destResponse.json();
        setAllDestinations(destData);

        if (!routeResponse.ok) throw new Error('Failed to load routes');
        const routeData = await routeResponse.json();
        setAllRoutes(routeData);

      } catch (err) {
        console.error("Error initializing app:", err);
        setError(`Failed to load data. Make sure your API is running at ${API_BASE_URL}.`);
      }
      setIsLoading(false);
    }
    initializeApp();
  }, []);

  // --- Modal Logic ---
  const openModal = (destination) => {
    setSelectedDest(destination);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDest(null);
  };

  // --- Filtering Logic ---
  const filteredDestinations = allDestinations.filter(dest => {
    const searchText = destSearch.toLowerCase().trim();
    if (!searchText) return true;
    return (
      dest.name.toLowerCase().includes(searchText) ||
      dest.province.toLowerCase().includes(searchText) ||
      dest.category.toLowerCase().includes(searchText)
    );
  });

  const filteredRoutes = allRoutes.filter(route => {
    const searchText = routeSearch.toLowerCase().trim();
    if (!searchText) return true;
    return (
      route.name.toLowerCase().includes(searchText) ||
      route.category.toLowerCase().includes(searchText)
    );
  });

  const renderLoading = () => (
    <div className={styles.loadingSpinner}>
      <svg className={styles.loadingIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
  
  const renderError = () => (
     <div className={styles.messageArea}>
        <p style={{color: 'red'}}>{error}</p>
     </div>
  );

  return (
    <>
      <PageHeader
        title="Explore Nepal"
        description="Find your next adventure, from serene lakes to the highest peaks."
        // Make sure you have a fallback for this hero image too!
        imageUrl="/images/destination-hero.jpg" // You'll need a new hero image
      />

      <main className={styles.container}>
        <nav className={styles.tabNav}>
          <button
            className={`${styles.tabButton} ${activeView === 'destinations' ? styles.tabActive : ''}`}
            onClick={() => setActiveView('destinations')}
          >
            Explore Destinations
          </button>
          <button
            className={`${styles.tabButton} ${activeView === 'routes' ? styles.tabActive : ''}`}
            onClick={() => setActiveView('routes')}
          >
            Find Planned Routes
          </button>
        </nav>

        {/* --- Destinations View --- */}
        <div style={{ display: activeView === 'destinations' ? 'block' : 'none' }}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="search"
                value={destSearch}
                onChange={(e) => setDestSearch(e.target.value)}
                placeholder="Search by name, province, or category..."
                className={styles.searchInput}
              />
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          {error && renderError()}
          {isLoading ? renderLoading() : (
            <div className={styles.grid}>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map(dest => (
                  <DestinationCard key={dest.id} dest={dest} onLearnMore={openModal} />
                ))
              ) : (
                <div className={styles.messageArea}>
                  No destinations found matching your search.
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- Routes View --- */}
        <div style={{ display: activeView === 'routes' ? 'block' : 'none' }}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="search"
                value={routeSearch}
                onChange={(e) => setRouteSearch(e.target.value)}
                placeholder="Search by name or category (e.g., 'Everest', 'Short Trek')"
                className={styles.searchInput}
              />
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          {error && renderError()}
          {isLoading ? renderLoading() : (
            <div className={styles.routeList}>
              {filteredRoutes.length > 0 ? (
                //
                // --- THIS IS THE FIX ---
                //
                filteredRoutes.map(route => {
                  // 1. Check if the URL from the database is valid
                  const validImageUrl = isValidUrl(route.imageUrl)
                    ? route.imageUrl
                    : '/images/default-route-fallback.jpg'; // <-- Provide a safe fallback image

                  // 2. Create a new, *safe* route object to pass as a prop
                  const safeRoute = { ...route, imageUrl: validImageUrl };
                  
                  // 3. Pass the *safe* object. This prevents the error.
                  return (
                    <RouteCard key={route.id} route={safeRoute} />
                  );
                })
              ) : (
                <div className={styles.messageArea}>
                  No routes found matching your search.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* --- Detail Modal --- */}
      {isModalOpen && <DetailModal destination={selectedDest} onClose={closeModal} />}
    </>
  );
}