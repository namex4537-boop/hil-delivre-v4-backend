/**
 * ============================================================
 * Hil_Delivre v4 — Navigation Marchand
 * ============================================================
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/client/HomeScreen';
import CertificationScreen from '../screens/merchant/CertificationScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Tab = createBottomTabNavigator();

export default function MerchantNavigator() {
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
        name="DashboardTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="CertificationTab"
        component={CertificationScreen}
        options={{
          tabBarLabel: 'Certification',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>✅</Text>,
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
