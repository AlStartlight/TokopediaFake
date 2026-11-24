import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, gradients, radius } from '@/theme';

type PromoBannerProps = {
  onPress: () => void;
};

/** Wide "Gajian Extra" gradient promo, inspired by the original Home screen. */
export function PromoBanner({ onPress }: PromoBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Gajian Extra Sekarang, bebas ongkir dan diskon"
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}>
      <LinearGradient
        colors={gradients.promo}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.9 }}
        style={styles.card}>
        <View style={styles.copy}>
          <View style={styles.tag}>
            <Ionicons name="flash" size={10} color="#FFE58A" />
            <Text style={styles.tagText}>GAJIAN EXTRA SEKARANG</Text>
          </View>
          <Text style={styles.title}>Bebas Ongkir 5x + Diskon 50%</Text>
          <Text style={styles.subtitle}>Pakai kode GAJIAN25 di checkout</Text>
        </View>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>CEK</Text>
          <Ionicons name="arrow-forward" size={13} color={colors.primaryDark} />
        </View>
        <View style={styles.decor} />
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.94,
  },
  card: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    overflow: 'hidden',
  },
  copy: {
    flex: 1,
    gap: 3,
    zIndex: 2,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  tagText: {
    color: '#FFE58A',
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10.5,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E9FFF3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    zIndex: 2,
  },
  ctaText: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '800',
  },
  decor: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    right: -34,
    top: -60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});
