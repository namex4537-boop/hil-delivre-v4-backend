/**
 * ============================================================
 * Hil_Delivre v4 — Navigation Client
 * ============================================================
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/client/HomeScreen';
import MenuScreen from '../screens/client/MenuScreen';
import CartScreen from '../screens/client/CartScreen';
import CheckoutScreen from '../screens/client/CheckoutScreen';
import PaymentSelectionScreen from '../screens/client/PaymentSelectionScreen';
import PaymentConfirmationScreen from '../screens/client/PaymentConfirmationScreen';
import DeliveryTrackingScreen from '../screens/client/DeliveryTrackingScreen';
import RatingScreen from '../screens/client/RatingScreen';
import LoyaltyScreen from '../screens/client/LoyaltyScreen';
import RealtimeMapScreen from '../screens/client/RealtimeMapScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="PaymentSelection" component={PaymentSelectionScreen} />
      <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
      <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
      <Stack.Screen name="RealtimeMap" component={RealtimeMapScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
    </Stack.Navigator>
  );
}

export default function ClientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#1A1A2E',
          borderTopColor: '#333',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="LoyaltyTab"
        component={LoyaltyScreen}
        options={{
          tabBarLabel: 'Fidélité',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⭐</Text>,
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Alertes',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔔</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
