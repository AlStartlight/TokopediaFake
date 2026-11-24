import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
};

/** Flat header for pushed (stack) screens such as Search, Wishlist and Product. */
export function ScreenHeader({ title, subtitle, right, showBack = true, onBack }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          onPress={() => (onBack ? onBack() : router.back())}
          hitSlop={10}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
          <Ionicons name="arrow-back" size={21} color={colors.ink} />
        </Pressable>
      ) : null}
      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ?? null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  pressed: {
    opacity: 0.6,
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 11,
    color: colors.muted,
  },
});
