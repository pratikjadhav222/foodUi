import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { useAuth } from '../../../src/context/AuthContext';
import { useCart } from '../../../src/context/CartContext';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../src/constants/theme';

const STATS = [
  { label: 'Orders', value: '12', icon: 'receipt-outline' as const },
  { label: 'Saved', value: '5', icon: 'heart-outline' as const },
  { label: 'Points', value: '840', icon: 'star-outline' as const },
];

const MENU_ITEMS = [
  { label: 'My Orders', icon: 'receipt-outline' as const, subtitle: 'View order history' },
  { label: 'Saved Addresses', icon: 'location-outline' as const, subtitle: 'Manage delivery addresses' },
  { label: 'Payment Methods', icon: 'card-outline' as const, subtitle: 'Cards, UPI, Wallet' },
  { label: 'Notifications', icon: 'notifications-outline' as const, subtitle: 'Manage alerts' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const navigation = useNavigation();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() ?? 'U';

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          clearCart();
          await logout();
          // reset: clear all navigation state and send user to auth
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: '(auth)' }],
            })
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          {/* Open drawer button */}
          <TouchableOpacity style={styles.menuBtn} onPress={openDrawer}>
            <Ionicons name="menu" size={20} color={COLORS.primary} />
            <Text style={styles.menuBtnText}>Open Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {STATS.map(s => (
            <View key={s.label} style={styles.statBox}>
              <Ionicons name={s.icon} size={20} color={COLORS.primary} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu list */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity key={item.label} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={18} color={COLORS.primary} />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textDim} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.lg },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  initials: { color: COLORS.white, fontSize: FONT_SIZE.xxl, fontWeight: '800' },
  name: { color: COLORS.text, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  email: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 4 },
  menuBtn: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginTop: SPACING.md, backgroundColor: COLORS.card, borderRadius: RADIUS.round, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderWidth: 1, borderColor: COLORS.primary },
  menuBtnText: { color: COLORS.primary, fontWeight: '600', fontSize: FONT_SIZE.sm },
  stats: { flexDirection: 'row', marginHorizontal: SPACING.lg, backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  statBox: { flex: 1, alignItems: 'center', gap: SPACING.xs },
  statValue: { color: COLORS.text, fontSize: FONT_SIZE.xl, fontWeight: '800' },
  statLabel: { color: COLORS.textDim, fontSize: FONT_SIZE.xs },
  menuSection: { marginTop: SPACING.lg, marginHorizontal: SPACING.md },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  menuIcon: { width: 36, height: 36, borderRadius: RADIUS.sm, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.sm },
  menuText: { flex: 1 },
  menuLabel: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600' },
  menuSubtitle: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, marginTop: 2 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, margin: SPACING.lg, backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' },
  logoutText: { color: COLORS.error, fontSize: FONT_SIZE.md, fontWeight: '700' },
});
