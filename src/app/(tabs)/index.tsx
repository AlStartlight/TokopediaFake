import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BannerCarousel } from '@/components/BannerCarousel';
import { CategoryRail } from '@/components/CategoryRail';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { PromoBanner } from '@/components/PromoBanner';
import { QuickActions } from '@/components/QuickActions';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { useToast } from '@/components/Toast';
import { products, type Banner, type Category } from '@/data/catalog';
import { colors, gradients, MAX_WIDTH, spacing } from '@/theme';
import { discountPercent } from '@/utils/format';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const pageWidth = Math.min(width, MAX_WIDTH);
  const gridCardWidth = (pageWidth - spacing.lg * 2 - spacing.md) / 2;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
      showToast('Halaman berhasil diperbarui');
    }, 900);
  };

  const promoProducts = [...products]
    .filter((product) => discountPercent(product.originalPrice, product.price) > 0)
    .sort(
      (a, b) =>
        discountPercent(b.originalPrice, b.price) - discountPercent(a.originalPrice, a.price),
    )
    .slice(0, 6);

  const recommended = products
    .filter((product) => !promoProducts.some((promo) => promo.id === product.id))
    .slice(0, 6);

  const openSearch = () => router.push('/search');

  const openBanner = (banner: Banner) => {
    router.push({ pathname: '/product/[id]', params: { id: banner.productId } });
  };

  const openCategory = (category: Category) => {
    router.push({ pathname: '/search', params: { q: category.label } });
  };

  const openPromoList = () => {
    router.push({ pathname: '/search', params: { q: 'promo' } });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }>
        <LinearGradient
          colors={gradients.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <View style={styles.topRow}>
            <Pressable
              onPress={() => showToast('Alamat aktif: Jakarta Selatan')}
              accessibilityRole="button"
              accessibilityLabel="Ubah alamat pengiriman"
              style={({ pressed }) => [styles.location, pressed && styles.pressed]}>
              <Ionicons name="location" size={15} color="#D8FFE9" />
              <View>
                <Text style={styles.locationLabel}>Dikirim ke</Text>
                <View style={styles.locationRow}>
                  <Text style={styles.locationValue}>Jakarta Selatan</Text>
                  <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
                </View>
              </View>
            </Pressable>
            <View style={styles.headerIcons}>
              <Pressable
                onPress={() => showToast('Wishlist-mu ada di menu Akun')}
                hitSlop={8}
                accessibilityLabel="Wishlist"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="heart-outline" size={21} color={colors.surface} />
              </Pressable>
              <Pressable
                onPress={() => showToast('Tidak ada pesan baru')}
                hitSlop={8}
                accessibilityLabel="Pesan"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="mail-outline" size={21} color={colors.surface} />
              </Pressable>
              <Pressable
                onPress={() => showToast('3 notifikasi baru')}
                hitSlop={8}
                accessibilityLabel="Notifikasi"
                style={({ pressed }) => pressed && styles.pressed}>
                <View>
                  <Ionicons name="notifications-outline" size={21} color={colors.surface} />
                  <View style={styles.notificationDot} />
                </View>
              </Pressable>
            </View>
          </View>
          <SearchBar
            onPress={openSearch}
            placeholder="Cari barang original"
            style={styles.search}
          />
        </LinearGradient>

        <View style={styles.carousel}>
          <BannerCarousel onPressBanner={openBanner} />
        </View>

        <QuickActions
          onAction={(label) => showToast(`${label} · fitur demo TokopediaFake`)}
        />

        <SectionHeader
          title="Kategori Pilihan"
          actionLabel="Lihat Semua"
          onAction={openSearch}
        />
        <CategoryRail onSelect={openCategory} />

        <PromoBanner
          onPress={() => router.push({ pathname: '/search', params: { q: 'promo' } })}
        />

        <SectionHeader
          title="Lagi Promo"
          subtitle="Diskon terbatas, jangan sampai kehabisan"
          actionLabel="Lihat Semua"
          onAction={openPromoList}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rail}>
          {loading
            ? [0, 1, 2, 3].map((item) => <ProductCardSkeleton key={item} width={148} />)
            : promoProducts.map((product) => (
                <ProductCard key={product.id} product={product} width={148} />
              ))}
        </ScrollView>

        <SectionHeader
          title="Rekomendasi Untukmu"
          subtitle="Produk pilihan dengan rating terbaik"
          actionLabel="Jelajahi"
          onAction={() => router.push('/feed')}
        />
        <View style={styles.grid}>
          {loading
            ? [0, 1, 2, 3].map((item) => (
                <ProductCardSkeleton key={item} width={gridCardWidth} />
              ))
            : recommended.map((product) => (
                <ProductCard key={product.id} product={product} width={gridCardWidth} />
              ))}
        </View>

        <Pressable
          onPress={() => router.push({ pathname: '/search', params: { q: 'promo' } })}
          style={({ pressed }) => [styles.disclaimer, pressed && styles.pressed]}>
          <Ionicons name="information-circle-outline" size={14} color={colors.subtle} />
          <Text style={styles.disclaimerText}>
            TokopediaFake · semua toko, harga, dan produk di aplikasi ini fiktif.
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 58,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.72)',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.surface,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: '#00A45A',
  },
  pressed: {
    opacity: 0.6,
  },
  search: {
    marginTop: spacing.md,
    height: 44,
  },
  carousel: {
    marginTop: -42,
  },
  rail: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingBottom: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 10,
    color: colors.subtle,
    lineHeight: 15,
  },
});
