import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { productsById, type Product } from '@/data/catalog';
import { useShop } from '@/store/shop';
import { colors, MAX_WIDTH, spacing } from '@/theme';

export default function WishlistScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { wishlist } = useShop();

  const pageWidth = Math.min(width, MAX_WIDTH);
  const cardWidth = (pageWidth - spacing.lg * 2 - spacing.md) / 2;
  const saved = wishlist
    .map((id) => productsById[id])
    .filter((product): product is Product => Boolean(product));

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Wishlist" subtitle={`${saved.length} produk disimpan`} />
      {saved.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="Wishlist-mu masih kosong"
          description="Simpan produk favorit dengan menekan ikon hati pada produk."
          actionLabel="Jelajahi Produk"
          onAction={() => router.replace('/feed')}
        />
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  column: {
    gap: spacing.md,
  },
});
