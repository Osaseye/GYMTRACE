import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthChange } from "../services/authService";
import { getUserDoc } from "../services/userService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Firebase Auth user
  const [userData, setUserData] = useState(null); // Firestore profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const profile = await getUserDoc(firebaseUser.uid);
          setUserData(profile);
        } catch {
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /** Call after profile updates to refresh context */
  const refreshUserData = async () => {
    if (user) {
      const profile = await getUserDoc(user.uid);
      setUserData(profile);
    }
  };

  const value = { user, userData, loading, refreshUserData };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
