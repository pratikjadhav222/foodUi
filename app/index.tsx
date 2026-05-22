import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { COLORS, FONT_SIZE } from '../src/constants/theme';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <Text style={styles.logo}>🍔</Text>
        <Text style={styles.brand}>FoodApp</Text>
        <ActivityIndicator color={COLORS.primary} style={{ marginTop: 32 }} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)/onboarding" />;
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 64 },
  brand: { color: COLORS.text, fontSize: FONT_SIZE.hero, fontWeight: '800', marginTop: 12 },
});
