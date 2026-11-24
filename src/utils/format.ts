import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/** Format a number as Indonesian Rupiah, e.g. 2499000 -> "Rp2.499.000". */
export function formatIDR(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  const digits = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}Rp${digits}`;
}

/** 1250000 -> "1,3 jt"; 24800 -> "24,8 rb". */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} jt`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace('.', ',')} rb`;
  }
  return String(value);
}

export function discountPercent(originalPrice: number, price: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function soldLabel(sold: number): string {
  if (sold >= 1000) return `${formatCompact(sold)} terjual`;
  return `${sold} terjual`;
}

export function formatCount(value: number): string {
  return value > 999 ? formatCompact(value) : String(value);
}

/** Fire a short haptic; silently no-ops on web and unsupported devices. */
export function haptic(type: 'select' | 'success' | 'light' = 'select'): void {
  if (Platform.OS === 'web') return;
  try {
    if (type === 'success') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else if (type === 'light') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } else {
      void Haptics.selectionAsync().catch(() => {});
    }
  } catch {
    // Haptics are a nice-to-have; never break the UI over them.
  }
}
