import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../src/constants/theme';

const MOCK_ORDERS = [
  { id: 'o1', restaurant: 'Burger Palace', items: 'Classic Burger × 2, Cheese Fries', total: 497, status: 'Delivered', date: 'May 20, 2026', emoji: '🍔' },
  { id: 'o2', restaurant: 'Pizza Villa', items: 'Margherita Pizza × 1', total: 338, status: 'Delivered', date: 'May 18, 2026', emoji: '🍕' },
  { id: 'o3', restaurant: 'Taco Fiesta', items: 'Chicken Taco × 3, Nachos', total: 736, status: 'Cancelled', date: 'May 15, 2026', emoji: '🌮' },
];

export default function OrdersScreen() {
  const { items, totalItems, totalPrice } = useCart();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Your Orders</Text>

      {/* Active Cart Preview */}
      {items.length > 0 && (
        <View style={styles.activeCart}>
          <View style={styles.activeCartLeft}>
            <View style={styles.dot} />
            <View>
              <Text style={styles.activeLabel}>Cart Active</Text>
              <Text style={styles.activeDetail}>{totalItems} items · ₹{totalPrice}</Text>
            </View>
          </View>
          <Ionicons name="cart" size={20} color={COLORS.primary} />
        </View>
      )}

      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderEmoji}>{item.emoji}</Text>
              <View style={styles.orderInfo}>
                <Text style={styles.orderRestaurant}>{item.restaurant}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
              <View style={[styles.statusBadge, item.status === 'Cancelled' && styles.cancelledBadge]}>
                <Text style={[styles.statusText, item.status === 'Cancelled' && styles.cancelledText]}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.orderItems}>{item.items}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>₹{item.total}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textDim} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyText}>No past orders yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  title: { color: COLORS.text, fontSize: FONT_SIZE.xxl, fontWeight: '800', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  activeCart: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.card, marginHorizontal: SPACING.lg, borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.primary, marginBottom: SPACING.sm },
  activeCartLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  activeLabel: { color: COLORS.text, fontWeight: '700', fontSize: FONT_SIZE.md },
  activeDetail: { color: COLORS.textDim, fontSize: FONT_SIZE.sm },
  list: { padding: SPACING.lg },
  orderCard: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  orderHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  orderEmoji: { fontSize: 32 },
  orderInfo: { flex: 1 },
  orderRestaurant: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '700' },
  orderDate: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, marginTop: 2 },
  statusBadge: { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: RADIUS.round, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  cancelledBadge: { backgroundColor: 'rgba(239,68,68,0.15)' },
  statusText: { color: COLORS.success, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  cancelledText: { color: COLORS.error },
  orderItems: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: SPACING.sm, marginLeft: 44 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.sm, marginLeft: 44 },
  orderTotal: { color: COLORS.primary, fontWeight: '800', fontSize: FONT_SIZE.md },
  empty: { alignItems: 'center', paddingTop: SPACING.xxl },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: COLORS.textDim, fontSize: FONT_SIZE.lg, marginTop: SPACING.md },
});
