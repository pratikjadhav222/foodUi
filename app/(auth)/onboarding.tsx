import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../src/constants/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  { emoji: '🍔', title: 'Hungry?', subtitle: 'Order from 500+ restaurants near you in minutes.' },
  { emoji: '⚡', title: 'Fast Delivery', subtitle: 'Hot food at your door — usually under 30 minutes.' },
  { emoji: '🎉', title: 'Great Deals', subtitle: 'Exclusive discounts and offers just for you.' },
];

export default function Onboarding() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();

    // Pulse animation on CTA
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    // use replace so user cannot go back to onboarding
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient colors={['#1A0A00', COLORS.bg, COLORS.bg]} style={styles.gradient} />

      {/* Hero emoji */}
      <Animated.View style={[styles.heroArea, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.heroEmoji}>{SLIDES[0].emoji}</Text>
        <Text style={styles.brand}>FoodApp</Text>
        <Text style={styles.tagline}>
          <Text style={styles.highlight}>Delicious</Text> food,{'\n'}delivered to your door
        </Text>
      </Animated.View>

      {/* Feature pills */}
      <Animated.View style={[styles.features, { opacity: fadeAnim }]}>
        {SLIDES.map((s, i) => (
          <View key={i} style={styles.pill}>
            <Text style={styles.pillEmoji}>{s.emoji}</Text>
            <View>
              <Text style={styles.pillTitle}>{s.title}</Text>
              <Text style={styles.pillSub}>{s.subtitle}</Text>
            </View>
          </View>
        ))}
      </Animated.View>

      {/* CTA */}
      <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%', paddingHorizontal: SPACING.lg }}>
        <TouchableOpacity style={styles.cta} onPress={handleGetStarted} activeOpacity={0.9}>
          <Text style={styles.ctaText}>Get Started 🚀</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.legal}>By continuing you agree to our Terms of Service</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.xxl },
  gradient: { ...StyleSheet.absoluteFillObject },
  heroArea: { alignItems: 'center', marginTop: SPACING.xxl },
  heroEmoji: { fontSize: 90 },
  brand: { color: COLORS.text, fontSize: FONT_SIZE.hero, fontWeight: '900', letterSpacing: -1 },
  tagline: { color: COLORS.textDim, fontSize: FONT_SIZE.xl, textAlign: 'center', marginTop: SPACING.sm, lineHeight: 30 },
  highlight: { color: COLORS.primary, fontWeight: '700' },
  features: { width: '100%', paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, gap: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  pillEmoji: { fontSize: 28 },
  pillTitle: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '700' },
  pillSub: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, marginTop: 2 },
  cta: { backgroundColor: COLORS.primary, borderRadius: RADIUS.xl, paddingVertical: 18, alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.45, shadowRadius: 16, elevation: 10 },
  ctaText: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '800', letterSpacing: 0.5 },
  legal: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, textAlign: 'center' },
});
