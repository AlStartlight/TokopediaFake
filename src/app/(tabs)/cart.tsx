import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { QuantityStepper } from '@/components/QuantityStepper';
import { useToast } from '@/components/Toast';
import { productsById } from '@/data/catalog';
import { useShop } from '@/store/shop';
import { colors, gradients, radius, shadows, spacing } from '@/theme';
import { formatIDR, haptic } from '@/utils/format';

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { cart, setQuantity, removeFromCart, clearCart } = useShop();
  const [deselected, setDeselected] = useState<string[]>([]);
  const [successVisible, setSuccessVisible] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderId, setOrderId] = useState('');

  const items = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: productsById[item.productId] }))
        .filter((item) => Boolean(item.product)),
    [cart],
  );

  const selectedItems = items.filter((item) => !deselected.includes(item.productId));
  const allSelected =
    items.length > 0 && items.every((item) => !deselected.includes(item.productId));
  const subtotal = selectedItems.reduce((total, item) => total + item.product.price * item.qty, 0);
  const savings = selectedItems.reduce(
    (total, item) => total + Math.max(0, item.product.originalPrice - item.product.price) * item.qty,
    0,
  );
  const originalSubtotal = subtotal + savings;

  const toggleItem = (productId: string) => {
    haptic('select');
    setDeselected((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const toggleAll = () => {
    haptic('select');
    setDeselected(allSelected ? items.map((item) => item.productId) : []);
  };

  const remove = (productId: string) => {
    haptic('light');
    removeFromCart(productId);
    setDeselected((current) => current.filter((id) => id !== productId));
    showToast('Produk dihapus dari keranjang');
  };

  const checkout = () => {
    if (selectedItems.length === 0) {
      showToast('Pilih minimal satu produk');
      return;
    }
    haptic('success');
    setOrderTotal(subtotal);
    setOrderId(`INV-${Date.now().toString().slice(-8)}`);
    setSuccessVisible(true);
  };

  const finish = () => {
    setSuccessVisible(false);
    clearCart();
    setDeselected([]);
    router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.title}>Keranjang</Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>{items.length} produk</Text>
            </View>
          </View>
          {items.length > 0 ? (
            <Pressable
              onPress={() => {
                clearCart();
                setDeselected([]);
                showToast('Keranjang dikosongkan');
              }}
              hitSlop={8}
              accessibilityLabel="Kosongkan keranjang"
              style={({ pressed }) => pressed && styles.pressed}>
              <Ionicons name="trash-outline" size={20} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon="bag-handle-outline"
          title="Keranjangmu masih kosong"
          description="Yuk cari produk favoritmu dan mulai belanja di TokopediaFake."
          actionLabel="Mulai Belanja"
          onAction={() => router.replace('/')}
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Ionicons name="ticket-outline" size={18} color={colors.primaryDark} />
              </View>
              <View style={styles.infoCopy}>
                <Text style={styles.infoTitle}>Pakai Kupon</Text>
                <Text style={styles.infoSubtitle}>3 kupon tersedia · hemat hingga Rp50.000</Text>
              </View>
              <Pressable
                onPress={() => showToast('Kupon demo: GAJIAN25')}
                style={({ pressed }) => [styles.infoAction, pressed && styles.pressed]}>
                <Text style={styles.infoActionText}>Pilih</Text>
                <Ionicons name="chevron-forward" size={13} color={colors.primary} />
              </Pressable>
            </View>

            <View style={styles.itemsCard}>
              {items.map((item, index) => {
                const checked = !deselected.includes(item.productId);
                return (
                  <View key={item.productId}>
                    {index > 0 ? <View style={styles.divider} /> : null}
                    <View style={styles.itemRow}>
                      <Pressable
                        onPress={() => toggleItem(item.productId)}
                        hitSlop={8}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked }}
                        accessibilityLabel={`Pilih ${item.product.name}`}
                        style={({ pressed }) => [
                          styles.checkbox,
                          checked && styles.checkboxActive,
                          pressed && styles.pressed,
                        ]}>
                        {checked ? (
                          <Ionicons name="checkmark" size={13} color={colors.surface} />
                        ) : null}
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          router.push({
                            pathname: '/product/[id]',
                            params: { id: item.productId },
                          })
                        }
                        style={styles.itemImageWrap}>
                        <Image
                          source={item.product.image}
                          style={styles.itemImage}
                          contentFit="contain"
                          transition={120}
                        />
                      </Pressable>
                      <View style={styles.itemBody}>
                        <Text style={styles.itemName} numberOfLines={2}>
                          {item.product.name}
                        </Text>
                        <Text style={styles.itemVariant}>
                          {item.variant ? `Variasi: ${item.variant}` : item.product.brand}
                        </Text>
                        <View style={styles.itemBottom}>
                          <Text style={styles.itemPrice}>{formatIDR(item.product.price)}</Text>
                          <View style={styles.itemActions}>
                            <QuantityStepper
                              value={item.qty}
                              compact
                              onChange={(qty) => setQuantity(item.productId, qty)}
                            />
                            <Pressable
                              onPress={() => remove(item.productId)}
                              hitSlop={8}
                              accessibilityLabel="Hapus produk"
                              style={({ pressed }) => pressed && styles.pressed}>
                              <Ionicons name="trash-outline" size={17} color={colors.subtle} />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal (harga normal)</Text>
                <Text style={styles.summaryValue}>{formatIDR(originalSubtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diskon produk</Text>
                <Text style={[styles.summaryValue, styles.savings]}>-{formatIDR(savings)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ongkos kirim</Text>
                <Text style={[styles.summaryValue, styles.free]}>Gratis</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatIDR(subtotal)}</Text>
              </View>
            </View>

            <View style={styles.note}>
              <Ionicons name="shield-checkmark-outline" size={15} color={colors.primary} />
              <Text style={styles.noteText}>
                Transaksi dilindungi. Semua produk di aplikasi demo ini fiktif.
              </Text>
            </View>
          </ScrollView>

          <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
            <Pressable
              onPress={toggleAll}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: allSelected }}
              style={({ pressed }) => [styles.selectAll, pressed && styles.pressed]}>
              <View style={[styles.checkbox, allSelected && styles.checkboxActive]}>
                {allSelected ? (
                  <Ionicons name="checkmark" size={13} color={colors.surface} />
                ) : null}
              </View>
              <Text style={styles.selectAllText}>Semua</Text>
            </Pressable>
            <View style={styles.totalCopy}>
              <Text style={styles.totalCaption}>Total</Text>
              <Text style={styles.totalPrice}>{formatIDR(subtotal)}</Text>
            </View>
            <Button
              label={`Buat Pesanan (${selectedItems.length})`}
              onPress={checkout}
              disabled={selectedItems.length === 0}
              style={styles.checkout}
            />
          </View>

          <Modal
            visible={successVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setSuccessVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <LinearGradient
                  colors={gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.successIcon}>
                  <Ionicons name="checkmark" size={32} color={colors.surface} />
                </LinearGradient>
                <Text style={styles.successTitle}>Pesanan berhasil dibuat!</Text>
                <Text style={styles.successSubtitle}>
                  Terima kasih sudah berbelanja. Pesananmu sedang disiapkan penjual.
                </Text>
                <View style={styles.orderBox}>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>No. pesanan</Text>
                    <Text style={styles.orderValue}>{orderId}</Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Total bayar</Text>
                    <Text style={styles.orderTotal}>{formatIDR(orderTotal)}</Text>
                  </View>
                </View>
                <Button label="Kembali Belanja" onPress={finish} style={styles.modalButton} />
              </View>
            </View>
          </Modal>
        </>
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  countPill: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  countText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  pressed: {
    opacity: 0.6,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 150,
    gap: spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadows.card,
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCopy: {
    flex: 1,
    gap: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.ink,
  },
  infoSubtitle: {
    fontSize: 9.5,
    color: colors.muted,
  },
  infoAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  infoActionText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.primary,
  },
  itemsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: spacing.md,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#C8D2CB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  itemImageWrap: {
    width: 68,
    height: 68,
    borderRadius: radius.sm,
    backgroundColor: '#F6F8F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemBody: {
    flex: 1,
    gap: 3,
  },
  itemName: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 15,
  },
  itemVariant: {
    fontSize: 9.5,
    color: colors.muted,
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.ink,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 9,
    ...shadows.card,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 11.5,
    color: colors.muted,
  },
  summaryValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.text,
  },
  savings: {
    color: colors.primary,
  },
  free: {
    color: colors.primary,
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 14,
    color: colors.subtle,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    ...shadows.float,
  },
  selectAll: {
    alignItems: 'center',
    gap: 3,
  },
  selectAllText: {
    fontSize: 9,
    color: colors.muted,
  },
  totalCopy: {
    flex: 1,
    gap: 1,
  },
  totalCaption: {
    fontSize: 9,
    color: colors.muted,
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  checkout: {
    paddingHorizontal: 16,
    height: 44,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: 8,
    ...shadows.float,
  },
  successIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  successTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.muted,
    textAlign: 'center',
  },
  orderBox: {
    alignSelf: 'stretch',
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
    marginTop: 6,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderLabel: {
    fontSize: 10.5,
    color: colors.muted,
  },
  orderValue: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.text,
  },
  orderTotal: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  modalButton: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
});
