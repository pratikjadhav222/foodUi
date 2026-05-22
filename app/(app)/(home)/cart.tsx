import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../src/context/CartContext';
import { useTabBar } from '../../../src/context/TabBarContext';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../src/constants/theme';
import { CartItem } from '../../../src/types';

export default function CartScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart();
  const { setTabBarVisible } = useTabBar();

  // Hide tab bar on cart
  useEffect(() => {
    setTabBarVisible(false);
    return () => setTabBarVisible(true);
  }, []);

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed! 🎉', 'Your food is on its way!', [
      {
        text: 'View Orders',
        onPress: () => {
          clearCart();
          // reset: pop entire home stack back to tab root, then navigate to orders
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: '(home)' }],
            })
          );
          router.navigate('/(app)/orders');
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemRow}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemRestaurant}>{item.restaurantName}</Text>
        <Text style={styles.itemPrice}>₹{item.price} each</Text>
      </View>
      <View style={styles.qtyControls}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => removeItem(item.id)}>
          <Ionicons name="remove" size={14} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => addItem(item, item.restaurantId, item.restaurantName)}>
          <Ionicons name="add" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add items from a restaurant</Text>
        {/* goBack demo */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.listHeader}>{totalItems} item{totalItems > 1 ? 's' : ''} in your cart</Text>
        }
      />

      {/* Summary & Checkout */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{totalPrice}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery fee</Text>
          <Text style={styles.summaryValue}>₹39</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{totalPrice + 39}</Text>
        </View>

        <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.white} />
          <Text style={styles.orderBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  list: { padding: SPACING.lg },
  listHeader: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginBottom: SPACING.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  itemInfo: { flex: 1 },
  itemName: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600' },
  itemRestaurant: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, marginTop: 2 },
  itemPrice: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 4 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, borderRadius: RADIUS.sm },
  qtyBtn: { padding: SPACING.xs + 2 },
  qty: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '700', minWidth: 24, textAlign: 'center' },
  itemTotal: { color: COLORS.primary, fontWeight: '800', fontSize: FONT_SIZE.md, marginLeft: SPACING.md, minWidth: 50, textAlign: 'right' },
  summary: { backgroundColor: COLORS.card, padding: SPACING.lg, borderTopWidth: 1, borderTopColor: COLORS.border, gap: SPACING.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { color: COLORS.textDim, fontSize: FONT_SIZE.md },
  summaryValue: { color: COLORS.text, fontSize: FONT_SIZE.md },
  totalRow: { paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: SPACING.xs },
  totalLabel: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: '700' },
  totalValue: { color: COLORS.primary, fontSize: FONT_SIZE.lg, fontWeight: '800' },
  orderBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 16, gap: SPACING.sm, marginTop: SPACING.sm },
  orderBtnText: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '800' },
  empty: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center', gap: SPACING.sm },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { color: COLORS.text, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  emptySubtitle: { color: COLORS.textDim, fontSize: FONT_SIZE.md },
  backBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, marginTop: SPACING.md },
  backBtnText: { color: COLORS.white, fontWeight: '700', fontSize: FONT_SIZE.md },
});
