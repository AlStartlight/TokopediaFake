import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { useToast } from './Toast';
import { useShop } from '@/store/shop';
import { colors, radius, shadows } from '@/theme';
import type { Product } from '@/data/catalog';
import { discountPercent, formatIDR, haptic, soldLabel } from '@/utils/format';

type ProductCardProps = {
  product: Product;
  width?: number;
  onPress?: () => void;
};

export function ProductCard({ product, width = 156, onPress }: ProductCardProps) {
  const router = useRouter();
  const { isWishlisted, toggleWishlist } = useShop();
  const { showToast } = useToast();
  const discount = discountPercent(product.originalPrice, product.price);
  const wished = isWishlisted(product.id);

  const open = () => {
    if (onPress) {
      onPress();
      return;
    }
    router.push({ pathname: '/product/[id]', params: { id: product.id } });
  };

  const toggleWish = () => {
    haptic('light');
    toggleWishlist(product.id);
    showToast(wished ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist');
  };

  return (
    <Pressable
      onPress={open}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatIDR(product.price)}`}
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}>
      <View style={[styles.imageWrap, { height: width * 0.92 }]}>
        <Image
          source={product.image}
          style={styles.image}
          contentFit="contain"
          transition={140}
          accessibilityIgnoresInvertColors
        />
        {discount > 0 ? (
          <View style={styles.discount}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        ) : null}
        <Pressable
          onPress={toggleWish}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={wished ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          style={({ pressed }) => [styles.heart, pressed && styles.heartPressed]}>
          <Ionicons
            name={wished ? 'heart' : 'heart-outline'}
            size={16}
            color={wished ? colors.danger : colors.muted}
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatIDR(product.price)}</Text>
        <View style={styles.metaRow}>
          {product.originalPrice > product.price ? (
            <Text style={styles.original}>{formatIDR(product.originalPrice)}</Text>
          ) : (
            <View />
          )}
          {product.freeShipping ? (
            <View style={styles.shipping}>
              <Text style={styles.shippingText}>Bebas Ongkir</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={11} color={colors.accent} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.sold} numberOfLines={1}>
            {soldLabel(product.sold)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function usePulse() {
  const [opacity] = useState(() => new Animated.Value(0.45));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return opacity;
}

export function ProductCardSkeleton({ width = 156 }: { width?: number }) {
  const opacity = usePulse();
  return (
    <View style={[styles.card, { width }]}>
      <Animated.View
        style={[styles.skeletonImage, { height: width * 0.92, opacity }]}
      />
      <View style={styles.body}>
        <Animated.View style={[styles.skeletonLine, { width: '92%', opacity }]} />
        <Animated.View style={[styles.skeletonLine, { width: '64%', opacity }]} />
        <Animated.View style={[styles.skeletonPrice, { opacity }]} />
        <Animated.View style={[styles.skeletonLine, { width: '48%', opacity }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    ...shadows.card,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.94,
  },
  imageWrap: {
    backgroundColor: '#F7F8F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discount: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  discountText: {
    color: colors.surface,
    fontSize: 9.5,
    fontWeight: '800',
  },
  heart: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 27,
    height: 27,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartPressed: {
    backgroundColor: colors.dangerSoft,
  },
  body: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 9,
    gap: 3,
  },
  name: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.text,
    fontWeight: '500',
    minHeight: 32,
  },
  price: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    minHeight: 16,
  },
  original: {
    fontSize: 10,
    color: colors.subtle,
    textDecorationLine: 'line-through',
  },
  shipping: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  shippingText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 1,
  },
  rating: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text,
  },
  dot: {
    fontSize: 10,
    color: colors.subtle,
  },
  sold: {
    flex: 1,
    fontSize: 9.5,
    color: colors.muted,
  },
  skeletonImage: {
    backgroundColor: '#E9EDEA',
  },
  skeletonLine: {
    height: 9,
    borderRadius: 4,
    backgroundColor: '#E9EDEA',
  },
  skeletonPrice: {
    height: 13,
    width: '52%',
    borderRadius: 5,
    backgroundColor: '#E1E6E2',
    marginTop: 2,
  },
});
