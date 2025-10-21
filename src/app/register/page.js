// [REACT COMPONENT] /src/app/register/page.js
"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import styles from '../../app/page.module.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneNumber: "", password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (formData.password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      setMessage("Registration successful! Logging you in...");
      await login(formData.email, formData.password);
    } catch (error) {
      setMessage(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="firstName">First Name</label>
              {/* --- Change is on the next line --- */}
              <input type="text" id="firstName" name="firstName" onChange={handleChange} required style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              {/* --- Change is on the next line --- */}
              <input type="text" id="lastName" name="lastName" onChange={handleChange} required style={{ width: '100%' }} />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} required />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit">Create Account</button>
          {message && <p style={{ textAlign: "center", marginTop: "15px", color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
        </form>
      </div>
    </main>
  );
}