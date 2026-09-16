import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (value) => {
    setIsDarkMode(value);
  };

  return (
    <AuthContext.Provider value={{
      isOnboardingCompleted,
      completeOnboarding,
      isDarkMode,
      toggleDarkMode,
      setDarkMode,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
