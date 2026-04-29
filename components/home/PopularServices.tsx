import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { POPULAR_SERVICES } from '@/constants/Data';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';

const CARD_W = 120;

/**
 * Horizontal scrollable list of popular services shown on the Home screen.
 */
export default function PopularServices() {
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push({ pathname: '/categories/[id]', params: { id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Services</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/services')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {POPULAR_SERVICES.map((svc) => (
          <TouchableOpacity
            key={svc.id}
            style={styles.card}
            onPress={() => handlePress(svc.id)}
            activeOpacity={0.8}
          >
            <View style={styles.iconBg}>
              <MaterialIcons name={svc.icon as any} size={28} color={Colors.primary} />
            </View>
            <Text style={styles.label}>{svc.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.lg,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
  },
  viewAll: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.primary,
  },
  scroll: {
    paddingHorizontal: Spacing.base,
    gap: 12,
  },
  card: {
    width: CARD_W,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 10,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconBg: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});
