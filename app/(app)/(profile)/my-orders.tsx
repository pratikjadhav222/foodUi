import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../src/constants/theme';

const MY_ORDERS = [
  { id: '1', restaurant: 'Burger Palace', items: 'Classic Burger × 2', total: 398, status: 'Delivered', date: 'May 20', emoji: '🍔' },
  { id: '2', restaurant: 'Pizza Villa', items: 'BBQ Chicken Pizza × 1', total: 438, status: 'Delivered', date: 'May 18', emoji: '🍕' },
  { id: '3', restaurant: 'Sushi Zen', items: 'Salmon Nigiri × 2, Veggie Roll', total: 977, status: 'Delivered', date: 'May 12', emoji: '🍣' },
];

export default function MyOrders() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={MY_ORDERS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.restaurant}>{item.restaurant}</Text>
              <Text style={styles.items}>{item.items}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.total}>₹{item.total}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<View style={styles.empty}><Text>No orders yet</Text></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  list: { padding: SPACING.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm },
  emoji: { fontSize: 36 },
  info: { flex: 1 },
  restaurant: { color: COLORS.text, fontWeight: '700', fontSize: FONT_SIZE.md },
  items: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 2 },
  date: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: SPACING.xs },
  total: { color: COLORS.primary, fontWeight: '800', fontSize: FONT_SIZE.md },
  badge: { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: RADIUS.round, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  badgeText: { color: COLORS.success, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  empty: { padding: SPACING.xl, alignItems: 'center' },
});
