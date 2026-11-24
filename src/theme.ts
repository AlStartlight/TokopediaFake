import { Platform, type ViewStyle } from 'react-native';

/**
 * TokopediaFake design tokens.
 * A green-first palette inspired by the original Tokopedia brand.
 */
export const colors = {
  primary: '#00AA5B',
  primaryDark: '#007A42',
  primarySoft: '#E7F8EF',
  primaryTint: '#CDEFDD',
  accent: '#FFC400',
  accentSoft: '#FFF6D6',
  danger: '#E5484D',
  dangerSoft: '#FDECEC',
  orange: '#FF7A00',
  blue: '#2563EB',
  ink: '#16201A',
  text: '#28352D',
  muted: '#6B7A72',
  subtle: '#93A099',
  line: '#E7EDE9',
  bg: '#F4F6F5',
  surface: '#FFFFFF',
  overlay: 'rgba(9, 24, 16, 0.45)',
} as const;

export const gradients = {
  header: ['#00B368', '#007A46'],
  primary: ['#00C26A', '#00915A'],
  promo: ['#0C5A42', '#00A86B', '#8BD9A8'],
  apple: ['#111C3D', '#2C4F91'],
  flash: ['#FF8A00', '#F04400'],
  wallet: ['#0F766E', '#115E59'],
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

/** Keep the phone-style layout readable on tablets and the web. */
export const MAX_WIDTH = 520;

export const shadows = {
  card: Platform.select<ViewStyle>({
    web: { boxShadow: '0 6px 18px rgba(12, 32, 22, 0.08)' } as ViewStyle,
    default: {
      shadowColor: '#0C2016',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 5 },
      elevation: 3,
    },
  }),
  float: Platform.select<ViewStyle>({
    web: { boxShadow: '0 10px 30px rgba(12, 32, 22, 0.16)' } as ViewStyle,
    default: {
      shadowColor: '#0C2016',
      shadowOpacity: 0.16,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 8,
    },
  }),
} as const;
