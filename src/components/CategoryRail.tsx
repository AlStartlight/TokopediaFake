import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { categories, type Category } from '@/data/catalog';
import { colors } from '@/theme';

type CategoryRailProps = {
  onSelect: (category: Category) => void;
};

export function CategoryRail({ onSelect }: CategoryRailProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          accessibilityRole="button"
          accessibilityLabel={`Kategori ${category.label}`}
          onPress={() => onSelect(category)}
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
          <View style={[styles.circle, { backgroundColor: category.bg }]}>
            <Ionicons name={category.icon} size={24} color={category.tint} />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {category.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 12,
  },
  item: {
    width: 62,
    alignItems: 'center',
    gap: 6,
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.text,
  },
});
