import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../../src/constants/theme';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [promos, setPromos] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const SETTINGS = [
    { label: 'Push Notifications', value: notifications, onChange: setNotifications, icon: 'notifications-outline' as const },
    { label: 'Promo Emails', value: promos, onChange: setPromos, icon: 'mail-outline' as const },
    { label: 'Dark Mode', value: darkMode, onChange: setDarkMode, icon: 'moon-outline' as const },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {SETTINGS.map(s => (
            <View key={s.label} style={styles.row}>
              <Ionicons name={s.icon} size={20} color={COLORS.primary} />
              <Text style={styles.label}>{s.label}</Text>
              <Switch
                value={s.value}
                onValueChange={s.onChange}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {['Change Password', 'Update Profile', 'Privacy Policy', 'Terms of Service'].map(item => (
            <TouchableOpacity key={item} style={styles.link}>
              <Text style={styles.linkText}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textDim} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>FoodApp v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACING.lg, gap: SPACING.lg },
  section: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  sectionTitle: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, padding: SPACING.md, paddingBottom: SPACING.xs },
  row: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border, gap: SPACING.sm },
  label: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md },
  link: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border },
  linkText: { color: COLORS.text, fontSize: FONT_SIZE.md },
  version: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, textAlign: 'center' },
});
