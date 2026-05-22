import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../../src/constants/theme';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.card },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '700' },
        headerBackTitle: 'Back',
        contentStyle: { backgroundColor: COLORS.bg },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="restaurant/[id]"
        options={{ title: 'Restaurant', headerStyle: { backgroundColor: COLORS.primary } }}
      />
      <Stack.Screen
        name="cart"
        options={{ title: '🛒 Your Cart', headerStyle: { backgroundColor: COLORS.card } }}
      />
    </Stack>
  );
}
