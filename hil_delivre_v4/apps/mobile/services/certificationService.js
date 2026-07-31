import { API_BASE_URL } from '../config/api';

const REQUEST_TIMEOUT = 15000;

async function request(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erreur serveur');
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Délai de requête dépassé, veuillez réessayer.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitCertification(token, certificationData) {
  return request('/api/certification/submit', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(certificationData),
  });
}

export async function getCertificationStatus(token) {
  return request('/api/certification/status', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function uploadDocument(token, formData) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(`${API_BASE_URL}/api/certification/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
      signal: controller.signal,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erreur upload');
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Délai d\'envoi dépassé, veuillez réessayer.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}