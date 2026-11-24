import { Ionicons } from '@expo/vector-icons';
import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadows } from '@/theme';

type QuickActionsProps = {
  onAction: (action: string) => void;
};

const ACTIONS = [
  {
    key: 'scan',
    icon: 'scan-outline',
    title: 'Scan QRIS',
    subtitle: 'Bayar instan',
    tint: colors.primaryDark,
    bg: colors.primarySoft,
  },
  {
    key: 'saldo',
    icon: 'wallet-outline',
    title: 'Saldo',
    subtitle: 'Rp250.000',
    tint: '#6D28D9',
    bg: '#F2ECFE',
  },
  {
    key: 'kupon',
    icon: 'ticket-outline',
    title: 'Kupon',
    subtitle: '3 kupon baru',
    tint: '#C2410C',
    bg: '#FFF0E6',
  },
] as const;

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <View style={styles.card}>
      {ACTIONS.map((action, index) => (
        <Fragment key={action.key}>
          {index > 0 ? <View style={styles.divider} /> : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${action.title}, ${action.subtitle}`}
            onPress={() => onAction(action.title)}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
            <View style={[styles.iconCircle, { backgroundColor: action.bg }]}>
              <Ionicons name={action.icon} size={19} color={action.tint} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{action.title}</Text>
              <Text style={[styles.subtitle, action.key === 'kupon' && styles.promo]}>
                {action.subtitle}
              </Text>
            </View>
          </Pressable>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginHorizontal: 16,
    ...shadows.card,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  pressed: {
    opacity: 0.6,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    gap: 1,
  },
  title: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 9.5,
    color: colors.muted,
  },
  promo: {
    color: colors.danger,
    fontWeight: '700',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: colors.line,
  },
});
