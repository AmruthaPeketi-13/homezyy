import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, Animated, FlatList, ImageBackground, Image,
  Platform, useWindowDimensions, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/Theme';
import { POPULAR_SERVICES, TESTIMONIALS, OFFERS, type Testimonial } from '@/constants/Data';

const { width: SCREEN_W } = Dimensions.get('window');

// ── Sub-components ─────────────────────────────────────────

/** Top info bar (email + phone strip, like the web header) */
function TopInfoBar() {
  return (
    <View style={ib.bar}>
      <View style={ib.inner}>
        <View style={ib.left}>
          <View style={ib.item}>
            <MaterialIcons name="mail" size={14} color="#3e2a56" />
            <Text style={ib.text}>info@homezy.com</Text>
          </View>
          <View style={ib.item}>
            <MaterialIcons name="call" size={14} color="#3e2a56" />
            <Text style={ib.text}>+91-98765-43210</Text>
          </View>
        </View>
        <View style={ib.socials}>
          <MaterialIcons name="share" size={16} color="rgba(255,255,255,0.6)" />
          <MaterialIcons name="public" size={16} color="rgba(255,255,255,0.6)" />
          <MaterialIcons name="language" size={16} color="rgba(255,255,255,0.6)" />
        </View>
      </View>
    </View>
  );
}
const ib = StyleSheet.create({
  bar: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  inner: {
    width: '100%',
    maxWidth: 1200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: 13, fontFamily: 'Manrope-Medium', color: 'rgba(255,255,255,0.7)' },
  socials: { flexDirection: 'row', gap: 20 },
});

