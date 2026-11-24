import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '@/theme';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  compact = false,
}: QuantityStepperProps) {
  const size = compact ? 26 : 30;
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Kurangi jumlah"
        disabled={value <= min}
        onPress={() => onChange(Math.max(min, value - 1))}
        style={({ pressed }) => [
          styles.button,
          { width: size, height: size },
          value <= min && styles.disabled,
          pressed && styles.pressed,
        ]}>
        <Ionicons name="remove" size={15} color={colors.text} />
      </Pressable>
      <Text style={[styles.value, compact && styles.valueCompact]}>{value}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Tambah jumlah"
        disabled={value >= max}
        onPress={() => onChange(Math.min(max, value + 1))}
        style={({ pressed }) => [
          styles.button,
          { width: size, height: size },
          value >= max && styles.disabled,
          pressed && styles.pressed,
        ]}>
        <Ionicons name="add" size={15} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.xs + 2,
    backgroundColor: colors.surface,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    backgroundColor: colors.primarySoft,
  },
  value: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
  },
  valueCompact: {
    minWidth: 24,
    fontSize: 12,
  },
});
