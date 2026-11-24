import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import {
  categories,
  searchProducts,
  trendingSearches,
  type Category,
} from '@/data/catalog';
import { colors, MAX_WIDTH, radius, spacing } from '@/theme';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { q: qParam } = useLocalSearchParams<{ q?: string }>();
  const initial = typeof qParam === 'string' ? qParam : '';
  const [query, setQuery] = useState(initial);

  const pageWidth = Math.min(width, MAX_WIDTH);
  const cardWidth = (pageWidth - spacing.lg * 2 - spacing.md) / 2;
  const results = query.trim() ? searchProducts(query) : [];

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  const pickCategory = (category: Category) => setQuery(category.label);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={goBack}
          hitSlop={8}
          accessibilityLabel="Kembali"
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
          <Ionicons name="arrow-back" size={20} color={colors.ink} />
        </Pressable>
        <SearchBar
          editable
          autoFocus
          value={query}
          onChangeText={setQuery}
          placeholder="Cari di Tokopedia"
          style={styles.search}
        />
        <Pressable onPress={goBack} hitSlop={6}>
          <Text style={styles.cancel}>Batal</Text>
        </Pressable>
      </View>

      {!query.trim() ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.discovery}>
          <Text style={styles.sectionTitle}>Pencarian Populer</Text>
          <View style={styles.chips}>
            {trendingSearches.map((term) => (
              <Pressable
                key={term}
                onPress={() => setQuery(term)}
                style={({ pressed }) => [styles.chip, pressed && styles.pressed]}>
                <Ionicons name="trending-up" size={12} color={colors.primary} />
                <Text style={styles.chipText}>{term}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Jelajahi Kategori</Text>
          <View style={styles.categories}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => pickCategory(category)}
                style={({ pressed }) => [styles.category, pressed && styles.pressed]}>
                <View style={[styles.categoryIcon, { backgroundColor: category.bg }]}>
                  <Ionicons name={category.icon} size={19} color={category.tint} />
                </View>
                <Text style={styles.categoryLabel}>{category.label}</Text>
                <Ionicons name="chevron-forward" size={13} color={colors.subtle} />
              </Pressable>
            ))}
          </View>

          <View style={styles.tip}>
            <Ionicons name="bulb-outline" size={16} color={colors.primaryDark} />
            <Text style={styles.tipText}>
              Tips: coba cari “iPhone”, “Nike”, atau nama toko seperti “Apple Official Store”.
            </Text>
          </View>
        </ScrollView>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.results}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle} numberOfLines={1}>
                Hasil untuk “{query.trim()}”
              </Text>
              <Text style={styles.resultsCount}>{results.length} produk ditemukan</Text>
            </View>
          }
          renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        />
      ) : (
        <EmptyState
          icon="search"
          title="Produk tidak ditemukan"
          description={`Tidak ada hasil untuk “${query.trim()}”. Coba kata kunci lain atau jelajahi kategori.`}
          actionLabel="Hapus Pencarian"
          onAction={() => setQuery('')}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  back: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  pressed: {
    opacity: 0.6,
  },
  search: {
    flex: 1,
    height: 42,
    backgroundColor: '#F1F4F2',
  },
  cancel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  discovery: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: spacing.md,
  },
  sectionSpacing: {
    marginTop: spacing.xxl,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  category: {
    width: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm + 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  categoryIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.text,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primarySoft,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.xxl,
  },
  tipText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: colors.primaryDark,
  },
  results: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  column: {
    gap: spacing.md,
  },
  resultsHeader: {
    gap: 2,
    paddingBottom: spacing.xs,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
  },
  resultsCount: {
    fontSize: 10.5,
    color: colors.muted,
  },
});
