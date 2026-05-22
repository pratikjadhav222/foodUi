import React from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../../src/components/CustomDrawerContent';
import { COLORS } from '../../../src/constants/theme';

export default function ProfileDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.card },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '700' },
        drawerStyle: { backgroundColor: COLORS.card, width: 280 },
        overlayColor: COLORS.overlay,
        swipeEdgeWidth: 80,
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Profile', drawerLabel: 'Profile' }} />
      <Drawer.Screen name="my-orders" options={{ title: 'My Orders', drawerLabel: 'My Orders' }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings', drawerLabel: 'Settings' }} />
      <Drawer.Screen name="help" options={{ title: 'Help & Support', drawerLabel: 'Help' }} />
    </Drawer>
  );
}
