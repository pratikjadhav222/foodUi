import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem as MenuItemType } from '../types';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../constants/theme';
import { useCart } from '../context/CartContext';

interface Props {
  item: MenuItemType;
  restaurantId: string;
  restaurantName: string;
}

export default function MenuItemCard({ item, restaurantId, restaurantName }: Props) {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const qty = getItemQuantity(item.id);

  return (
    <View style={styles.card}>
      <View style={styles.vegDot}>
        <View style={[styles.dot, { backgroundColor: item.isVeg ? COLORS.success : COLORS.error }]} />
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>

      <View style={styles.controls}>
        {qty === 0 ? (
          <TouchableOpacity style={styles.addBtn} onPress={() => addItem(item, restaurantId, restaurantName)}>
            <Ionicons name="add" size={18} color={COLORS.white} />
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyRow}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => removeItem(item.id)}>
              <Ionicons name="remove" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => addItem(item, restaurantId, restaurantName)}>
              <Ionicons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  vegDot: { marginRight: SPACING.sm },
  dot: { width: 12, height: 12, borderRadius: 2 },
  details: { flex: 1, marginRight: SPACING.sm },
  name: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600' },
  desc: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 2 },
  price: { color: COLORS.primary, fontSize: FONT_SIZE.md, fontWeight: '700', marginTop: SPACING.xs },
  controls: { alignItems: 'center' },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, gap: 4 },
  addText: { color: COLORS.white, fontSize: FONT_SIZE.sm, fontWeight: '700' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.primary },
  qtyBtn: { padding: SPACING.sm },
  qty: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '700', minWidth: 24, textAlign: 'center' },
});
