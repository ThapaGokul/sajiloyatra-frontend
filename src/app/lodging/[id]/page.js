// /src/app/lodging/[id]/page.js
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // <-- Import hooks
import Image from 'next/image';
import PageHeader from '../../../components/PageHeader';
import BookingWidget from '../../../components/BookingWidget'; // <-- We'll use this
import styles from './lodgingDetail.module.css';

export default function LodgingDetailPage() {
  const [lodging, setLodging] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State to manage which room is selected
  const [selectedRoom, setSelectedRoom] = useState(null); 
  
  const params = useParams(); // Get the [id] from the URL
  const router = useRouter();
  const { id } = params;

  // Fetch data from our new API
  useEffect(() => {
    if (id) {
      async function getLodgingDetails() {
        try {
          const response = await fetch(`/api/lodging-details?id=${id}`);
          if (!response.ok) {
            throw new Error('Lodging not found');
          }
          const data = await response.json();
          console.log("DATA RECEIVED FROM API:", data);
          setLodging(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getLodgingDetails();
    }
  }, [id]);

  if (isLoading) {
    return <div className={styles.loading}>Loading lodging details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!lodging) {
    return <div className={styles.error}>Lodging not found.</div>;
  }

  return (
    <div>
      <PageHeader
        imageUrl={lodging.imageUrl}
        title={lodging.name}
        description={lodging.area}
      />

      <div className={styles.container}>
        {/* We can show the main description here */}
        <p>{lodging.description}</p>
        
        <div className={styles.roomList}>
          <h2>Choose Your Room</h2>
          {lodging.rooms.map((room) => (
            <div key={room.id} className={styles.roomCard}>
              <Image
                src={room.imageUrls[0]}
                alt={room.name}
                width={300}
                height={200}
                className={styles.roomImage}
              />
              <div className={styles.roomDetails}>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <p className={styles.roomGuests}>Max Guests: {room.maxGuests}</p>
              </div>
              <div className={styles.bookingBox}>
                <div className={styles.price}>
                  Rs. {room.pricePerNight.toLocaleString()}
                  <span> / night</span>
                </div>
                {/* This button will select the room */}
                <button 
                  onClick={() => setSelectedRoom(room)} 
                  className={styles.bookButton}
                >
                  Select Room
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* --- This is the new Booking Widget section --- */}
        {selectedRoom && (
          <BookingWidget
            lodgingId={lodging.id}
            roomTypeId={selectedRoom.id}
            lodgingName={`${lodging.name} - ${selectedRoom.name}`}
            lodgingPrice={selectedRoom.pricePerNight}
            // We'd also pass roomTypeId to the widget here
          />
        )}
      </div>
    </div>
  );
}