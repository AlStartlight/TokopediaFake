import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar, StoreBadgePill } from './Avatar';
import { productsForStore, type Store } from '@/data/catalog';
import { colors, radius, shadows, spacing } from '@/theme';
import { formatCompact, formatIDR } from '@/utils/format';

type OfficialStoreCardProps = {
  store: Store;
  onPress: (store: Store) => void;
};

/** Storefront-style card with a branded gradient banner, used on Official Store. */
export function OfficialStoreCard({ store, onPress }: OfficialStoreCardProps) {
  const preview = productsForStore(store.id).slice(0, 3);

  return (
    <Pressable
      onPress={() => onPress(store)}
      accessibilityRole="button"
      accessibilityLabel={`Kunjungi ${store.name}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <LinearGradient
        colors={store.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}>
        <View style={styles.bannerRow}>
          <Avatar
            initials={store.initials}
            colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0.12)']}
            size={46}
          />
          <View style={styles.identity}>
            <Text style={styles.name} numberOfLines={1}>
              {store.name}
            </Text>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Ionicons name="checkmark-circle" size={10} color="#E9FFF3" />
                <Text style={styles.tagText}>{store.tagline}</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={17} color="rgba(255,255,255,0.8)" />
        </View>
        <View style={styles.bannerDecor} />
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.description} numberOfLines={2}>
          {store.description}
        </Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="star" size={11} color={colors.accent} />
            <Text style={styles.statValue}>{store.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.statText}>{formatCompact(store.followers)} pengikut</Text>
          <Text style={styles.dot}>·</Text>
          <Ionicons name="location-outline" size={11} color={colors.muted} />
          <Text style={styles.statText}>{store.city}</Text>
        </View>

        <View style={styles.products}>
          {preview.map((product) => (
            <View key={product.id} style={styles.product}>
              <View style={styles.productImageWrap}>
                <Image
                  source={product.image}
                  style={styles.productImage}
                  contentFit="contain"
                  transition={120}
                />
              </View>
              <Text style={styles.productPrice} numberOfLines={1}>
                {formatIDR(product.price)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <StoreBadgePill badge={store.badge} />
          <View style={styles.visit}>
            <Text style={styles.visitText}>Kunjungi Toko</Text>
            <Ionicons name="arrow-forward" size={12} color={colors.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
  banner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    overflow: 'hidden',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 2,
  },
  identity: {
    flex: 1,
    gap: 3,
  },
  name: {
    color: colors.surface,
    fontSize: 14.5,
    fontWeight: '800',
  },
  tagRow: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  tagText: {
    color: '#E9FFF3',
    fontSize: 8.5,
    fontWeight: '700',
  },
  bannerDecor: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    right: -38,
    top: -54,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  body: {
    padding: spacing.md,
    gap: 8,
  },
  description: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
  },
  statText: {
    fontSize: 10,
    color: colors.muted,
  },
  dot: {
    fontSize: 9,
    color: colors.subtle,
  },
  products: {
    flexDirection: 'row',
    gap: 8,
  },
  product: {
    width: '31.5%',
    gap: 3,
  },
  productImageWrap: {
    aspectRatio: 1.25,
    backgroundColor: '#F6F8F6',
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productPrice: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  visit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  visitText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
});
