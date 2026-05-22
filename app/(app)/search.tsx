import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RESTAURANTS } from '../../src/constants/data';
import RestaurantCard from '../../src/components/RestaurantCard';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../src/constants/theme';

const RECENT = ['Burger Palace', 'Sushi Zen', 'Taco Fiesta'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Search</Text>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={COLORS.textDim} />
        <TextInput
          style={styles.searchInput}
          placeholder="Restaurant, cuisine..."
          placeholderTextColor={COLORS.textDim}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textDim} />
          </TouchableOpacity>
        )}
      </View>

      {query.length === 0 ? (
        <View style={styles.recents}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {RECENT.map(r => (
            <TouchableOpacity key={r} style={styles.recentItem} onPress={() => setQuery(r)}>
              <Ionicons name="time-outline" size={16} color={COLORS.textDim} />
              <Text style={styles.recentText}>{r}</Text>
              <Ionicons name="arrow-up-outline" size={14} color={COLORS.textDim} style={{ transform: [{ rotate: '45deg' }] }} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>No results for "{query}"</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  title: { color: COLORS.text, fontSize: FONT_SIZE.xxl, fontWeight: '800', paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, marginHorizontal: SPACING.lg, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, gap: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md, paddingVertical: 12 },
  recents: { padding: SPACING.lg },
  sectionTitle: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, fontWeight: '700', marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 0.8 },
  recentItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  recentText: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md },
  list: { padding: SPACING.lg },
  empty: { alignItems: 'center', paddingTop: SPACING.xxl },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: COLORS.textDim, fontSize: FONT_SIZE.lg, marginTop: SPACING.md },
});
