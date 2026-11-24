import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, StoreBadgePill } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useToast } from '@/components/Toast';
import { getProduct, getStore } from '@/data/catalog';
import { useShop } from '@/store/shop';
import { colors, radius, shadows, spacing } from '@/theme';
import { discountPercent, formatIDR, haptic, soldLabel } from '@/utils/format';

export default function ProductDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(typeof id === 'string' ? id : id?.[0]);
  const store = product ? getStore(product.storeId) : undefined;

  const { addToCart, isWishlisted, toggleWishlist } = useShop();
  const [variant, setVariant] = useState(product?.variants[0] ?? 'Default');
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  if (!product) {
    return (
      <View style={styles.screen}>
        <StatusBar style="dark" />
        <ScreenHeader title="Produk" />
        <EmptyState
          icon="cube-outline"
          title="Produk tidak ditemukan"
          description="Produk yang kamu cari mungkin sudah tidak tersedia."
          actionLabel="Kembali ke Home"
          onAction={() => router.replace('/')}
        />
      </View>
    );
  }

  const discount = discountPercent(product.originalPrice, product.price);
  const wished = isWishlisted(product.id);

  const add = () => {
    addToCart(product.id, 1, variant);
    haptic('success');
    setAdded(true);
    showToast('Ditambahkan ke keranjang');
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1800);
  };

  const buyNow = () => {
    addToCart(product.id, 1, variant);
    haptic('success');
    router.push('/cart');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}>
        <LinearGradient
          colors={['#F7FAF8', '#E9F2EC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 6 }]}>
          <View style={styles.heroTop}>
            <Pressable
              onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
              accessibilityLabel="Kembali"
              style={({ pressed }) => [styles.circleButton, pressed && styles.pressed]}>
              <Ionicons name="arrow-back" size={20} color={colors.ink} />
            </Pressable>
            <View style={styles.heroActions}>
              <Pressable
                onPress={() => showToast('Bagikan produk · fitur demo')}
                accessibilityLabel="Bagikan"
                style={({ pressed }) => [styles.circleButton, pressed && styles.pressed]}>
                <Ionicons name="share-social-outline" size={19} color={colors.ink} />
              </Pressable>
              <Pressable
                onPress={() => {
                  haptic('light');
                  toggleWishlist(product.id);
                  showToast(wished ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist');
                }}
                accessibilityLabel={wished ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
                style={({ pressed }) => [styles.circleButton, pressed && styles.pressed]}>
                <Ionicons
                  name={wished ? 'heart' : 'heart-outline'}
                  size={20}
                  color={wished ? colors.danger : colors.ink}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.imageWrap}>
            <Image
              source={product.image}
              style={styles.image}
              contentFit="contain"
              transition={200}
            />
          </View>
          {discount > 0 ? (
            <View style={styles.heroBadge}>
              <Ionicons name="pricetag" size={11} color={colors.surface} />
              <Text style={styles.heroBadgeText}>Hemat {discount}%</Text>
            </View>
          ) : null}
        </LinearGradient>

        <View style={styles.sheet}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>{product.brand}</Text>
            {product.official ? <StoreBadgePill badge="official" /> : null}
            {product.freeShipping ? (
              <View style={styles.shippingPill}>
                <Ionicons name="flash" size={9} color={colors.primaryDark} />
                <Text style={styles.shippingText}>Bebas Ongkir</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatIDR(product.price)}</Text>
            {product.originalPrice > product.price ? (
              <>
                <Text style={styles.original}>{formatIDR(product.originalPrice)}</Text>
                <View style={styles.discountPill}>
                  <Text style={styles.discountText}>-{discount}%</Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={colors.accent} />
            <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>(1.204 penilaian)</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.sold}>{soldLabel(product.sold)}</Text>
          </View>

          <View style={styles.divider} />

          {store ? (
            <View style={styles.storeRow}>
              <Avatar initials={store.initials} colors={store.colors} size={42} />
              <View style={styles.storeCopy}>
                <View style={styles.storeNameRow}>
                  <Text style={styles.storeName} numberOfLines={1}>
                    {store.name}
                  </Text>
                  <StoreBadgePill badge={store.badge} compact />
                </View>
                <View style={styles.storeMeta}>
                  <Ionicons name="location-outline" size={10} color={colors.muted} />
                  <Text style={styles.storeMetaText}>{store.city}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Ionicons name="star" size={10} color={colors.accent} />
                  <Text style={styles.storeMetaText}>{store.rating.toFixed(1)}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => showToast('Chat penjual · fitur demo')}
                style={({ pressed }) => [styles.chat, pressed && styles.pressed]}>
                <Ionicons name="chatbubble-ellipses-outline" size={13} color={colors.primaryDark} />
                <Text style={styles.chatText}>Chat</Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.divider} />

          <View style={styles.variantHeader}>
            <Text style={styles.sectionTitle}>Pilih Variasi</Text>
            <Text style={styles.variantSelected}>{variant}</Text>
          </View>
          <View style={styles.variants}>
            {product.variants.map((option) => {
              const active = option === variant;
              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    haptic('select');
                    setVariant(option);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={({ pressed }) => [
                    styles.variant,
                    active && styles.variantActive,
                    pressed && styles.pressed,
                  ]}>
                  {active ? (
                    <Ionicons name="checkmark" size={12} color={colors.primaryDark} />
                  ) : null}
                  <Text style={[styles.variantText, active && styles.variantTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Detail Produk</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.highlights}>
            <View style={styles.highlight}>
              <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
              <Text style={styles.highlightText}>Garansi resmi & produk original</Text>
            </View>
            <View style={styles.highlight}>
              <Ionicons name="car-outline" size={16} color={colors.primary} />
              <Text style={styles.highlightText}>Dikirim dari {store?.city ?? 'Jakarta'}</Text>
            </View>
            <View style={styles.highlight}>
              <Ionicons name="refresh-outline" size={16} color={colors.primary} />
              <Text style={styles.highlightText}>Pengembalian gratis dalam 7 hari</Text>
            </View>
          </View>

          <View style={styles.specCard}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Merek</Text>
              <Text style={styles.specValue}>{product.brand}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Kondisi</Text>
              <Text style={styles.specValue}>Baru</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Toko</Text>
              <Text style={styles.specValue}>{store?.name ?? 'TokopediaFake'}</Text>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            Produk ini fiktif dan dibuat untuk keperluan demo UI. Harga dan ketersediaan tidak
            berlaku.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <Pressable
          onPress={() => {
            haptic('light');
            toggleWishlist(product.id);
            showToast(wished ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist');
          }}
          accessibilityLabel="Wishlist"
          style={({ pressed }) => [styles.wishButton, pressed && styles.pressed]}>
          <Ionicons
            name={wished ? 'heart' : 'heart-outline'}
            size={20}
            color={wished ? colors.danger : colors.muted}
          />
        </Pressable>
        <Button
          variant="outline"
          label={added ? 'Ditambahkan' : 'Keranjang'}
          icon={added ? 'checkmark' : 'cart-outline'}
          onPress={add}
          style={styles.flexButton}
        />
        <Button label="Beli Langsung" onPress={buyNow} style={styles.flexButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 26,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  pressed: {
    opacity: 0.6,
  },
  imageWrap: {
    height: 286,
    marginTop: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    position: 'absolute',
    left: spacing.lg,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.danger,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.surface,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    marginTop: -20,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  brand: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  shippingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  shippingText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  name: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.6,
  },
  original: {
    fontSize: 11,
    color: colors.subtle,
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: colors.dangerSoft,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.danger,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingValue: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.text,
  },
  ratingCount: {
    fontSize: 9.5,
    color: colors.muted,
  },
  dot: {
    fontSize: 9,
    color: colors.subtle,
  },
  sold: {
    fontSize: 9.5,
    color: colors.muted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginVertical: spacing.md,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  storeCopy: {
    flex: 1,
    gap: 2,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  storeName: {
    flexShrink: 1,
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.ink,
  },
  storeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  storeMetaText: {
    fontSize: 9.5,
    color: colors.muted,
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  chatText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  variantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  variantSelected: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  variants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  variant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  variantActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  variantText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.text,
  },
  variantTextActive: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  description: {
    fontSize: 11.5,
    lineHeight: 18,
    color: colors.muted,
    marginTop: 6,
  },
  highlights: {
    gap: 8,
    marginTop: spacing.md,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  highlightText: {
    fontSize: 10.5,
    color: colors.text,
  },
  specCard: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  specLabel: {
    fontSize: 10.5,
    color: colors.muted,
  },
  specValue: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.text,
    maxWidth: '65%',
    textAlign: 'right',
  },
  specDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
  },
  disclaimer: {
    fontSize: 9,
    lineHeight: 14,
    color: colors.subtle,
    marginTop: spacing.md,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm + 2,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    ...shadows.float,
  },
  wishButton: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexButton: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
