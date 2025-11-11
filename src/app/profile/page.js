// /src/app/profile/page.js
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProfilePage.module.css';
import PageHeader from '../../components/PageHeader'; // <-- We'll use our header
import LocalGuideCard from '../../components/LocalGuideCard'; 

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  
  const [bookings, setBookings] = useState([]);
  const [hostProfile, setHostProfile] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // --- NEW: State to manage which tab is active ---
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'host'

  useEffect(() => {
    if (user) {
      async function fetchData() {
        setIsLoadingData(true);
        try {
          const [bookingsRes, hostProfileRes] = await Promise.all([
            fetch('/api/bookings/me'),
            fetch('/api/guides/me')
          ]);

          if (bookingsRes.ok) setBookings(await bookingsRes.json());
          if (hostProfileRes.ok) setHostProfile(await hostProfileRes.json());
          
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        } finally {
          setIsLoadingData(false);
        }
      }
      fetchData();
    }
  }, [user]);

  // Main loading spinner for auth
  if (isAuthLoading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  // Prompt to log in
  if (!user) {
    return (
      <div className={styles.emptyContainer}>
        <p>Please <Link href="/login" className={styles.loginLink}>login</Link> to view your profile.</p>
      </div>
    );
  }

  // --- Helper components for each tab ---
  const BookingsContent = () => {
    if (isLoadingData) return <div className={styles.loading}>Loading bookings...</div>;
    if (bookings.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>You have no bookings yet.</p>
          <Link href="/lodging" className={styles.ctaButton}>Find a Place to Stay</Link>
        </div>
      );
    }
    return (
      <div className={styles.bookingList}>
        {bookings.map(booking => (
          <div key={booking.id} className={styles.bookingCard}>
            <h3>{booking.lodging.name}</h3>
            <p><strong>Area:</strong> {booking.lodging.area}</p>
            <p>
              <strong>Dates:</strong> 
              {new Date(booking.checkIn).toLocaleDateString()} - 
              {new Date(booking.checkOut).toLocaleDateString()}
            </p>
            <p><strong>Payment ID:</strong> {booking.paymentId}</p>
          </div>
        ))}
      </div>
    );
  };

  const HostProfileContent = () => {
    if (isLoadingData) return <div className={styles.loading}>Loading host profile...</div>;
    if (hostProfile) {
      return (
        <div>
          <p className={styles.profileIntro}>This is your public host profile. You can edit this in the future.</p>
          <LocalGuideCard guide={hostProfile} onContactClick={() => {}} />
        </div>
      );
    }
    return (
      <div className={styles.emptyState}>
        <p>You are not a local host yet.</p>
        <Link href="/locals/join" className={styles.ctaButton}>
          Become a Host
        </Link>
      </div>
    );
  };

  // --- Main Page Render ---
  return (
    <>
      <PageHeader
        imageUrl="/images/profile-hero.jpg" // You'll need a new hero image
        title={`Welcome, ${user.name.split(' ')[0]}`}
        description={`Manage your bookings and host profile all in one place.`}
      />

      <div className={styles.container}>
        {/* --- Tab Navigation --- */}
        <div className={styles.tabNav}>
          <button
            className={`${styles.tabButton} ${activeTab === 'bookings' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Lodging Bookings
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'host' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('host')}
          >
            My Host Profile
          </button>
        </div>

        {/* --- Tab Content --- */}
        <div className={styles.tabContent}>
          {activeTab === 'bookings' ? <BookingsContent /> : <HostProfileContent />}
        </div>
      </div>
    </>
  );
}