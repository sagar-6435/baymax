import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Prefer environment variable. If missing, fallback to 10.0.2.2 only on emulator.
// The user's env file sets it to 192.168.29.254.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://baymax-z27h.onrender.com/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

  const config = {
    ...options,
    headers,
    signal: controller.signal,
  };

  const url = `${API_BASE_URL}${endpoint}`;
  
  if (__DEV__) {
    console.log(`[API Request] ${options.method || 'GET'} ${url}`);
  }

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (__DEV__) {
      console.log(`[API Response] ${options.method || 'GET'} ${url} - Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    let data = null;

    // Safely parse JSON if it exists
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(data?.message || `HTTP Error ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error('Request timed out after 10 seconds. Is the server running and accessible on the same Wi-Fi?');
      if (__DEV__) console.error(`[API Error] Timeout: ${url}`, timeoutError);
      throw timeoutError;
    }
    
    if (__DEV__) {
      console.error(`[API Error] Failed: ${url}`, error.message);
    }
    throw error;
  }
};
