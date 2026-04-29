// ── Brand Palette ─────────────────────────────────────────
export const Colors = {
  // Primary
  primary: '#3e2a56',
  primaryLight: '#f5eefe',
  primaryMid: '#5a3d7a',
  primaryDark: '#2d1f41',

  // Backgrounds
  background: '#f8f9fa',
  surface: '#ffffff',
  surfaceAlt: '#f1f3f5',

  // Text
  textPrimary: '#2d3436',
  textSecondary: '#636e72',
  textMuted: '#9ca3af',
  textOnDark: '#ffffff',

  // Borders
  border: '#e9ecef',
  borderLight: '#f0f2f5',

  // Accents
  star: '#f59e0b',
  error: '#ef4444',
  success: '#10b981',

  // Overlay
  overlayDark: 'rgba(62, 42, 86, 0.75)',
  overlayDarker: 'rgba(62, 42, 86, 0.88)',

  // Category chips
  infoBar: '#1a1a1a',
};

// ── Category Brand Colors ─────────────────────────────────
export const CategoryColors: Record<string, { color: string; bg: string; icon: string }> = {
  Electrical: { color: '#d97706', bg: '#fef3c7', icon: 'electrical-services' },
  Plumbing:   { color: '#2563eb', bg: '#dbeafe', icon: 'plumbing' },
  Cleaning:   { color: '#059669', bg: '#d1fae5', icon: 'cleaning-services' },
  Painting:   { color: '#e11d48', bg: '#ffe4e6', icon: 'format-paint' },
  'AC Repair':{ color: '#0891b2', bg: '#cffafe', icon: 'ac-unit' },
  Carpentry:  { color: '#7c3aed', bg: '#ede9fe', icon: 'handyman' },
};

// ── Typography ────────────────────────────────────────────
export const Typography = {
  // Weights
  weightRegular: '400' as const,
  weightMedium:  '500' as const,
  weightSemibold:'600' as const,
  weightBold:    '700' as const,
  weightBlack:   '900' as const,

  // Sizes
  xs:   11,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// ── Spacing ────────────────────────────────────────────────
export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  base:16,
  lg:  20,
  xl:  24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

// ── Radii ─────────────────────────────────────────────────
export const Radius = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl':24,
  full: 9999,
};

// ── Shadows ───────────────────────────────────────────────
export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#3e2a56',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
};
