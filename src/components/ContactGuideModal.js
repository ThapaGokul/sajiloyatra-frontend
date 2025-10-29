// /src/components/ContactGuideModal.js
"use client";

import styles from './ContactGuideModal.module.css';

export default function ContactGuideModal({ guide, onClose }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to an API.
    // For now, we just show an alert.
    alert(`Your message has been sent to ${guide.name}!`);
    onClose(); // Close the modal
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>Contact {guide.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" className={styles.textarea} required></textarea>
          </div>
          <button type="submit" className={styles.sendButton}>Send Message</button>
        </form>
      </div>
    </div>
  );
}