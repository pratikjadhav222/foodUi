import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../src/context/AuthContext';
import { useCart } from '../../../src/context/CartContext';
import RestaurantCard from '../../../src/components/RestaurantCard';
import { RESTAURANTS, CATEGORIES } from '../../../src/constants/data';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../src/constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = RESTAURANTS.filter(r =>
    (selectedCategory === 'All' || r.cuisine.includes(selectedCategory)) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey, {user?.name?.split(' ')[0]} 👋</Text>
          <Text style={styles.subGreeting}>What are you craving today?</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/(app)/(home)/cart')}>
          <Ionicons name="cart-outline" size={22} color={COLORS.text} />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={COLORS.textDim} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          placeholderTextColor={COLORS.textDim}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoriesContent}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, selectedCategory === cat && styles.chipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Restaurants List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>😕</Text>
            <Text style={styles.emptyText}>No restaurants found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  greeting: { color: COLORS.text, fontSize: FONT_SIZE.xl, fontWeight: '800' },
  subGreeting: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 2 },
  cartBtn: { backgroundColor: COLORS.card, padding: SPACING.sm, borderRadius: RADIUS.round, position: 'relative', borderWidth: 1, borderColor: COLORS.border },
  cartBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: COLORS.primary, borderRadius: 9999, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: COLORS.white, fontSize: 9, fontWeight: '800' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, marginHorizontal: SPACING.lg, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, gap: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md, paddingVertical: 12 },
  categories: { marginTop: SPACING.md, maxHeight: 48 },
  categoriesContent: { paddingHorizontal: SPACING.lg, flexDirection: 'row', alignItems: 'center' },
  chip: { backgroundColor: COLORS.card, borderRadius: RADIUS.round, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.sm, height: 36, justifyContent: 'center', alignItems: 'center' },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, fontWeight: '600', lineHeight: 18 },
  chipTextActive: { color: COLORS.white },
  list: { padding: SPACING.lg, paddingTop: SPACING.md },
  empty: { alignItems: 'center', paddingTop: SPACING.xxl },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: COLORS.textDim, fontSize: FONT_SIZE.lg, marginTop: SPACING.md },
});
