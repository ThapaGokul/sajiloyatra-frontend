// [REACT COMPONENT] /src/app/booking/[id]/page.js
'use client';

import styles from '../../../app/page.module.css'; // We can reuse our existing form styles
import { useState } from 'react';

export default function BookingPage({ params }) {
  // We get the trek ID from the URL params
  const trekId = params.id;

  // State for each of our form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  return (
    <main>
      <div className={styles.container}>
        <form className={styles.form}>
          <h2>Confirm Your Booking</h2>
          <p>You are booking the trek with ID: {trekId}</p>

          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="bookingDate">Preferred Date</label>
          <input type="date" id="bookingDate" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
          
          <label htmlFor="numberOfPeople">Number of People</label>
          <select id="numberOfPeople" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </main>
  );
}