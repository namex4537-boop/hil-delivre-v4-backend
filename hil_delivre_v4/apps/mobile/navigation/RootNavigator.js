/**
 * ============================================================
 * Hil_Delivre v4 — Navigation Principale
 * ============================================================
 */

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import ClientNavigator from './ClientNavigator';
import MerchantNavigator from './MerchantNavigator';
import DeliveryNavigator from './DeliveryNavigator';
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user.role === 'admin' ? (
          <Stack.Screen name="Admin" component={AdminNavigator} />
        ) : user.role === 'merchant' ? (
          <Stack.Screen name="Merchant" component={MerchantNavigator} />
        ) : user.role === 'delivery' ? (
          <Stack.Screen name="Delivery" component={DeliveryNavigator} />
        ) : (
          <Stack.Screen name="Client" component={ClientNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
