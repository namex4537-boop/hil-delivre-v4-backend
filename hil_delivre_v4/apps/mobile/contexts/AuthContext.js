/**
 * ============================================================
 * Hil_Delivre v4 — AuthContext
 * ============================================================
 */

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const userData = await AsyncStorage.getItem('user_data');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('[AuthContext] Erreur:', error.message);
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_data']);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password }, { requireAuth: false });
      const result = response.data || response;
      if (result.access_token) {
        await AsyncStorage.setItem('access_token', result.access_token);
        if (result.refresh_token) {
          await AsyncStorage.setItem('refresh_token', result.refresh_token);
        }
        await AsyncStorage.setItem('user_data', JSON.stringify(result.user));
        setUser(result.user);
        return result.user;
      }
      throw new Error('Réponse inattendue du serveur.');
    } catch (error) {
      throw error;
    }
  }

  async function register(userData) {
    try {
      const response = await api.post('/auth/register', userData, { requireAuth: false });
      const result = response.data || response;
      if (result.access_token) {
        await AsyncStorage.setItem('access_token', result.access_token);
        if (result.refresh_token) {
          await AsyncStorage.setItem('refresh_token', result.refresh_token);
        }
        await AsyncStorage.setItem('user_data', JSON.stringify(result.user));
        setUser(result.user);
        return result.user;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout', {}).catch(() => {});
    } finally {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_data']);
      setUser(null);
    }
  }

  async function updateUserLocal(updatedFields) {
    const newUser = { ...user, ...updatedFields };
    setUser(newUser);
    await AsyncStorage.setItem('user_data', JSON.stringify(newUser));
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUserLocal }}>
      {children}
    </AuthContext.Provider>
  );
}
