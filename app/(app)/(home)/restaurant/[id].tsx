import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RESTAURANTS } from '../../../../src/constants/data';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../../src/constants/theme';
import MenuItemCard from '../../../../src/components/MenuItemCard';
import { useTabBar } from '../../../../src/context/TabBarContext';
import { useCart } from '../../../../src/context/CartContext';

export default function RestaurantDetail() {
  const { id, name, price } = useLocalSearchParams<{ id: string; name: string; price: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const { setTabBarVisible } = useTabBar();
  const { totalItems, totalPrice } = useCart();

  const restaurant = RESTAURANTS.find(r => r.id === id);

  // Hide tab bar when on this screen
  useEffect(() => {
    setTabBarVisible(false);
    return () => setTabBarVisible(true);
  }, []);

  // Set dynamic header title from params
  useLayoutEffect(() => {
    navigation.setOptions({ title: name ?? restaurant?.name ?? 'Restaurant' });
  }, [name, restaurant]);

  if (!restaurant) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Restaurant not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categories = [...new Set(restaurant.menuItems.map(i => i.category))];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <Image source={{ uri: restaurant.image }} style={styles.hero} resizeMode="cover" />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.restName}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>

          <View style={styles.metaRow}>
            <View style={styles.meta}>
              <Ionicons name="star" size={14} color={COLORS.accent} />
              <Text style={styles.metaText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.meta}>
              <Ionicons name="time-outline" size={14} color={COLORS.textDim} />
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.meta}>
              <Ionicons name="bicycle-outline" size={14} color={COLORS.textDim} />
              <Text style={styles.metaText}>₹{restaurant.deliveryFee} delivery</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.primary} />
            <Text style={styles.address}>{restaurant.address}</Text>
          </View>

          {/* Explicit param display — proves params are passed from Home */}
          {price ? (
            <View style={styles.paramBadge}>
              <Ionicons name="pricetag-outline" size={13} color={COLORS.accent} />
              <Text style={styles.paramText}>Price range: {price}</Text>
            </View>
          ) : null}
        </View>

        {/* Menu by category */}
        {categories.map(cat => (
          <View key={cat} style={styles.section}>
            <Text style={styles.sectionTitle}>{cat}</Text>
            {restaurant.menuItems
              .filter(i => i.category === cat)
              .map(item => (
                <MenuItemCard key={item.id} item={item} restaurantId={restaurant.id} restaurantName={restaurant.name} />
              ))}
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart CTA */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartCount}>{totalItems} item{totalItems > 1 ? 's' : ''}</Text>
            <Text style={styles.cartTotal}>₹{totalPrice}</Text>
          </View>
          {/* navigate programmatically */}
          <TouchableOpacity onPress={() => router.push('/(app)/(home)/cart')} style={styles.cartBtn}>
            <Text style={styles.cartBtnText}>View Cart</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.bg },
  error: { color: COLORS.textDim, fontSize: FONT_SIZE.lg },
  backLink: { color: COLORS.primary, marginTop: SPACING.md, fontSize: FONT_SIZE.md },
  hero: { width: '100%', height: 240 },
  infoCard: { backgroundColor: COLORS.card, margin: SPACING.md, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  restName: { color: COLORS.text, fontSize: FONT_SIZE.xxl, fontWeight: '800' },
  cuisine: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 4 },
  metaRow: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.md },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: COLORS.textDim, fontSize: FONT_SIZE.sm },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: SPACING.sm },
  address: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, flex: 1 },
  paramBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: SPACING.sm, backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: RADIUS.round, paddingHorizontal: SPACING.sm, paddingVertical: 4, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(255,215,0,0.25)' },
  paramText: { color: COLORS.accent, fontSize: FONT_SIZE.xs, fontWeight: '600' },
  section: { paddingHorizontal: SPACING.md, marginBottom: SPACING.sm },
  sectionTitle: { color: COLORS.primary, fontSize: FONT_SIZE.md, fontWeight: '700', marginBottom: SPACING.sm, marginTop: SPACING.sm },
  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.card, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border },
  cartCount: { color: COLORS.textDim, fontSize: FONT_SIZE.xs },
  cartTotal: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: '800' },
  cartBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.md, gap: SPACING.sm },
  cartBtnText: { color: COLORS.white, fontWeight: '700', fontSize: FONT_SIZE.md },
});
