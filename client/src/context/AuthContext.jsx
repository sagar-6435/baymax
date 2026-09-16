import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
  };

  return (
    <AuthContext.Provider value={{ isOnboardingCompleted, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
