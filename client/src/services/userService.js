import { apiClient } from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userService = {
  updateProfile: async (userData) => {
    const response = await apiClient('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    
    if (response) {
      await AsyncStorage.setItem('userData', JSON.stringify(response));
    }
    return response;
  },
  
  getProfile: async () => {
    const response = await apiClient('/users/profile', {
      method: 'GET',
    });
    
    if (response) {
      await AsyncStorage.setItem('userData', JSON.stringify(response));
    }
    return response;
  }
};
