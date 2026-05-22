import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Restaurant } from '../types';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../constants/theme';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(app)/(home)/restaurant/[id]',
      params: { id: restaurant.id, name: restaurant.name, price: restaurant.priceRange },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: restaurant.image }} style={styles.image} resizeMode="cover" />
        {!restaurant.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={11} color={COLORS.white} />
          <Text style={styles.timeText}>{restaurant.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={11} color={COLORS.accent} />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.cuisine} numberOfLines={1}>{restaurant.cuisine}</Text>

        <View style={styles.row}>
          <Text style={styles.meta}>₹{restaurant.deliveryFee} delivery</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{restaurant.priceRange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, marginBottom: SPACING.md, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  imageWrapper: { position: 'relative', height: 170 },
  image: { width: '100%', height: '100%' },
  closedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.overlay, alignItems: 'center', justifyContent: 'center' },
  closedText: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '700' },
  timeBadge: { position: 'absolute', bottom: SPACING.sm, right: SPACING.sm, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.65)', paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.round, gap: 3 },
  timeText: { color: COLORS.white, fontSize: FONT_SIZE.xs, fontWeight: '600' },
  info: { padding: SPACING.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: '700', flex: 1 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 7, paddingVertical: 3, borderRadius: RADIUS.round, gap: 3 },
  rating: { color: COLORS.accent, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  cuisine: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginVertical: SPACING.xs },
  meta: { color: COLORS.textDim, fontSize: FONT_SIZE.sm },
  dot: { color: COLORS.border, marginHorizontal: SPACING.xs },
});
