import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { useToast } from '@/components/Toast';
import { useShop } from '@/store/shop';
import { colors, gradients, radius, shadows, spacing } from '@/theme';
import { formatIDR, haptic } from '@/utils/format';

const ORDER_SHORTCUTS = [
  { key: 'unpaid', icon: 'wallet-outline', label: 'Belum Bayar', count: 2 },
  { key: 'packed', icon: 'cube-outline', label: 'Dikemas', count: 1 },
  { key: 'shipped', icon: 'car-outline', label: 'Dikirim', count: 3 },
  { key: 'done', icon: 'checkmark-done-outline', label: 'Selesai', count: 6 },
] as const;

const MENU_ITEMS = [
  { key: 'wishlist', icon: 'heart-outline', label: 'Wishlist Saya', href: '/wishlist' as const },
  { key: 'address', icon: 'location-outline', label: 'Alamat Pengiriman' },
  { key: 'payment', icon: 'card-outline', label: 'Metode Pembayaran' },
  { key: 'security', icon: 'shield-checkmark-outline', label: 'Keamanan Akun' },
  { key: 'help', icon: 'help-circle-outline', label: 'Pusat Bantuan' },
  { key: 'about', icon: 'information-circle-outline', label: 'Tentang Aplikasi' },
] as const;

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { wishlist } = useShop();

  const openMenu = (item: (typeof MENU_ITEMS)[number]) => {
    haptic('light');
    if (item.key === 'wishlist') {
      router.push('/wishlist');
      return;
    }
    if (item.key === 'about') {
      showToast('TokopediaFake v1.0.0 · Expo SDK 58');
      return;
    }
    showToast(`${item.label} · fitur demo`);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <LinearGradient
          colors={gradients.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Akun</Text>
            <View style={styles.headerActions}>
              <Pressable
                onPress={() => showToast('Tidak ada pesan baru')}
                hitSlop={8}
                accessibilityLabel="Pesan"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="mail-outline" size={21} color={colors.surface} />
              </Pressable>
              <Pressable
                onPress={() => showToast('Pengaturan akun · fitur demo')}
                hitSlop={8}
                accessibilityLabel="Pengaturan"
                style={({ pressed }) => pressed && styles.pressed}>
                <Ionicons name="settings-outline" size={21} color={colors.surface} />
              </Pressable>
            </View>
          </View>

          <View style={styles.profileRow}>
            <Avatar
              initials="AJ"
              colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.12)']}
              size={62}
              fontSize={24}
              rounded={31}
            />
            <View style={styles.profileCopy}>
              <Text style={styles.name}>Asep Jumadi</Text>
              <Text style={styles.email}>asep@tokopediafake.id</Text>
              <Pressable
                onPress={() => showToast('Edit profil · fitur demo')}
                style={({ pressed }) => [styles.editChip, pressed && styles.pressed]}>
                <Ionicons name="pencil" size={10} color={colors.surface} />
                <Text style={styles.editText}>Edit Profil</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.headerDecor} />
        </LinearGradient>

        <View style={styles.statsCard}>
          <Pressable
            onPress={() => showToast('12 pesanan · fitur demo')}
            style={({ pressed }) => [styles.stat, pressed && styles.pressed]}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Pesanan</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable
            onPress={() => router.push('/wishlist')}
            style={({ pressed }) => [styles.stat, pressed && styles.pressed]}>
            <Text style={styles.statValue}>{wishlist.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable
            onPress={() => showToast('3 kupon aktif · fitur demo')}
            style={({ pressed }) => [styles.stat, pressed && styles.pressed]}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Kupon</Text>
          </Pressable>
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletIcon}>
            <Ionicons name="wallet" size={19} color={colors.surface} />
          </View>
          <View style={styles.walletCopy}>
            <Text style={styles.walletLabel}>Saldo Tokopedia</Text>
            <Text style={styles.walletValue}>{formatIDR(250_000)}</Text>
          </View>
          <Pressable
            onPress={() => showToast('Top up saldo · fitur demo')}
            style={({ pressed }) => [styles.topUp, pressed && styles.pressed]}>
            <Text style={styles.topUpText}>Top Up</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Pesanan Saya</Text>
            <Pressable
              onPress={() => showToast('Riwayat pesanan · fitur demo')}
              style={({ pressed }) => pressed && styles.pressed}>
              <Text style={styles.cardAction}>Riwayat</Text>
            </Pressable>
          </View>
          <View style={styles.shortcuts}>
            {ORDER_SHORTCUTS.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => showToast(`${item.label} · fitur demo`)}
                style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]}>
                <View style={styles.shortcutIconWrap}>
                  <Ionicons name={item.icon} size={21} color={colors.primaryDark} />
                  {item.count > 0 ? (
                    <View style={styles.shortcutBadge}>
                      <Text style={styles.shortcutBadgeText}>{item.count}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.shortcutLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, styles.menuTitle]}>Pengaturan Akun</Text>
          {MENU_ITEMS.map((item, index) => (
            <View key={item.key}>
              {index > 0 ? <View style={styles.menuDivider} /> : null}
              <Pressable
                onPress={() => openMenu(item)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.menuRow, pressed && styles.menuPressed]}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={18} color={colors.text} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.key === 'wishlist' && wishlist.length > 0 ? (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>{wishlist.length}</Text>
                  </View>
                ) : null}
                <Ionicons name="chevron-forward" size={15} color={colors.subtle} />
              </Pressable>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => showToast('Berhasil keluar (demo)')}
          style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
          <Ionicons name="log-out-outline" size={17} color={colors.danger} />
          <Text style={styles.logoutText}>Keluar</Text>
        </Pressable>

        <Text style={styles.footer}>TokopediaFake v1.0.0 · Expo SDK 58 · React Native 0.88</Text>
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
    paddingBottom: spacing.xxl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 56,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    overflow: 'hidden',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.surface,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  pressed: {
    opacity: 0.6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    zIndex: 2,
  },
  profileCopy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.surface,
  },
  email: {
    fontSize: 10.5,
    color: 'rgba(255,255,255,0.75)',
  },
  editChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginTop: 5,
  },
  editText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.surface,
  },
  headerDecor: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    right: -56,
    top: -70,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginHorizontal: spacing.lg,
    marginTop: -34,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink,
  },
  statLabel: {
    fontSize: 9.5,
    color: colors.muted,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 24,
    backgroundColor: colors.line,
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  walletIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletCopy: {
    flex: 1,
    gap: 1,
  },
  walletLabel: {
    fontSize: 9.5,
    color: colors.muted,
  },
  walletValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  topUp: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  topUpText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  cardAction: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.primary,
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcut: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  shortcutIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  shortcutBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.surface,
  },
  shortcutLabel: {
    fontSize: 8.5,
    color: colors.muted,
    textAlign: 'center',
  },
  menuTitle: {
    marginBottom: spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  menuPressed: {
    opacity: 0.55,
  },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.xs + 2,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  menuBadge: {
    minWidth: 18,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 9,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
  },
  menuBadgeText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginLeft: 40,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#F6D4D4',
    backgroundColor: colors.surface,
  },
  logoutText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.danger,
  },
  footer: {
    textAlign: 'center',
    fontSize: 9.5,
    color: colors.subtle,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
});
