'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";   // 👈 import useRouter
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // 👈 initialize router

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
        // Optional: fetch user info here
      }
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      const jwtToken = response.data.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", jwtToken);
      }

      setToken(jwtToken);
      setUser({ email });

      console.log("✅ Login successful. Token saved:", jwtToken);

      // 👇 Redirect to home after successful login
      router.push("/");
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("userToken");
    }

    // 👇 Optional: redirect to login page after logout
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);