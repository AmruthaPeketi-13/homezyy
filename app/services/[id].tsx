import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Dimensions, Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';
import { SERVICE_DESCRIPTIONS, PROVIDER_NAMES } from '@/constants/Data';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const HERO_H = Math.min(SCREEN_H * 0.35, 280);

// ── Package card ───────────────────────────────────────────

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  popular?: boolean;
}

function PackageCard({ pkg, selected, onSelect }: { pkg: Package; selected: boolean; onSelect: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.pkgCard, selected && styles.pkgCardSelected, pkg.popular && styles.pkgCardPopular]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      {pkg.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>POPULAR</Text>
        </View>
      )}
      <View style={[styles.pkgIcon, selected && styles.pkgIconSelected]}>
        <MaterialIcons name={pkg.icon as any} size={22} color={selected ? '#fff' : Colors.primary} />
      </View>
      <View style={styles.pkgBody}>
        <Text style={[styles.pkgName, selected && styles.pkgNameSelected]}>{pkg.name}</Text>
        <Text style={[styles.pkgDesc, selected && styles.pkgDescSelected]}>{pkg.description}</Text>
      </View>
      <View style={styles.pkgPriceCol}>
        <Text style={[styles.pkgPrice, selected && styles.pkgPriceSelected]}>
          ₹{pkg.price.toLocaleString('en-IN')}
        </Text>
        {selected && (
          <MaterialIcons name="check-circle" size={18} color={Colors.primary} style={{ marginTop: 4 }} />
        )}
      </View>
    </TouchableOpacity>
  );
}

// ── Main screen ────────────────────────────────────────────

