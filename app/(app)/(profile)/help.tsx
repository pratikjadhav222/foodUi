import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../src/constants/theme';

const FAQ = [
  { q: 'How do I track my order?', a: 'Go to the Orders tab to view live tracking for active orders.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 2 minutes of placing them.' },
  { q: 'How are delivery fees calculated?', a: 'Fees are based on distance and vary by restaurant.' },
  { q: 'Is my payment information safe?', a: 'Yes, all payments are encrypted and processed securely.' },
];

const CONTACT = [
  { label: 'Chat with us', icon: 'chatbubble-outline' as const, color: COLORS.primary },
  { label: 'Email Support', icon: 'mail-outline' as const, color: COLORS.accent },
  { label: 'Call Us', icon: 'call-outline' as const, color: COLORS.success },
];

export default function Help() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Contact options */}
        <View style={styles.contactRow}>
          {CONTACT.map(c => (
            <TouchableOpacity key={c.label} style={styles.contactCard}>
              <Ionicons name={c.icon} size={24} color={c.color} />
              <Text style={styles.contactLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQ.map((item, i) => (
          <View key={i} style={styles.faqCard}>
            <View style={styles.faqQ}>
              <Ionicons name="help-circle" size={16} color={COLORS.primary} />
              <Text style={styles.question}>{item.q}</Text>
            </View>
            <Text style={styles.answer}>{item.a}</Text>
          </View>
        ))}

        <Text style={styles.footer}>Need more help? Email us at support@foodapp.com</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACING.lg, gap: SPACING.md },
  contactRow: { flexDirection: 'row', gap: SPACING.sm },
  contactCard: { flex: 1, alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, gap: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  contactLabel: { color: COLORS.text, fontSize: FONT_SIZE.xs, fontWeight: '600', textAlign: 'center' },
  sectionTitle: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: SPACING.sm },
  faqCard: { backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm },
  faqQ: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.xs },
  question: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600', flex: 1 },
  answer: { color: COLORS.textDim, fontSize: FONT_SIZE.sm, lineHeight: 20 },
  footer: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, textAlign: 'center', marginTop: SPACING.md },
});
