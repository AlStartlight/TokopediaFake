import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '@/theme';
import type { StoreBadge } from '@/data/catalog';

type AvatarProps = {
  initials: string;
  colors: readonly [string, string];
  size?: number;
  fontSize?: number;
  rounded?: number;
};

/** Initials avatar with a brand gradient, used for stores and the profile. */
export function Avatar({ initials, colors: gradient, size = 44, fontSize, rounded }: AvatarProps) {
  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: rounded ?? size / 2.6,
        },
      ]}>
      <Text style={[styles.initials, { fontSize: fontSize ?? size / 2.4 }]}>{initials}</Text>
    </LinearGradient>
  );
}

type StoreBadgeProps = {
  badge: StoreBadge;
  compact?: boolean;
};

const BADGE_META: Record<
  StoreBadge,
  { label: string; icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }
> = {
  official: { label: 'Official', icon: 'checkmark-circle', color: '#0B7A43', bg: '#E4F8ED' },
  diamond: { label: 'Diamond', icon: 'diamond', color: '#1D4ED8', bg: '#E8F0FF' },
  silver: { label: 'Silver', icon: 'medal', color: '#475569', bg: '#EEF2F6' },
};

export function StoreBadgePill({ badge, compact = false }: StoreBadgeProps) {
  const meta = BADGE_META[badge];
  return (
    <View style={[styles.badge, { backgroundColor: meta.bg }]}>
      <Ionicons name={meta.icon} size={compact ? 10 : 12} color={meta.color} />
      <Text style={[styles.badgeText, { color: meta.color, fontSize: compact ? 9 : 10 }]}>
        {meta.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.surface,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  badgeText: {
    fontWeight: '700',
  },
});
