import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';

// ── Types ──────────────────────────────────────────────────

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
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
  rating?: number;
}

// ── Mock data ──────────────────────────────────────────────

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    serviceName: 'Fan repair/install',
    providerName: 'VoltMaster Pro',
    category: 'Electrical',
    date: 'Monday, 28th April 2026',
    time: '10:00 AM – 11:30 AM',
    location: '12, Jubilee Hills, Hyderabad',
    price: '₹249',
    status: 'upcoming',
    serviceImage: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=80',
  },
  {
    id: 'b2',
    serviceName: 'Kitchen deep cleaning',
    providerName: 'SparkleClean Solutions',
    category: 'Cleaning',
    date: 'Saturday, 19th April 2026',
    time: '09:00 AM – 12:00 PM',
    location: '45, Banjara Hills, Hyderabad',
    price: '₹999',
    status: 'completed',
    serviceImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80',
    rating: 5,
  },
  {
    id: 'b3',
    serviceName: 'AC Basic service',
    providerName: 'CoolAir Solutions',
    category: 'AC Repair',
    date: 'Friday, 11th April 2026',
    time: '02:00 PM – 03:30 PM',
    location: '7, Madhapur, Hyderabad',
    price: '₹499',
    status: 'cancelled',
    serviceImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&q=80',
  },
];

// ── Status chip ────────────────────────────────────────────

const STATUS_META: Record<BookingStatus, { label: string; color: string; bg: string; icon: string }> = {
  upcoming:  { label: 'Upcoming',  color: '#2563eb', bg: '#dbeafe', icon: 'schedule' },
  completed: { label: 'Completed', color: '#059669', bg: '#d1fae5', icon: 'check-circle' },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: '#fee2e2', icon: 'cancel' },
};

function StatusChip({ status }: { status: BookingStatus }) {
  const meta = STATUS_META[status];
  return (
    <View style={[chip.wrap, { backgroundColor: meta.bg }]}>
      <MaterialIcons name={meta.icon as any} size={12} color={meta.color} />
      <Text style={[chip.text, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}
const chip = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full,
  },
  text: {
    fontSize: 11, fontFamily: 'Manrope-Bold',
  },
});

// ── Booking card ───────────────────────────────────────────

function BookingCard({ booking, onPress }: { booking: Booking; onPress: () => void }) {
  return (
    <TouchableOpacity style={bc.card} onPress={onPress} activeOpacity={0.88}>
      {/* Service image */}
      <Image source={{ uri: booking.serviceImage }} style={bc.img} resizeMode="cover" />

      <View style={bc.body}>
        <View style={bc.topRow}>
          <Text style={bc.serviceName} numberOfLines={1}>{booking.serviceName}</Text>
          <StatusChip status={booking.status} />
        </View>

        <Text style={bc.provider}>{booking.providerName}</Text>

        <View style={bc.detail}>
          <MaterialIcons name="calendar-today" size={14} color={Colors.textMuted} />
          <Text style={bc.detailText}>{booking.date}</Text>
        </View>
        <View style={bc.detail}>
          <MaterialIcons name="schedule" size={14} color={Colors.textMuted} />
          <Text style={bc.detailText}>{booking.time}</Text>
        </View>
        <View style={bc.detail}>
          <MaterialIcons name="location-on" size={14} color={Colors.textMuted} />
          <Text style={bc.detailText} numberOfLines={1}>{booking.location}</Text>
        </View>

        <View style={bc.footer}>
          <Text style={bc.price}>{booking.price}</Text>

          {booking.status === 'completed' && (
            <TouchableOpacity style={bc.rateBtn}>
              <MaterialIcons name="star" size={14} color={Colors.star} />
              <Text style={bc.rateBtnText}>Rate Service</Text>
            </TouchableOpacity>
          )}
          {booking.status === 'upcoming' && (
            <TouchableOpacity style={bc.cancelBtn}>
              <Text style={bc.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          )}
          {booking.status === 'cancelled' && (
            <TouchableOpacity style={bc.rebookBtn}>
              <Text style={bc.rebookBtnText}>Rebook</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const bc = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  img: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.border,
  },
  body: { padding: Spacing.base },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  serviceName: {
    flex: 1,
    fontSize: Typography.md,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
  },
  provider: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Medium',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  price: {
    fontSize: Typography.lg,
    fontFamily: 'Manrope-Black',
    color: Colors.primary,
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  rateBtnText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Bold',
    color: '#d97706',
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  cancelBtnText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.error,
  },
  rebookBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  rebookBtnText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Bold',
    color: Colors.primary,
  },
});

// ── Main screen ────────────────────────────────────────────

type FilterTab = 'all' | 'upcoming' | 'completed' | 'cancelled';

export default function BookingsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filtered = MOCK_BOOKINGS.filter(
    (b) => activeFilter === 'all' || b.status === activeFilter
  );

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'all',       label: 'All' },
    { id: 'upcoming',  label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>My Bookings</Text>
        <Text style={styles.pageSubtitle}>Track and manage your service history</Text>
      </View>

      {/* Filter tabs inside the header area */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          {filterTabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.filterTab, activeFilter === tab.id && styles.filterTabActive]}
              onPress={() => setActiveFilter(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterTabText, activeFilter === tab.id && styles.filterTabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main List Area */}
      <View style={styles.mainContent}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="calendar-month" size={64} color={Colors.border} />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyDesc}>Your booking history will appear here.</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => router.push('/(tabs)/services')}
            >
              <Text style={styles.exploreBtnText}>Explore Services</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookingCard
                booking={item}
                onPress={() => router.push('/bookings/booking-confirmation')}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#3e2a56',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    ...Shadow.lg,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Manrope-Black',
    color: '#fff',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    backgroundColor: '#3e2a56',
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterRow: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTab: {
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    minWidth: 80,
  },
  filterTabActive: {
    backgroundColor: '#fff',
  },
  filterTabText: {
    fontSize: 13,
    fontFamily: 'Manrope-Bold',
    color: 'rgba(255,255,255,0.8)',
  },
  filterTabTextActive: {
    color: '#3e2a56',
  },
  list: {
    padding: 24,
    gap: 16,
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-Bold',
    color: '#1a1a1a',
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#666',
    textAlign: 'center',
  },
  exploreBtn: {
    marginTop: 8,
    backgroundColor: '#3e2a56',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  exploreBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
});
