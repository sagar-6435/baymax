import { apiClient } from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  login: async (email, password) => {
    const response = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    }
    return response;
  },

  register: async (name, email, password, phone = '') => {
    const response = await apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone }),
    });

    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    }
    return response;
  },

  googleLogin: async (idToken) => {
    try {
      const response = await apiClient('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      });

      if (response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error('Google Sign-In backend Error:', error);
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  },
};
