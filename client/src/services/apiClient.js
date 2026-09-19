import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://baymax-z27h.onrender.com/api';

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
