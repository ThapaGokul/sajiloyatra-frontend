"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from './Profile.module.css';

export default function ProfilePage() {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/images/default-avatar.jpg');

  // Redirect user if not logged in
  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  // Fetch profile data only after token is available
  useEffect(() => {
    if (!isLoading && token) {
      const fetchProfile = async () => {
        console.log("Fetching profile with token:", token); // DEBUG

        try {
          const response = await axios.get("http://localhost:8080/api/profile/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data) {
            setBio(response.data.bio || "");
            setSkills(response.data.skills ? response.data.skills.join(", ") : "");
            if (response.data.profilePhotoUrl) {
              setPreviewUrl(`http://localhost:8080${response.data.profilePhotoUrl}`);
            }
          }
        } catch (error) {
          if (error.response?.status !== 404) {
            setMessage("Could not load your profile data.");
          }
        } finally {
          setIsFetching(false);
        }
      };

      fetchProfile();
    } else if (!isLoading && !token) {
      setIsFetching(false);
    }
  }, [token, isLoading]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setMessage("Authentication error. Please log in again.");
      return;
    }

    setMessage("");
    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('skills', skills);
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);

    try {
      await axios.post("http://localhost:8080/api/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        setMessage("Permission denied. Your session may have expired. Please log in again.");
      } else {
        setMessage(error.response?.data?.message || "Error connecting to the server.");
      }
    }
  };

  if (isLoading || isFetching) {
    return <div className={styles.loading}><p>Loading profile...</p></div>;
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Edit Your Profile</h1>
            <p>Share your skills and a little about yourself to connect with travelers.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.photoSection}>
              <div className={styles.imagePreview} style={{ backgroundImage: `url(${previewUrl})` }}></div>
              <label htmlFor="photo-upload" className={styles.fileInputLabel}>Choose Photo</label>
              <input id="photo-upload" type="file" accept="image/*" className={styles.fileInput} onChange={handlePhotoChange} />
            </div>

            <div>
              <label htmlFor="bio">Your Bio</label>
              <textarea id="bio" className={styles.textarea} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell travelers a little about yourself..." />
            </div>

            <div>
              <label htmlFor="skills">Your Skills (comma separated)</label>
              <input type="text" id="skills" className={styles.input} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Trekking, Cooking, History" />
            </div>

            <button type="submit" className={styles.button} disabled={isLoading || !token}>
              Save Profile
            </button>

            {message && (
              <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}