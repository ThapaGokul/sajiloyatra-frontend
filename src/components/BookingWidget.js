// /src/components/BookingWidget.js
"use client";

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import styles from './BookingWidget.module.css';

export default function BookingWidget({ lodgingId }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // Default to one day later
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the form from reloading the page
    setMessage(null);
    setIsError(false);

    if (!guestName || !guestEmail) {
      setMessage("Please fill in your name and email.");
      setIsError(true);
      return;
    }

    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lodgingId: lodgingId,
        checkIn: startDate,
        checkOut: endDate,
        guestName: guestName,
        guestEmail: guestEmail,
      }),
    });

    if (response.ok) {
      setMessage("Booking successful! Check your email for confirmation.");
      setIsError(false);
      setGuestName("");
      setGuestEmail("");
    } else {
      const data = await response.json();
      setMessage(`Booking failed: ${data.error}`);
      setIsError(true);
    }
  };

  return (
    <form className={styles.widget} onSubmit={handleSubmit}>
      <h3>Book Your Stay</h3>
      
      <div className={styles.datePickers}>
        <div className={styles.inputGroup}>
          <label>Check-in</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className={styles.dateInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Check-out</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.dateInput}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="guestName">Full Name</label>
        <input
          type="text"
          id="guestName"
          className={styles.input}
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="guestEmail">Email</label>
        <input
          type="email"
          id="guestEmail"
          className={styles.input}
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.bookButton}>
        Book Now
      </button>

      {message && (
        <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
          {message}
        </div>
      )}
    </form>
  );
}