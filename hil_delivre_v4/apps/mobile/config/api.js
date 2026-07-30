/**
 * ============================================================
 * Hil_Delivre v4 — Configuration API Mobile
 * ============================================================
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_CONFIG = {
  BASE_URL: 'https://reimagined-space-robot-54j56xj6p6f4w6g-3000.app.github.dev/api',
  TIMEOUT: 15000,
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, headers = {}, requireAuth = true } = options;

  try {
    const requestHeaders = { ...defaultHeaders, ...headers };

    if (requireAuth) {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const fetchOptions = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    fetchOptions.signal = controller.signal;

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, fetchOptions);
    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
      }
      const error = new Error(data.message || `Erreur ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('La requête a expiré. Vérifiez votre connexion internet.');
    }
    throw error;
  }
}

const api = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

export { API_CONFIG };
export default api;