/** Hero section — background image + purple overlay + CTA buttons */
function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <ImageBackground
      source={require('../../assets/images/hero-team.png')}
      style={[hs.hero, isDesktop && { minHeight: height * 0.8 }, { width: '100%' }]}
      imageStyle={hs.heroBg}
      resizeMode="cover"
    >
      <View style={hs.overlay} />
      <View style={[hs.content, isDesktop && { paddingHorizontal: 0, paddingBottom: 0, paddingTop: 0 }]}>
        {/* Brand logo & Top Nav row */}
        <View style={[hs.navbarContainer]}>
          <View style={[hs.topNavRow, isDesktop && { maxWidth: 1200, width: '100%', alignSelf: 'center', paddingHorizontal: 40 }]}>
            <View style={hs.logoGroup}>
              <MaterialIcons name="auto-fix-high" size={isDesktop ? 32 : 28} color="#fff" />
              <Text style={[hs.brandName, isDesktop && { fontSize: 24 }]}>Homezy</Text>
            </View>
            {Platform.OS === 'web' && isDesktop && (
              <View style={hs.navLinks}>
                {['HOME', 'SERVICES', 'ABOUT US', 'BLOG', 'CONTACTS'].map((link) => (
                  <TouchableOpacity key={link} activeOpacity={0.7}>
                    <Text style={hs.navLinkText}>{link}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={hs.loginBtn} activeOpacity={0.8}>
                  <Text style={hs.loginBtnText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Hero text — centered on desktop */}
        <View style={[hs.heroTextWrap, isDesktop && { alignItems: 'center', paddingHorizontal: 40 }]}>
          <Text style={[hs.headline, isDesktop && { fontSize: 56, textAlign: 'center', maxWidth: 900 }]}>
            Professional home services{'\n'}at your doorstep
          </Text>
          <Text style={[hs.sub, isDesktop && { fontSize: 20, textAlign: 'center', maxWidth: 600 }]}>
            Reliable, affordable, and expert services for every home need.
          </Text>

          <View style={[hs.actions, isDesktop && { marginTop: 48 }]}>
            <View style={hs.searchContainer}>
              <MaterialIcons name="search" size={24} color="#3e2a56" />
              <TextInput
                style={hs.searchInput}
                placeholder="What service do you need?"
                placeholderTextColor="rgba(62, 42, 86, 0.4)"
                onFocus={onGetStarted} // Redirect to services for now
              />
              <TouchableOpacity style={hs.goBtn} onPress={onGetStarted}>
                <MaterialIcons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const hs = StyleSheet.create({
  hero: { minHeight: 280, overflow: 'hidden' },
  heroBg: { opacity: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    zIndex: 0,
  },
  content: { padding: Spacing.xl, paddingBottom: Spacing['2xl'], zIndex: 1, flex: 1 },
  navbarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navLinkText: {
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  loginBtn: {
    backgroundColor: '#3e2a56',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  loginBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
  },
  brandName: {
    fontSize: 24,
    fontFamily: 'Manrope-Black',
    color: '#fff',
    letterSpacing: -0.5,
  },
  heroTextWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40, // More vertical room for mobile
  },
  headline: {
    fontSize: 36, // Smaller for mobile (was using xl + huge lineheight)
    fontFamily: 'Manrope-Black',
    color: '#fff',
    lineHeight: 44,
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  sub: {
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 32,
    lineHeight: 24,
  },
  actions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%',
    maxWidth: 500,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 62,
    flex: 1,
    ...Shadow.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    color: '#3e2a56',
  },
  goBtn: {
    backgroundColor: '#3e2a56',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryBtn: {
    backgroundColor: '#3e2a56',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: Typography.sm,
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  secondaryBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: Typography.base,
  },
});

/** Popular services grid — 4 columns on desktop, 2 on mobile */
function PopularServicesSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <View style={[ps.section, isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%', paddingHorizontal: 40 }]}>
      <View style={ps.header}>
        <Text style={[ps.title, isDesktop && { fontSize: 32 }]}>Popular Services</Text>
        <TouchableOpacity onPress={() => onNavigate('__all__')}>
          <Text style={ps.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={ps.grid}>
        {POPULAR_SERVICES.map((svc) => (
          <TouchableOpacity
            key={svc.id}
            style={[ps.card, { width: isDesktop ? '23%' : '48%' }, isDesktop && { paddingVertical: 32, borderRadius: 24 }]}
            onPress={() => onNavigate(svc.id)}
            activeOpacity={0.8}
          >
            <View style={[ps.iconBg, isDesktop && { width: 64, height: 64, borderRadius: 20 }]}>
              <MaterialIcons name={svc.icon as any} size={isDesktop ? 32 : 28} color="#3e2a56" />
            </View>
            <Text style={[ps.cardLabel, isDesktop && { fontSize: 16 }]}>{svc.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const ps = StyleSheet.create({
  section: { paddingHorizontal: Spacing.base, paddingTop: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: Typography.lg, fontFamily: 'Manrope-Black', color: '#2d3436' },
  viewAll: { fontSize: 15, fontFamily: 'Manrope-ExtraBold', color: '#3e2a56' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: '#f0f2f5',
  },
  iconBg: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(62, 42, 86, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-ExtraBold',
    color: '#2d3436',
    textAlign: 'center',
  },
});

/** Promo banner — dark gradient like Fixi */
function PromoBanner({ onPress }: { onPress: () => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <View style={[pb.wrapper, isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%', paddingHorizontal: 40 }]}>
      <View style={[pb.banner, isDesktop && { borderRadius: 32, padding: 40 }]}>
        <View style={pb.left}>
          <Text style={[pb.title, isDesktop && { fontSize: 28 }]}>Flat 20% OFF</Text>
          <Text style={[pb.sub, isDesktop && { fontSize: 16 }]}>On your first booking this month!</Text>
          <TouchableOpacity style={pb.btn} onPress={onPress} activeOpacity={0.85}>
            <Text style={pb.btnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const pb = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.base,
    marginTop: 48,
  },
  banner: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    overflow: 'hidden',
    // Dark gradient matching Fixi: linear-gradient(135deg, #2c3e50 0%, #000 100%)
    backgroundColor: '#2c3e50',
  },
  left: { flex: 1 },
  title: {
    fontSize: Typography['2xl'],
    fontFamily: 'Manrope-Black',
    color: '#fff',
    marginBottom: 8,
  },
  sub: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
  },
  btn: {
    backgroundColor: '#3e2a56',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  btnText: {
    fontSize: 15,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },
});

/** Testimonial card */
function TestimonialCard({ item, cardWidth }: { item: Testimonial; cardWidth: number }) {
  return (
    <View style={[tc.card, { width: cardWidth }]}>
      <View style={tc.header}>
        <Image source={{ uri: item.image }} style={tc.avatar} />
        <View style={tc.info}>
          <Text style={tc.name}>{item.name}</Text>
          <Text style={tc.role}>{item.role}</Text>
        </View>
      </View>
      <View style={tc.stars}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <MaterialIcons key={i} name="star-border" size={22} color="#3e2a56" />
        ))}
      </View>
      <Text style={tc.comment}>"{item.comment}"</Text>
    </View>
  );
}
const tc = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 40,
    padding: 50,
    borderWidth: 1,
    borderColor: 'rgba(62, 42, 86, 0.05)',
    maxWidth: 850,
    alignSelf: 'center',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 24 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.border,
    borderWidth: 4,
    borderColor: '#fff',
  },
  info: { flex: 1 },
  name: { fontSize: 22, fontFamily: 'Manrope-ExtraBold', color: '#1a1a1a', letterSpacing: -0.5 },
  role: { fontSize: 15, fontFamily: 'Manrope-Bold', color: '#3e2a56', marginTop: 4, opacity: 0.8 },
  stars: { flexDirection: 'row', gap: 4, marginBottom: 24 },
  comment: {
    fontSize: 20, fontFamily: 'Manrope-Medium', color: '#2d3436',
    lineHeight: 36, fontStyle: 'italic',
  },
});

/** Testimonials section with auto-advancing carousel + side arrows + dots */
function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const flatRef = useRef<FlatList<Testimonial>>(null);
  const { width: screenWidth } = useWindowDimensions();
  const isDesktop = screenWidth >= 1024;

  const cardWidth = isDesktop
    ? Math.min(screenWidth - 240, 1100) // account for sidebar
    : screenWidth - Spacing.base * 2;

  const advance = useCallback(() => {
    const next = (currentIdx + 1) % TESTIMONIALS.length;
    setCurrentIdx(next);
    flatRef.current?.scrollToIndex({ index: next, animated: true });
  }, [currentIdx]);

  const retreat = () => {
    const prev = (currentIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    setCurrentIdx(prev);
    flatRef.current?.scrollToIndex({ index: prev, animated: true });
  };

  // Auto-advance every 5s
  useEffect(() => {
    const interval = setInterval(advance, 5000);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <View style={[tss.section, isDesktop && { paddingVertical: 80, paddingHorizontal: 40, maxWidth: 1200, alignSelf: 'center', width: '100%' }]}>
      <Text style={[tss.title, isDesktop && { fontSize: 32, textAlign: 'center' }]}>Testimonials</Text>

      <View style={tss.carouselWrap}>
        {/* Left arrow */}
        <TouchableOpacity onPress={retreat} style={[tss.arrowBtn, tss.arrowLeft]} activeOpacity={0.8}>
          <MaterialIcons name="chevron-left" size={28} color="#3e2a56" />
        </TouchableOpacity>

        <FlatList<Testimonial>
          ref={flatRef}
          data={TESTIMONIALS}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TestimonialCard item={item} cardWidth={cardWidth} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: isDesktop ? 40 : Spacing.base }}
          snapToInterval={cardWidth}
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: cardWidth,
            offset: cardWidth * index,
            index,
          })}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
            setCurrentIdx(idx);
          }}
        />

        {/* Right arrow */}
        <TouchableOpacity onPress={advance} style={[tss.arrowBtn, tss.arrowRight]} activeOpacity={0.8}>
          <MaterialIcons name="chevron-right" size={28} color="#3e2a56" />
        </TouchableOpacity>
      </View>

      {/* Dot indicators */}
      <View style={tss.dots}>
        {TESTIMONIALS.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setCurrentIdx(i);
              flatRef.current?.scrollToIndex({ index: i, animated: true });
            }}
          >
            <View style={[tss.dot, currentIdx === i && tss.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const tss = StyleSheet.create({
  section: { paddingTop: Spacing.xl, paddingBottom: Spacing.xl },
  title: {
    fontSize: Typography.lg,
    fontFamily: 'Manrope-Black',
    color: '#2d3436',
    paddingHorizontal: Spacing.base,
    marginBottom: 24,
  },
  carouselWrap: {
    position: 'relative',
    paddingVertical: 40,
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    // Shadow
    shadowColor: 'rgba(62, 42, 86, 0.15)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
  arrowLeft: {
    left: -8,
    transform: [{ translateY: -32 }],
  },
  arrowRight: {
    right: -8,
    transform: [{ translateY: -32 }],
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 0,
  },
  dot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: 'rgba(62, 42, 86, 0.1)',
  },
  dotActive: {
    backgroundColor: '#3e2a56',
    width: 32,
    borderRadius: 12,
  },
});

/** Footer — 5-column grid matching Fixi exactly */
function FooterSection() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const columns = [
    {
      title: 'COMPANY',
      links: ['About Us', 'Terms & Conditions', 'Privacy Policy', 'Anti-discrimination Policy', 'Homezy Impact', 'Careers'],
    },
    {
      title: 'FOR CUSTOMERS',
      links: ['Homezy Reviews', 'Categories Near You', 'Blog', 'Contact Us', 'Help Center'],
    },
    {
      title: 'FOR PARTNERS',
      links: ['Register as a Professional', 'Partner Help Center', 'Training Centers'],
    },
  ];

  return (
    <View style={ft.footer}>
      <View style={[ft.grid, isDesktop && { flexDirection: 'row', maxWidth: 1200, alignSelf: 'center', gap: 60 }]}>
        {/* Brand column */}
        <View style={[ft.brandCol, isDesktop && { flex: 1.5 }]}>
          <View style={ft.logoRow}>
            <MaterialIcons name="home-repair-service" size={isDesktop ? 36 : 22} color="#3e2a56" />
            <Text style={[ft.brand, isDesktop && { fontSize: 28 }]}>Homezy</Text>
          </View>
          <Text style={ft.desc}>
            Making your home a better place, one service at a time. Trusted by thousands across the city.
          </Text>
        </View>

        {/* Link columns */}
        {columns.map((col) => (
          <View key={col.title} style={[ft.col, isDesktop && { flex: 1 }]}>
            <Text style={ft.colTitle}>{col.title}</Text>
            {col.links.map((l) => (
              <TouchableOpacity key={l}>
                <Text style={ft.link}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Social links column */}
        <View style={[ft.col, isDesktop && { flex: 1 }]}>
          <Text style={ft.colTitle}>SOCIAL LINKS</Text>
          <View style={ft.socialRow}>
            <TouchableOpacity style={ft.socialIcon}>
              <MaterialIcons name="share" size={24} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={ft.socialIcon}>
              <MaterialIcons name="public" size={24} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={ft.socialIcon}>
              <MaterialIcons name="language" size={24} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Copyright */}
      <View style={[ft.copyWrap, isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%' }]}>
        <Text style={ft.copy}>© 2026 Homezy Services Private Limited. All rights reserved.</Text>
      </View>
    </View>
  );
}
const ft = StyleSheet.create({
  footer: {
    backgroundColor: '#1a1a1a',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 40,
    marginTop: 40,
  },
  grid: {
    gap: 32,
  },
  brandCol: {
    marginBottom: Spacing.xl,
  },
  logoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24,
  },
  brand: {
    fontSize: Typography.xl, fontFamily: 'Manrope-Black', color: '#fff',
  },
  desc: {
    fontSize: 15, fontFamily: 'Manrope-Regular',
    color: 'rgba(255,255,255,0.6)', lineHeight: 26, maxWidth: 280,
  },
  col: { marginBottom: Spacing.base },
  colTitle: {
    fontSize: 16, fontFamily: 'Manrope-ExtraBold',
    color: '#fff', marginBottom: 28, textTransform: 'uppercase', letterSpacing: 1,
  },
  link: {
    fontSize: 14, fontFamily: 'Manrope-Regular',
    color: 'rgba(255,255,255,0.6)', marginBottom: 14,
  },
  socialRow: {
    flexDirection: 'row', gap: 20,
  },
  socialIcon: {
    width: 40, height: 40, borderRadius: 20,
  },
  copyWrap: {
    marginTop: 60,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  copy: {
    fontSize: 13, fontFamily: 'Manrope-Regular',
    color: 'rgba(255,255,255,0.4)',
  },
});

// ── Main screen ────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const navigateToCategory = (categoryId: string) => {
    if (categoryId === '__all__') {
      router.push('/(tabs)/services');
    } else {
      router.push({ pathname: '/categories/[id]', params: { id: categoryId } });
    }
  };

  const navigateToServices = () => {
    router.push('/(tabs)/services');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, isDesktop && { paddingBottom: 0 }]}
      >
        <TopInfoBar />
        <HeroSection onGetStarted={navigateToServices} />
        <PopularServicesSection onNavigate={navigateToCategory} />
        <PromoBanner onPress={navigateToServices} />
        <TestimonialsSection />
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { flex: 1 },
  content: { paddingBottom: 100 },
});
