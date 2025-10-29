import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the logged-in user info

  // Function to update the user on login
  const login = (userData) => {
    setCurrentUser(userData);
    // TODO: We'll store a token here later
    console.log("User set in context:", userData);
  };

  // Function to clear user on logout
  const logout = () => {
    setCurrentUser(null);
    // TODO: Clear token later
    console.log("User logged out");
  };

  // The value provided to consuming components
  const value = {
    currentUser,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};