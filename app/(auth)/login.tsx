import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Animated, Alert, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { COLORS, SPACING, RADIUS, FONT_SIZE } from '../../src/constants/theme';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    const success = await login(email.trim(), password);
    setLoading(false);
    if (success) {
      // navigate replaces auth stack with app
      router.replace('/(app)');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials. Try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.emoji}>🍔</Text>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Sign in to continue ordering</Text>

        <View style={styles.form}>
          <View style={[styles.inputWrap, emailFocused && styles.inputFocused]}>
            <Ionicons name="mail-outline" size={18} color={emailFocused ? COLORS.primary : COLORS.textDim} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={COLORS.textDim}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>

          <View style={[styles.inputWrap, passFocused && styles.inputFocused]}>
            <Ionicons name="lock-closed-outline" size={18} color={passFocused ? COLORS.primary : COLORS.textDim} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor={COLORS.textDim}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={COLORS.textDim} />
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>💡 Any email + password works for demo</Text>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.loginText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', padding: SPACING.lg },
  inner: { alignItems: 'center' },
  emoji: { fontSize: 56 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.xxl, fontWeight: '800', marginTop: SPACING.md },
  subtitle: { color: COLORS.textDim, fontSize: FONT_SIZE.md, marginTop: SPACING.xs, marginBottom: SPACING.xl },
  form: { width: '100%', gap: SPACING.md },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: SPACING.md, gap: SPACING.sm },
  inputFocused: { borderColor: COLORS.primary },
  input: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md, paddingVertical: 14 },
  hint: { color: COLORS.textDim, fontSize: FONT_SIZE.xs, textAlign: 'center' },
  loginBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 16, alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8, marginTop: SPACING.sm },
  loginText: { color: COLORS.white, fontSize: FONT_SIZE.lg, fontWeight: '800' },
});
