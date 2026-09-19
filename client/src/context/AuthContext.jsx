import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false); // Renamed from hasSeenOnboarding for clarity
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@dark_mode');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'true');
        }
        
        const seenWelcome = await AsyncStorage.getItem('@has_seen_welcome');
        if (seenWelcome === 'true') {
          setHasSeenWelcome(true);
        }

        const userData = await AsyncStorage.getItem('userData');
        const token = await AsyncStorage.getItem('userToken');
        if (userData && token) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
          setHasSeenWelcome(true);
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setIsReady(true);
      }
    };
    loadSettings();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    setIsAuthenticated(true);
    setHasSeenWelcome(true);
    await AsyncStorage.setItem('@has_seen_welcome', 'true');
    return response;
  };

  const register = async (name, email, password, phone = '') => {
    const response = await authService.register(name, email, password, phone);
    setUser(response.user);
    setIsAuthenticated(true);
    setHasSeenWelcome(true);
    await AsyncStorage.setItem('@has_seen_welcome', 'true');
    return response;
  };

  const googleLogin = async (idToken) => {
    const response = await authService.googleLogin(idToken);
    setUser(response.user);
    setIsAuthenticated(true);
    setHasSeenWelcome(true);
    await AsyncStorage.setItem('@has_seen_welcome', 'true');
    return response;
  };

  const updateUser = async (newUserData) => {
    setUser(newUserData);
    await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // Don't reset hasSeenWelcome so users skip the splash/welcome screens next time
  };

  const completeWelcome = async () => {
    setHasSeenWelcome(true);
    await AsyncStorage.setItem('@has_seen_welcome', 'true');
  };

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('@dark_mode', newValue.toString());
      if (__DEV__ && DevSettings && DevSettings.reload) {
        DevSettings.reload();
      }
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  const setDarkMode = async (value) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem('@dark_mode', value.toString());
      if (__DEV__ && DevSettings && DevSettings.reload) {
        DevSettings.reload();
      }
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  if (!isReady) {
    return null; // Or a splash screen
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      googleLogin,
      logout,
      updateUser,
      isAuthenticated,
      hasSeenWelcome,
      completeWelcome,
      isDarkMode,
      toggleDarkMode,
      setDarkMode,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
