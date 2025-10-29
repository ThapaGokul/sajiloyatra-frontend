// /src/components/LocalHostForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LocalHostForm.module.css';

export default function LocalHostForm() {
  const router = useRouter();
  
  // 1. State for text fields
  const [formData, setFormData] = useState({
    name: '',
    location: 'Kathmandu',
    specialty: 'Local Experiences',
    bio: '',
  });
  
  // 2. Separate state for the file
  const [file, setFile] = useState(null);
  
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. New handler for the file input
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload a profile photo.");
      setIsError(true);
      return;
    }
    
    setMessage("Uploading profile... this may take a moment.");
    setIsError(false);

    // 4. Create FormData and append all fields
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('specialty', formData.specialty);
    data.append('bio', formData.bio);
    data.append('imageUrl', file); // 'imageUrl' must match the key in the API
    data.append('type', 'HOST');

    const response = await fetch('/api/locals', {
      method: 'POST',
      // 5. Do NOT set Content-Type, browser does it for FormData
      body: data, 
    });

    if (response.ok) {
      setMessage('Profile created successfully! Redirecting...');
      setIsError(false);
      setTimeout(() => {
        router.push('/locals');
      }, 2000);
    } else {
      const data = await response.json();
      setMessage(`Error: ${data.error}`);
      setIsError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text" id="name" name="name"
          className={styles.input}
          value={formData.name} onChange={handleTextChange} required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="location">Your Location</label>
        <select
          id="location" name="location"
          className={styles.select}
          value={formData.location} onChange={handleTextChange}
        >
          <option value="Kathmandu">Kathmandu</option>
          <option value="Pokhara">Pokhara</option>
          <option value="Chitwan">Chitwan</option>
          <option value="Lumbini">Lumbini</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="specialty">You Want to Offer</label>
        <select
          id="specialty" name="specialty"
          className={styles.select}
          value={formData.specialty} onChange={handleTextChange}
        >
          <option value="Local Experiences">Local Experiences</option>
          <option value="Homestay">Homestay</option>
          <option value="Food Tours">Food Tours</option>
        </select>
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="bio">Short Bio</label>
        <textarea
          id="bio" name="bio"
          className={styles.textarea}
          placeholder="Tell travelers a bit about yourself..."
          value={formData.bio} onChange={handleTextChange} required
        ></textarea>
      </div>

      {/* 6. THIS IS THE UPDATED FILE INPUT */}
      <div className={styles.inputGroup}>
        <label htmlFor="imageUrl">Profile Photo</label>
        <input
          type="file" id="imageUrl" name="imageUrl"
          className={styles.input}
          accept="image/png, image/jpeg" // Only allow images
          onChange={handleFileChange} required
        />
      </div>

      <button type="submit" className={styles.submitButton}>Create My Profile</button>
      
      {message && (
        <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
          {message}
        </div>
      )}
    </form>
  );
}