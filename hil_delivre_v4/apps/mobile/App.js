/**
 * ============================================================
 * Hil_Delivre v4 — Point d'entrée de l'application mobile
 * ============================================================
 */

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import RootNavigator from './navigation/RootNavigator';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <RootNavigator />
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
