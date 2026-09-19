import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your computer's local IP address if running on a physical device
const API_BASE_URL = 'http://192.168.1.4:5000/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
};
