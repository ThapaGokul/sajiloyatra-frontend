// /src/app/login/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../auth/AuthForm.module.css';
import { useAuth } from '../../context/AuthContext'; // <-- 1. IMPORT useAuth

export default function LoginPage() {
  const router = useRouter();
  const { refetchUser } = useAuth(); // <-- 2. GET THE REFETCH FUNCTION
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Login successful! Redirecting...");
        setIsError(false);
        
        // --- 3. THIS IS THE FIX ---
        // Manually tell the AuthContext to get the new user data
        await refetchUser(); 
        
        // Now redirect to the homepage
        router.push('/');
        // We don't need router.refresh() anymore
      } else {
        const data = await response.json();
        setMessage(data.error || 'Login failed');
        setIsError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An unexpected error occurred.");
      setIsError(true);
    }
  };

  // ... (rest of your JSX is the same) ...
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          {message && (
            <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
              {message}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>

          <Link href="/register" className={styles.link}>
            Don&apos;t have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
}