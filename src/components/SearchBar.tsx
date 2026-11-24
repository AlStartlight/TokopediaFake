import { Ionicons } from '@expo/vector-icons';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors, radius } from '@/theme';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
  tone?: 'light' | 'muted';
  style?: StyleProp<ViewStyle>;
  onSubmitEditing?: () => void;
  testID?: string;
};

/**
 * Search pill used across the app. Pass `onPress` for a tappable entry point,
 * or `editable` for a real input.
 */
export function SearchBar({
  placeholder = 'Cari di Tokopedia',
  value,
  onChangeText,
  onPress,
  editable = false,
  autoFocus = false,
  tone = 'light',
  style,
  onSubmitEditing,
  testID,
}: SearchBarProps) {
  const content = (
    <View
      style={[
        styles.container,
        tone === 'muted' && styles.muted,
        onPress ? styles.pressable : null,
        style,
      ]}>
      <Ionicons name="search" size={19} color={colors.muted} />
      {editable ? (
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.subtle}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={colors.primary}
          style={[
            styles.input,
            Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null,
          ]}
        />
      ) : (
        <Text
          testID={testID}
          numberOfLines={1}
          style={[styles.placeholder, value ? styles.value : null]}>
          {value || placeholder}
        </Text>
      )}
      <Ionicons name="scan-outline" size={19} color={colors.muted} />
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="search"
        accessibilityLabel={placeholder}
        style={({ pressed }) => (pressed ? styles.pressed : undefined)}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  muted: {
    backgroundColor: '#F1F4F2',
  },
  pressable: {
    flex: 1,
  },
  pressed: {
    opacity: 0.86,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
    color: colors.ink,
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    color: colors.subtle,
  },
  value: {
    color: colors.ink,
  },
});
