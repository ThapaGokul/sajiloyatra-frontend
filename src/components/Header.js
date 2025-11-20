'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

export default function Header() {
  const { user, logout, isLoading } = useAuth(); // Get auth state and functions
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClassName = `${styles.header} ${isScrolled ? styles.solid : ''}`;
  const navClassName = `${styles.nav} ${isMenuOpen ? styles.open : ''}`;

  return (
    <header className={headerClassName}>

  
      <div className={styles.utilityNav}>
        <Link href="#">Visitor Guide</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Weather</Link>
      </div>
      <div className={styles.mainNav}>
        <Link href="/" className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h18L12 4 3 20zm4-4l5-9 5 9H7z" />
          </svg>

          {/* A div to hold the stacked text */}
          <div className={styles.logoText}>
            <span>SAJILO</span>
            <span>YATRA</span>
          </div>
        </Link>

        {/* The Hamburger Button */}
        <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg viewBox="0 0 100 80" width="25" height="25">
            <rect width="100" height="15"></rect>
            <rect y="30" width="100" height="15"></rect>
            <rect y="60" width="100" height="15"></rect>
          </svg>
        </button>

        {/* The Navigation */}
        <nav className={navClassName}>
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/locals">Find a Local</Link>
          <Link href="/guides">Local Guides</Link>

          {!isLoading && (
            user ? (
              <>
                <Link href="/profile">Profile</Link>
                <button onClick={logout} className={styles.logoutButton}>Logout</button>
              </>
            ) : (
              <>
                {/* --- Links for Logged-out Users --- */}
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}