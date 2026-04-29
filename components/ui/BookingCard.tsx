import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface BookingCardProps {
  id: string;
  serviceName: string;
  providerName: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  status: BookingStatus;
  serviceImage: string;
  onPress?: () => void;
}

const STATUS_META: Record<BookingStatus, { label: string; color: string; bg: string; icon: string }> = {
  upcoming:  { label: 'Upcoming',  color: '#2563eb', bg: '#dbeafe', icon: 'schedule' },
  completed: { label: 'Completed', color: '#059669', bg: '#d1fae5', icon: 'check-circle' },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: '#fee2e2', icon: 'cancel' },
};

/**
 * A card showing a single booking with its image, details and status chip.
 */
export default function BookingCard({
  serviceName, providerName, date, time, location,
  price, status, serviceImage, onPress,
}: BookingCardProps) {
  const meta = STATUS_META[status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <Image source={{ uri: serviceImage }} style={styles.img} resizeMode="cover" />

      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.serviceName} numberOfLines={1}>{serviceName}</Text>
          <View style={[styles.chip, { backgroundColor: meta.bg }]}>
            <MaterialIcons name={meta.icon as any} size={12} color={meta.color} />
            <Text style={[styles.chipText, { color: meta.color }]}>{meta.label}</Text>
          </View>
        </View>

        <Text style={styles.provider}>{providerName}</Text>

        <View style={styles.detail}>
          <MaterialIcons name="calendar-today" size={14} color={Colors.textMuted} />
          <Text style={styles.detailText}>{date}</Text>
        </View>
        <View style={styles.detail}>
          <MaterialIcons name="schedule" size={14} color={Colors.textMuted} />
          <Text style={styles.detailText}>{time}</Text>
        </View>
        <View style={styles.detail}>
          <MaterialIcons name="location-on" size={14} color={Colors.textMuted} />
          <Text style={styles.detailText} numberOfLines={1}>{location}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  img: {
    width: '100%', height: 140,
    backgroundColor: Colors.border,
  },
  body: { padding: Spacing.base },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4, gap: 8,
  },
  serviceName: {
    flex: 1,
    fontSize: Typography.md,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
  },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full,
  },
  chipText: { fontSize: 11, fontFamily: 'Manrope-Bold' },
  provider: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Medium',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  detail: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginBottom: 4,
  },
  detailText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm, paddingTop: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.borderLight,
  },
  price: {
    fontSize: Typography.lg,
    fontFamily: 'Manrope-Black',
    color: Colors.primary,
  },
});
