import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Radius } from '@/constants/Theme';

// Map category name to icon & colors matching Fixi_frontend
const CATEGORY_META: Record<string, { icon: string; color: string; bg: string }> = {
  'Electrical': { icon: 'electrical-services', color: '#d97706', bg: '#fef3c7' },
  'Plumbing':   { icon: 'plumbing',            color: '#2563eb', bg: '#dbeafe' },
  'Cleaning':   { icon: 'cleaning-services',   color: '#059669', bg: '#d1fae5' },
  'Painting':   { icon: 'format-paint',        color: '#e11d48', bg: '#ffe4e6' },
  'AC Repair':  { icon: 'ac-unit',             color: '#0891b2', bg: '#cffafe' },
  'Carpentry':  { icon: 'handyman',            color: '#7c3aed', bg: '#ede9fe' },
};

const DEFAULT_META = { icon: 'home-repair-service', color: '#3e2a56', bg: '#f0edff' };

interface LoadingProps {
  visible: boolean;
  category?: string;
  service?: string;
}

export default function LoadingOverlay({ visible, category, service }: LoadingProps) {
  const meta = category && CATEGORY_META[category] ? CATEGORY_META[category] : DEFAULT_META;

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current; 
  const spinAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const [dots, setDots] = useState('');

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -8, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
        ])
      ).start();

      Animated.loop(
        Animated.timing(spinAnim, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true })
      ).start();

      Animated.loop(
        Animated.timing(progressAnim, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: false })
      ).start();

      const int = setInterval(() => setDots((p) => (p.length >= 3 ? '' : p + '.')), 400);
      return () => clearInterval(int);
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible]);

  if (!visible && (fadeAnim as any)._value === 0) return null;

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const counterSpin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });
  const progressLeft = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['-50%', '100%'] });

  const label = service
    ? `Loading ${service}`
    : category
    ? `Loading ${category} Services`
    : 'Loading, please wait';

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View style={[styles.card, { transform: [{ translateY: floatAnim }] }]}>
        
        {/* LENS WRAPPER */}
        <Animated.View style={styles.lensWrapper}>
          
          {/* Orbit Ring */}
          <Animated.View style={[styles.orbitRing, { borderColor: meta.color + '40', transform: [{ rotate: spin }] }]}>
            <View style={[styles.orbitDot, { backgroundColor: meta.color }]} />
          </Animated.View>

          {/* Lens */}
          <View style={styles.lens}>
            <Animated.View style={[styles.lensInner, { backgroundColor: meta.bg, borderColor: meta.color, transform: [{ rotate: spin }] }]}>
              <Animated.View style={{ transform: [{ rotate: counterSpin }] }}>
                <MaterialIcons name={meta.icon as any} size={34} color={meta.color} />
              </Animated.View>
            </Animated.View>
          </View>
          
          {/* Lens Handle */}
          <View style={[styles.handle, { backgroundColor: meta.color }]} />
        </Animated.View>

        <View style={styles.textBlock}>
          <Text style={styles.mainText}>Loading your services</Text>
          <Text style={styles.subText}>{label}<Text style={{ width: 24 }}>{dots}</Text></Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { backgroundColor: meta.color, left: progressLeft }]} />
        </View>

      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 6, 20, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  card: {
    alignItems: 'center',
    gap: 28,
    paddingVertical: 40,
    paddingHorizontal: 48,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 32,
  },
  lensWrapper: {
    position: 'relative',
    width: 120,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lens: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  lensInner: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    zIndex: 1,
  },
  orbitDot: {
    position: 'absolute',
    top: -4,
    left: 56,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  handle: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    width: 10,
    height: 38,
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
    zIndex: 2,
  },
  textBlock: {
    alignItems: 'center',
  },
  mainText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  subText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
  },
  progressTrack: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    width: '40%',
    height: '100%',
    borderRadius: 2,
  },
});
