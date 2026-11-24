import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar, StoreBadgePill } from './Avatar';
import { useToast } from './Toast';
import { productsForStore, type Product, type Store } from '@/data/catalog';
import { colors, radius, shadows, spacing } from '@/theme';
import { formatIDR, haptic } from '@/utils/format';

type StoreCardProps = {
  store: Store;
  onSeeAll?: (store: Store) => void;
};

/** Feed card: store identity followed by a preview of its products. */
export function StoreCard({ store, onSeeAll }: StoreCardProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [following, setFollowing] = useState(false);
  const preview = productsForStore(store.id).slice(0, 3);

  const openProduct = (product: Product) => {
    router.push({ pathname: '/product/[id]', params: { id: product.id } });
  };

  const seeAll = () => {
    if (onSeeAll) {
      onSeeAll(store);
      return;
    }
    router.push({ pathname: '/search', params: { q: store.name } });
  };

  const toggleFollow = () => {
    haptic('light');
    setFollowing((value) => !value);
    showToast(following ? `Berhenti mengikuti ${store.name}` : `Mengikuti ${store.name}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar initials={store.initials} colors={store.colors} size={46} />
        <View style={styles.identity}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {store.name}
            </Text>
            <StoreBadgePill badge={store.badge} compact />
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={10} color={colors.accent} />
            <Text style={styles.metaText}>{store.rating.toFixed(1)}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{`${(store.followers / 1000).toFixed(0)} rb pengikut`}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText} numberOfLines={1}>
              {store.city}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={toggleFollow}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.follow,
            following && styles.following,
            pressed && styles.pressed,
          ]}>
          <Text style={[styles.followText, following && styles.followingText]}>
            {following ? 'Diikuti' : 'Ikuti'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {store.description}
      </Text>

      <View style={styles.products}>
        {preview.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => openProduct(product)}
            style={({ pressed }) => [styles.product, pressed && styles.pressed]}>
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
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={seeAll}
        accessibilityRole="button"
        style={({ pressed }) => [styles.seeAll, pressed && styles.pressed]}>
        <Text style={styles.seeAllText}>Lihat Semua Produk</Text>
        <Ionicons name="chevron-forward" size={13} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 9,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  identity: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    flexShrink: 1,
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.ink,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 9.5,
    color: colors.muted,
  },
  metaDot: {
    fontSize: 9,
    color: colors.subtle,
  },
  follow: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  following: {
    backgroundColor: colors.bg,
  },
  followText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  followingText: {
    color: colors.muted,
  },
  pressed: {
    opacity: 0.7,
  },
  description: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },
  products: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  product: {
    width: '31.5%',
    gap: 4,
  },
  productImageWrap: {
    aspectRatio: 1,
    borderRadius: radius.sm,
    backgroundColor: '#F6F8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productPrice: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  seeAllText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.primary,
  },
});
