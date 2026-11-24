import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OfficialStoreCard } from '@/components/OfficialStoreCard';
import { SearchBar } from '@/components/SearchBar';
import { useToast } from '@/components/Toast';
import { stores, type Store } from '@/data/catalog';
import { colors, gradients, radius, spacing } from '@/theme';
import { haptic } from '@/utils/format';

type FilterKey = 'semua' | 'elektronik' | 'fashion' | 'kecantikan' | 'rumah';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'elektronik', label: 'Elektronik' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'kecantikan', label: 'Kecantikan' },
  { key: 'rumah', label: 'Rumah Tangga' },
];

export default function OfficialScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<FilterKey>('semua');
  const [refreshing, setRefreshing] = useState(false);

  const visibleStores =
    filter === 'semua' ? stores : stores.filter((store) => store.category === filter);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Daftar toko resmi diperbarui');
    }, 850);
  };

  const openStore = (store: Store) => {
    router.push({ pathname: '/search', params: { q: store.name } });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <FlatList
        data={visibleStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OfficialStoreCard store={item} onPress={openStore} />}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListHeaderComponent={
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <View style={styles.titleRow}>
              <View style={styles.titleLeft}>
                <View style={styles.titleIcon}>
                  <Ionicons name="storefront" size={17} color={colors.primaryDark} />
                </View>
                <View>
                  <Text style={styles.title}>Official Store</Text>
                  <Text style={styles.subtitle}>Produk asli, garansi resmi</Text>
                </View>
              </View>
              <Pressable
                onPress={() => showToast('Semua toko di sini sudah terverifikasi')}
                hitSlop={8}
                accessibilityLabel="Bantuan official store"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="help-circle-outline" size={22} color={colors.muted} />
              </Pressable>
            </View>

            <SearchBar
              onPress={() => router.push('/search')}
              tone="muted"
              placeholder="Cari official store"
              style={styles.search}
            />

            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}>
              <View style={styles.heroIcon}>
                <Ionicons name="shield-checkmark" size={21} color={colors.surface} />
              </View>
              <View style={styles.heroCopy}>
                <Text style={styles.heroTitle}>100% Original & Bergaransi</Text>
                <Text style={styles.heroSubtitle}>
                  Belanja aman dari toko resmi pilihan TokopediaFake
                </Text>
              </View>
              <View style={styles.heroDecor} />
            </LinearGradient>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Toko Resmi Pilihan</Text>
              <Text style={styles.sectionCount}>{visibleStores.length} toko</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}>
              {FILTERS.map((item) => {
                const active = item.key === filter;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => {
                      haptic('select');
                      setFilter(item.key);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={({ pressed }) => [
                      styles.chip,
                      active && styles.chipActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="storefront-outline" size={30} color={colors.subtle} />
            <Text style={styles.emptyText}>Belum ada toko untuk kategori ini.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  titleIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 10.5,
    color: colors.muted,
  },
  pressed: {
    opacity: 0.55,
  },
  search: {
    height: 44,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 14,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCopy: {
    flex: 1,
    gap: 2,
    zIndex: 2,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 10.5,
    lineHeight: 14,
  },
  heroDecor: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    right: -32,
    top: -44,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  sectionCount: {
    fontSize: 10.5,
    color: colors.muted,
  },
  chips: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.muted,
  },
  chipTextActive: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 12,
    color: colors.muted,
  },
});
