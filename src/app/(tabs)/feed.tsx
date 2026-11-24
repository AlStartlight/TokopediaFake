import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { StoreCard } from '@/components/StoreCard';
import { useToast } from '@/components/Toast';
import { TopTabs } from '@/components/TopTabs';
import { products, stores } from '@/data/catalog';
import { colors, MAX_WIDTH, spacing } from '@/theme';
import { haptic } from '@/utils/format';

const FEED_STORE_IDS = ['apple-official', 'nike-indonesia', 'glow-beauty', 'gadget-hub', 'rumah-tangga-jaya'];

export default function FeedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { showToast } = useToast();
  const [tab, setTab] = useState<'updates' | 'explore'>('updates');
  const [refreshing, setRefreshing] = useState(false);

  const pageWidth = Math.min(width, MAX_WIDTH);
  const gridCardWidth = (pageWidth - spacing.lg * 2 - spacing.md) / 2;
  const feedStores = stores.filter((store) => FEED_STORE_IDS.includes(store.id));

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Feed berhasil diperbarui');
    }, 850);
  };

  const openSearch = () => router.push('/search');

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerInner}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Feed</Text>
              <Text style={styles.subtitle}>Temukan toko dan produk favoritmu</Text>
            </View>
            <View style={styles.headerIcons}>
              <Pressable
                onPress={() => showToast('Tidak ada pesan baru')}
                hitSlop={8}
                accessibilityLabel="Pesan"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="mail-outline" size={22} color={colors.ink} />
              </Pressable>
              <Pressable
                onPress={() => showToast('3 notifikasi baru')}
                hitSlop={8}
                accessibilityLabel="Notifikasi"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="notifications-outline" size={22} color={colors.ink} />
              </Pressable>
            </View>
          </View>
          <SearchBar
            onPress={openSearch}
            tone="muted"
            placeholder="Cari toko atau produk"
            style={styles.search}
          />
        </View>
        <TopTabs
          tabs={[
            { key: 'updates', label: 'Updates' },
            { key: 'explore', label: 'Explore' },
          ]}
          active={tab}
          onChange={(key) => {
            haptic('select');
            setTab(key as 'updates' | 'explore');
          }}
          style={styles.tabs}
        />
      </View>

      {tab === 'updates' ? (
        <FlatList
          key="updates"
          data={feedStores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StoreCard
              store={item}
              onSeeAll={(store) =>
                router.push({ pathname: '/search', params: { q: store.name } })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listLabel}>Update dari toko favorit</Text>
              <Text style={styles.listCount}>{feedStores.length} toko</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      ) : (
        <FlatList
          key="explore"
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.column}
          renderItem={({ item }) => <ProductCard product={item} width={gridCardWidth} />}
          contentContainerStyle={styles.gridContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listLabel}>Produk pilihan</Text>
              <Text style={styles.listCount}>{products.length} produk</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
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
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  headerInner: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  pressed: {
    opacity: 0.55,
  },
  search: {
    height: 44,
  },
  tabs: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg - 2,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  gridContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  column: {
    gap: spacing.md,
  },
  separator: {
    height: spacing.md + 2,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
  },
  listLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  listCount: {
    fontSize: 10.5,
    color: colors.muted,
  },
});