export default function ServiceDetailsScreen() {
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const { data } = useLocalSearchParams<{ data: string }>();

  // Parse service data passed from SubServices screen
  const service = (() => {
    try { return JSON.parse(data ?? ''); }
    catch { return null; }
  })();

  const [selectedPkg, setSelectedPkg] = useState<string>('Standard');

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorState}>
          <MaterialIcons name="error-outline" size={64} color={Colors.border} />
          <Text style={styles.errorTitle}>Service not found</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => router.push('/(tabs)/services')}>
            <Text style={styles.browseBtnText}>Browse Services</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const category = service.category ?? '';
  const parsePrice = (str: string) => parseInt(str.replace(/[₹,–]/g, ''), 10) || 0;
  const basePrice  = parsePrice(service.price);

  const packages: Package[] = [
    { id: 'Basic',    name: 'Basic Package',    description: 'Essential service covering core requirements.', price: Math.round(basePrice * 0.7), icon: 'bolt' },
    { id: 'Standard', name: 'Standard Package', description: 'Our most popular choice with added care.',      price: basePrice,                   icon: 'stars',   popular: true },
    { id: 'Premium',  name: 'Premium Package',  description: 'Complete top-to-bottom service with premium care.', price: Math.round(basePrice * 1.5), icon: 'diamond' },
  ];

  const currentPrice   = packages.find((p) => p.id === selectedPkg)?.price ?? basePrice;
  const description    = SERVICE_DESCRIPTIONS[category] ?? `Professional ${service.title.toLowerCase()} service delivered by our top-rated technicians.`;
  const providerName   = PROVIDER_NAMES[category] ?? 'Homezy Pro Provider';
  const providerAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(providerName)}`;

  const handleBookNow = () => {
    router.push('/bookings/booking-confirmation');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* ── Hero Image ──────────────────────────────────── */}
      <View style={[styles.hero, { height: HERO_H }]}>
        <Image
          source={{ uri: service.img }}
          style={styles.heroImg}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        {/* Back + Share buttons */}
        <SafeAreaView style={styles.heroNav} edges={['top']}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn}>
            <MaterialIcons name="share" size={20} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* ── Scrollable content ──────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 150 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP RATED badge */}
        <View style={styles.badge}>
          <MaterialIcons name="verified" size={13} color={Colors.primary} />
          <Text style={styles.badgeText}>TOP RATED</Text>
        </View>

        {/* Title + rating */}
        <View style={styles.titleRow}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <View style={styles.ratingChip}>
            <MaterialIcons name="star" size={16} color={Colors.star} />
            <Text style={styles.ratingText}>{service.rating}</Text>
            <Text style={styles.reviewCount}>({service.reviews})</Text>
          </View>
        </View>

        {/* Provider card */}
        <View style={styles.providerCard}>
          <Image source={{ uri: providerAvatar }} style={styles.providerAvatar} />
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{providerName}</Text>
            <Text style={styles.providerMeta}>Professional Provider • 5 yrs exp.</Text>
          </View>
          <View style={styles.basePriceChip}>
            <Text style={styles.basePriceText}>₹{currentPrice.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this service</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Packages</Text>
          <View style={styles.packagesList}>
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                selected={selectedPkg === pkg.id}
                onSelect={() => setSelectedPkg(pkg.id)}
              />
            ))}
          </View>
        </View>

        {/* What's included */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {['Professional equipment & tools', 'Certified & background-verified experts', '30-day service warranty', 'Real-time job tracking'].map((item) => (
            <View key={item} style={styles.includesRow}>
              <MaterialIcons name="check-circle" size={18} color={Colors.success} />
              <Text style={styles.includesText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Service location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Location</Text>
          <TouchableOpacity style={styles.mapBox} activeOpacity={0.85}>
            <MaterialIcons name="location-on" size={28} color={Colors.primary} />
            <Text style={styles.mapLabel}>Tap to choose your address</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── Sticky bottom CTA ───────────────────────────── */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.priceSummary}>
          <Text style={styles.priceLabel}>TOTAL PRICE</Text>
          <Text style={styles.totalPrice}>₹{currentPrice.toLocaleString('en-IN')}</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBookNow} activeOpacity={0.85}>
          <Text style={styles.bookBtnText}>Book Now</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },

  // Hero
  hero: { position: 'relative' },
  heroImg: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroNav: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Platform.OS === 'android' ? Spacing.xl : 0,
  },
  circleBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Scroll content
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.base, paddingTop: Spacing.base },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Manrope-Bold',
    color: Colors.primary,
    letterSpacing: 0.5,
  },

  // Title + rating
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: Spacing.base,
  },
  serviceTitle: {
    flex: 1,
    fontSize: Typography.xl,
    fontFamily: 'Manrope-Black',
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ratingText: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
  },
  reviewCount: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
  },

  // Provider card
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.xl,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  providerAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.border,
  },
  providerInfo: { flex: 1 },
  providerName: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  providerMeta: {
    fontSize: Typography.sm,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
  },
  basePriceChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.md,
  },
  basePriceText: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Bold',
    color: Colors.primary,
  },

  // Sections
  section: { marginBottom: Spacing.xl },
  sectionTitle: {
    fontSize: Typography.lg,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  // Packages
  packagesList: { gap: 10 },
  pkgCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 12,
    position: 'relative',
  },
  pkgCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  pkgCardPopular: {
    borderColor: Colors.primary + '66',
  },
  popularBadge: {
    position: 'absolute',
    top: -1, right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  popularBadgeText: {
    fontSize: 10,
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  pkgIcon: {
    width: 42, height: 42,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pkgIconSelected: {
    backgroundColor: Colors.primary,
  },
  pkgBody: { flex: 1 },
  pkgName: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  pkgNameSelected: { color: Colors.primary },
  pkgDesc: {
    fontSize: Typography.xs,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
  },
  pkgDescSelected: { color: Colors.primaryMid ?? Colors.primary },
  pkgPriceCol: { alignItems: 'flex-end' },
  pkgPrice: {
    fontSize: Typography.md,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
  },
  pkgPriceSelected: { color: Colors.primary },

  // Includes
  includesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  includesText: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Regular',
    color: Colors.textPrimary,
  },

  // Map placeholder
  mapBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
    ...Shadow.sm,
  },
  mapLabel: {
    flex: 1,
    fontSize: Typography.base,
    fontFamily: 'Manrope-Medium',
    color: Colors.textSecondary,
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0, 
    left: 0, 
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    zIndex: 100,
    ...Shadow.lg,
    gap: 16,
    minHeight: 80, // Ensure a minimum height for smaller screens
  },
  priceSummary: { flex: 1 },
  priceLabel: {
    fontSize: Typography.xs,
    fontFamily: 'Manrope-Bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  totalPrice: {
    fontSize: Typography.xl,
    fontFamily: 'Manrope-Black',
    color: Colors.primary,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: 24,
    paddingVertical: 14,
    ...Shadow.lg,
  },
  bookBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: Typography.base,
  },

  // Error state
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: Spacing.xl,
  },
  errorTitle: {
    fontSize: Typography.xl,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
  },
  browseBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  browseBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: Typography.base,
  },
});
