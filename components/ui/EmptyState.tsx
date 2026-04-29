import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/constants/Theme';

interface EmptyStateProps {
  /** MaterialIcons name */
  icon?: string;
  title: string;
  description: string;
  /** Label of the optional CTA button */
  actionLabel?: string;
  /** Route to navigate when the CTA is pressed */
  actionRoute?: string;
  /** Alternative onPress callback (overrides actionRoute) */
  onAction?: () => void;
}

/**
 * A reusable empty-state placeholder with icon, text, and optional call-to-action.
 */
export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  actionRoute,
  onAction,
}: EmptyStateProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onAction) return onAction();
    if (actionRoute) router.push(actionRoute as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialIcons name={icon as any} size={64} color={Colors.border} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && (
        <TouchableOpacity style={styles.btn} onPress={handlePress} activeOpacity={0.85}>
          <Text style={styles.btnText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: 12,
  },
  iconWrap: { marginBottom: 8 },
  title: {
    fontSize: Typography.xl,
    fontFamily: 'Manrope-Bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.base,
    fontFamily: 'Manrope-Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  btn: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: Typography.base,
  },
});
