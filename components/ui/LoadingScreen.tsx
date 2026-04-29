import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface LoadingScreenProps {
  serviceName: string;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ serviceName, onComplete }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance fade
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Infinite rotation for the ring
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Bouncing animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15,
          duration: 800,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto complete after transition
    const timeout = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Light Purple Blur Base */}
      <View style={styles.blurOverlay} />
      
      <View style={styles.content}>
        {/* Animated Loader Wrapper */}
        <View style={styles.loaderWrapper}>
          {/* Spinning Ring */}
          <Animated.View style={[styles.ring, { transform: [{ rotate: spin }] }]}>
            <View style={styles.ringPointer} />
          </Animated.View>

          {/* Bouncing Icon */}
          <Animated.View style={[
            styles.iconCircle,
            { transform: [{ translateY: bounceAnim }] }
          ]}>
            <MaterialIcons name="auto-fix-high" size={40} color="#3e2a56" />
          </Animated.View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>Preparing {serviceName}</Text>
          <Text style={styles.tagline}>
            Homezy: Quality you can trust,{"\n"}experts you can rely on.
          </Text>
        </View>

        {/* Dynamic Dots */}
        <View style={styles.dotContainer}>
          {[0, 1, 2].map((i) => (
            <PulseDot key={i} delay={i * 200} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

// Helper component for pulsing dots
const PulseDot = ({ delay }: { delay: number }) => {
  const dotScale = useRef(new Animated.Value(0.4)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dotScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.dot, { transform: [{ scale: dotScale }] }]} />;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f5eefe', 
    opacity: 0.98,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
    width: width,
  },
  loaderWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  ring: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(62, 42, 86, 0.1)',
    borderTopColor: '#3e2a56', // Brand Purple
  },
  ringPointer: {
    position: 'absolute',
    top: 6,
    right: 20,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3e2a56',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#3e2a56",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3e2a56',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5a3d7a',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.7,
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3e2a56',
  }
});

export default LoadingScreen;
