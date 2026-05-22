import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../constants/theme';

const DRAWER_ITEMS = [
  { label: 'My Orders', icon: 'receipt-outline' as const, route: '/(app)/(profile)/my-orders' },
  { label: 'Settings', icon: 'settings-outline' as const, route: '/(app)/(profile)/settings' },
  { label: 'Help & Support', icon: 'help-circle-outline' as const, route: '/(app)/(profile)/help' },
];

export default function CustomDrawerContent(props: any) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    // Explicitly use reset to clear entire navigation stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: '(auth)' }],
      })
    );
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() ?? 'U';

  return (
    <View style={styles.container}>
      {/* Header / User Info */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>

      <View style={styles.divider} />

      {/* Navigation Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.items}>
        {DRAWER_ITEMS.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.drawerItem}
            onPress={() => router.push(item.route as any)}
          >
            <Ionicons name={item.icon} size={20} color={COLORS.primary} />
            <Text style={styles.drawerLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      {/* Logout */}
      <View style={styles.divider} />
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.card },
  header: { padding: SPACING.lg, paddingTop: SPACING.xxl + SPACING.lg, alignItems: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  initials: { color: COLORS.white, fontSize: FONT_SIZE.xl, fontWeight: '800' },
  name: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: '700' },
  email: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.md },
  items: { paddingTop: SPACING.sm },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, gap: SPACING.md },
  drawerLabel: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', padding: SPACING.lg, gap: SPACING.md, marginBottom: SPACING.lg },
  logoutText: { color: COLORS.error, fontSize: FONT_SIZE.md, fontWeight: '600' },
});
