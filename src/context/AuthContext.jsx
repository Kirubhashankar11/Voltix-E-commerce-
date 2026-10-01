import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('voltix-user');
    return saved ? JSON.parse(saved) : null;
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('voltix-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('voltix-user');
    }
  }, [user]);

  const login = (email, password) => {
    // Dummy login simulation
    const fakeUser = {
      id: "u" + Date.now(),
      name: email.split('@')[0],
      email: email
    };
    setUser(fakeUser);
    showToast("Login successful!", "success");
    return true;
  };

  const signup = (userData) => {
    // Dummy signup simulation
    const fakeUser = {
      id: "u" + Date.now(),
      name: userData.name,
      email: userData.email
    };
    setUser(fakeUser);
    showToast("Account created successfully!", "success");
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast("Logged out successfully.", "success");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
