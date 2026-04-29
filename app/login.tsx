import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Animated,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [phone,        setPhone]        = useState('');
  const [otp,          setOtp]          = useState('');
  const [otpSent,      setOtpSent]      = useState(false);
  const [errorMsg,     setErrorMsg]     = useState('');
  const [isLoading,    setIsLoading]    = useState(false);

  // Animate OTP field in
  const otpOpacity   = useRef(new Animated.Value(0)).current;
  const otpTranslate = useRef(new Animated.Value(-20)).current;

  const showOtpField = () => {
    Animated.parallel([
      Animated.timing(otpOpacity,   { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(otpTranslate, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setErrorMsg('Enter a valid 10-digit phone number');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    try {
      // ── Backend Integration Point ──────────────────────────
      // Replace with: await api.post('/auth/send-otp', { phone });
      await new Promise(r => setTimeout(r, 800)); // simulated delay
      setOtpSent(true);
      showOtpField();
    } catch {
      setErrorMsg('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setErrorMsg('Enter a valid OTP');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    try {
      // ── Backend Integration Point ──────────────────────────
      // Replace with: const { user, token } = await api.post('/auth/verify-otp', { phone, otp });
      await new Promise(r => setTimeout(r, 800));
      await login({ id: phone, name: 'Homezy User', email: '' }, 'demo-token');
      router.replace('/(tabs)/home');
    } catch {
      setErrorMsg('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="home-repair-service" size={28} color={Colors.primary} />
            </View>
            <Text style={styles.heading}>Sign in to Homezy</Text>
            <Text style={styles.subheading}>Enter your phone number to continue</Text>
          </View>

          {/* Phone input */}
          <View style={styles.card}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={[styles.inputRow, otpSent && styles.inputDisabled]}>
              <Text style={styles.countryCode}>🇮🇳 +91</Text>
              <TextInput
                style={styles.input}
                placeholder="98765 43210"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                editable={!otpSent}
              />
              {otpSent && (
                <MaterialIcons name="check-circle" size={20} color={Colors.success} />
              )}
            </View>

            {/* OTP input (animated in) */}
            {otpSent && (
              <Animated.View style={{ opacity: otpOpacity, transform: [{ translateY: otpTranslate }] }}>
                <Text style={[styles.label, { marginTop: Spacing.base }]}>OTP</Text>
                <View style={styles.inputRow}>
                  <MaterialIcons name="lock" size={20} color={Colors.textSecondary} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                    autoFocus
                  />
                </View>
                <TouchableOpacity onPress={() => { setOtpSent(false); setOtp(''); }}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* Error */}
            {errorMsg ? (
              <View style={styles.errorRow}>
                <MaterialIcons name="error-outline" size={15} color={Colors.error} />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* CTA */}
            <TouchableOpacity
              style={[styles.submitBtn, isLoading && styles.disabled]}
              onPress={otpSent ? handleVerifyOtp : handleSendOtp}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.submitBtnText}>{otpSent ? 'Verify & Sign In' : 'Send OTP'}</Text>
              }
            </TouchableOpacity>
          </View>

          <Text style={styles.terms}>
            By continuing, you agree to Homezy's{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:      { flex: 1, backgroundColor: Colors.background },
  safeArea:  { flex: 1 },
  scroll:    { flexGrow: 1, padding: Spacing.xl },
  backBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadow.sm,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoCircle: {
    width: 64, height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  heading: {
    fontSize: Typography['2xl'],
    fontFamily: 'Manrope-Black',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subheading: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    ...Shadow.md,
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Bold',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  inputDisabled: {
    borderColor: Colors.success + '80',
    backgroundColor: Colors.success + '10',
  },
  countryCode: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.textPrimary,
    marginRight: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Typography.md,
    fontFamily: 'Manrope-Medium',
    color: Colors.textPrimary,
  },
  resendLink: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.primary,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Medium',
    color: Colors.error,
  },
  submitBtn: {
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
    ...Shadow.lg,
  },
  disabled: { opacity: 0.65 },
  submitBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: Typography.md,
  },
  terms: {
    fontSize: Typography.xs,
    fontFamily: 'Manrope-Regular',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: Colors.primary,
    fontFamily: 'Manrope-SemiBold',
  },
});
