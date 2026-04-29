import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Animated, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';

const { height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // Entrance animation
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 700, delay: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, loading]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Purple top glow strip */}
      <View style={styles.glowStrip} />

      <ScrollView contentContainerStyle={styles.scroll} bounces={false}>
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          {/* Logo circle */}
          <View style={styles.logoCircle}>
            <MaterialIcons name="home-repair-service" size={44} color={Colors.primary} />
          </View>

          {/* Brand name */}
          <Text style={styles.brand}>Homezy</Text>

          {/* Tagline */}
          <Text style={styles.headline}>Professional home services at your doorstep</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Reliable, affordable, and expert services for every home need. Trusted by thousands across the city.
          </Text>

          {/* Feature pills */}
          <View style={styles.pillRow}>
            {['Verified Pros', 'On-time Arrival', 'Guaranteed Work'].map((f) => (
              <View key={f} style={styles.pill}>
                <MaterialIcons name="check-circle" size={13} color={Colors.primary} />
                <Text style={styles.pillText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* CTA Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push('/login')}
              activeOpacity={0.85}
            >
              <MaterialIcons name="home" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>I'm a Household</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push('/login')}
              activeOpacity={0.85}
            >
              <MaterialIcons name="build" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.secondaryBtnText}>I'm a Service Provider</Text>
            </TouchableOpacity>
          </View>

          {/* Skip link */}
          <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} style={styles.skipRow}>
            <Text style={styles.skipText}>Browse without signing in</Text>
            <MaterialIcons name="arrow-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  glowStrip: {
    height: 4,
    backgroundColor: Colors.primary,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing['2xl'],
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadow.lg,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  brand: {
    fontSize: Typography['3xl'],
    fontFamily: 'Manrope-Black',
    color: Colors.primary,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
  },
  headline: {
    fontSize: Typography.xl,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.base,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  pillText: {
    fontSize: Typography.xs,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.primary,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.base,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    ...Shadow.md,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: Typography.md,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryBtnText: {
    color: Colors.primary,
    fontFamily: 'Manrope-Bold',
    fontSize: Typography.md,
  },
  skipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.base,
  },
  skipText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Medium',
    color: Colors.primary,
  },
});
