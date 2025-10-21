// [REACT COMPONENT] /src/app/login/page.js
"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from 'next/link';
import styles from '../../app/page.module.css'; // 1. Import the global styles

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await login(email, password);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <main>
      {/* 2. Apply the container and form classNames */}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p style={{ textAlign: 'center', color: '#555', marginTop: '-20px', marginBottom: '30px' }}>
            Sign in to continue your journey.
          </p>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          {message && <p style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>{message}</p>}

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            Don&apos;t have an account? <Link href="/register" style={{ color: '#3498db' }}>Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}