import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius } from '@/theme';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const HEIGHTS: Record<ButtonSize, number> = { sm: 34, md: 44, lg: 50 };
const PADDING: Record<ButtonSize, number> = { sm: 12, md: 16, lg: 20 };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  style,
  testID,
}: ButtonProps) {
  const palette = {
    primary: { background: colors.primary, border: colors.primary, text: colors.surface },
    outline: { background: 'transparent', border: colors.primary, text: colors.primary },
    ghost: { background: colors.primarySoft, border: 'transparent', text: colors.primaryDark },
    danger: { background: colors.dangerSoft, border: 'transparent', text: colors.danger },
    dark: { background: colors.ink, border: colors.ink, text: colors.surface },
  }[variant];

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        {
          height: HEIGHTS[size],
          paddingHorizontal: PADDING[size],
          backgroundColor: palette.background,
          borderColor: palette.border,
          opacity: disabled ? 0.5 : pressed ? 0.82 : 1,
        },
        style,
      ]}>
      {icon ? <Ionicons name={icon} size={size === 'sm' ? 14 : 17} color={palette.text} /> : null}
      <Text
        style={[
          styles.label,
          {
            color: palette.text,
            fontSize: size === 'sm' ? 12 : size === 'lg' ? 15 : 14,
          },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: radius.sm + 2,
    borderWidth: 1,
  },
  label: {
    fontWeight: '700',
  },
});
