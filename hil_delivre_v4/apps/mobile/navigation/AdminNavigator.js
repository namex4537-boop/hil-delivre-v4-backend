/**
 * ============================================================
 * Hil_Delivre v4 — Navigation Admin
 * ============================================================
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import UsersManagementScreen from '../screens/admin/UsersManagementScreen';
import ReconciliationScreen from '../screens/admin/ReconciliationScreen';

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
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
        component={AdminDashboardScreen}
        options={{
          tabBarLabel: 'KPIs',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="UsersTab"
        component={UsersManagementScreen}
        options={{
          tabBarLabel: 'Utilisateurs',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👥</Text>,
        }}
      />
      <Tab.Screen
        name="ReconciliationTab"
        component={ReconciliationScreen}
        options={{
          tabBarLabel: 'Réconciliation',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💰</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
