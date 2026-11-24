
export type CategoryId =
  | 'elektronik'
  | 'fashion'
  | 'kecantikan'
  | 'makanan'
  | 'rumah'
  | 'olahraga'
  | 'hobi'
  | 'otomotif';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  originalPrice: number;
  image: number;
  rating: number;
  sold: number;
  storeId: string;
  description: string;
  variants: string[];
  official: boolean;
  freeShipping: boolean;
};

export type StoreBadge = 'official' | 'diamond' | 'silver';

export type Store = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: StoreBadge;
  rating: number;
  followers: number;
  city: string;
  category: CategoryId;
  colors: readonly [string, string];
  initials: string;
  productIds: string[];
};

export type Banner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  colors: readonly [string, string];
  productId: string;
};

export type Category = {
  id: CategoryId;
  label: string;
  icon:
    | 'phone-portrait-outline'
    | 'shirt-outline'
    | 'sparkles-outline'
    | 'fast-food-outline'
    | 'home-outline'
    | 'football-outline'
    | 'game-controller-outline'
    | 'car-sport-outline';
  bg: string;
  tint: string;
  query: string;
};

const images = {
  iphone: require('../../assets/images/products/iphone-13-pro.png'),
  macbook: require('../../assets/images/products/macbook-pro-14.jpg'),
  airpods: require('../../assets/images/products/airpods-max.png'),
  watch: require('../../assets/images/products/longines-watch.jpg'),
  nike: require('../../assets/images/products/nike-air-jordan.jpg'),
  blender: require('../../assets/images/products/blender.png'),
  mascara: require('../../assets/images/products/mascara.jpg'),
  backpack: require('../../assets/images/products/backpack.jpg'),
  sunglasses: require('../../assets/images/products/sunglasses.jpg'),
  ipad: require('../../assets/images/products/ipad-mini.jpg'),
  echo: require('../../assets/images/products/echo-plus.jpg'),
  tennis: require('../../assets/images/products/tennis-racket.jpg'),
  coffee: require('../../assets/images/products/nescafe.jpg'),
  lamp: require('../../assets/images/products/table-lamp.jpg'),
};

export const categories: Category[] = [
  {
    id: 'elektronik',
    label: 'Elektronik',
    icon: 'phone-portrait-outline',
    bg: '#E8F1FF',
    tint: '#2563EB',
    query: 'Elektronik',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: 'shirt-outline',
    bg: '#FFF1E7',
    tint: '#EA580C',
    query: 'Fashion',
  },
  {
    id: 'kecantikan',
    label: 'Kecantikan',
    icon: 'sparkles-outline',
    bg: '#FCEBFF',
    tint: '#C026D3',
    query: 'Kecantikan',
  },
  {
    id: 'makanan',
    label: 'Makanan',
    icon: 'fast-food-outline',
    bg: '#FFF7DB',
    tint: '#D97706',
    query: 'Makanan',
  },
  {
    id: 'rumah',
    label: 'Rumah',
    icon: 'home-outline',
    bg: '#E9FBF2',
    tint: '#059669',
    query: 'Rumah',
  },
  {
    id: 'olahraga',
    label: 'Olahraga',
    icon: 'football-outline',
    bg: '#E8F7FF',
    tint: '#0284C7',
    query: 'Olahraga',
  },
  {
    id: 'hobi',
    label: 'Hobi',
    icon: 'game-controller-outline',
    bg: '#F3E8FF',
    tint: '#7C3AED',
    query: 'Hobi',
  },
  {
    id: 'otomotif',
    label: 'Otomotif',
    icon: 'car-sport-outline',
    bg: '#EEF2F7',
    tint: '#334155',
    query: 'Otomotif',
  },
];

const productList: Product[] = [
  {
    id: 'iphone-13-pro',
    name: 'iPhone 13 Pro 256GB — Sierra Blue',
    brand: 'Apple',
    category: 'elektronik',
    price: 13_499_000,
    originalPrice: 15_999_000,
    image: images.iphone,
    rating: 4.9,
    sold: 1240,
    storeId: 'apple-official',
    description:
      'iPhone 13 Pro dengan chip A15 Bionic, layar ProMotion 120Hz, dan sistem kamera Pro tiga lensa. Hadir dengan garansi resmi Apple Indonesia 1 tahun.',
    variants: ['Sierra Blue', 'Graphite', 'Gold', 'Silver'],
    official: true,
    freeShipping: true,
  },
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14" M3 512GB — Space Grey',
    brand: 'Apple',
    category: 'elektronik',
    price: 28_999_000,
    originalPrice: 32_999_000,
    image: images.macbook,
    rating: 4.8,
    sold: 860,
    storeId: 'apple-official',
    description:
      'MacBook Pro 14 inci dengan chip M3, layar Liquid Retina XDR, dan baterai hingga 18 jam. Cocok untuk kreator konten dan profesional.',
    variants: ['Space Grey', 'Silver'],
    official: true,
    freeShipping: true,
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max — Silver',
    brand: 'Apple',
    category: 'elektronik',
    price: 7_299_000,
    originalPrice: 8_499_000,
    image: images.airpods,
    rating: 4.9,
    sold: 2140,
    storeId: 'apple-official',
    description:
      'Headphone over-ear Apple dengan Active Noise Cancellation, Spatial Audio, dan baterai hingga 20 jam. Desain premium dengan ear cushion memory foam.',
    variants: ['Silver', 'Space Grey', 'Sky Blue'],
    official: true,
    freeShipping: true,
  },
  {
    id: 'longines-watch',
    name: 'Longines Master Collection Automatic 40mm',
    brand: 'Longines',
    category: 'fashion',
    price: 21_999_000,
    originalPrice: 24_999_000,
    image: images.watch,
    rating: 4.9,
    sold: 124,
    storeId: 'luxe-time',
    description:
      'Jam tangan mekanik otomatis dengan dial hitam, strap kulit asli, dan sapphire crystal. Dilengkapi box, kartu garansi internasional, dan sertifikat keaslian.',
    variants: ['Black Dial', 'Silver Dial'],
    official: true,
    freeShipping: true,
  },
  {
    id: 'nike-air-jordan',
    name: 'Nike Air Jordan 1 Retro High OG',
    brand: 'Nike',
    category: 'fashion',
    price: 1_899_000,
    originalPrice: 2_499_000,
    image: images.nike,
    rating: 4.8,
    sold: 3120,
    storeId: 'nike-indonesia',
    description:
      'Sneaker ikonik dengan upper kulit premium dan midsole Air-Sole. Silhouette klasik yang wajib dimiliki kolektor sneaker.',
    variants: ['Red/Black', 'White/Red', 'Royal Blue'],
    official: true,
    freeShipping: true,
  },
  {
    id: 'blender',
    name: 'Boxed Blender 2L — 400W',
    brand: 'KitchenPro',
    category: 'rumah',
    price: 749_000,
    originalPrice: 1_099_000,
    image: images.blender,
    rating: 4.7,
    sold: 980,
    storeId: 'rumah-tangga-jaya',
    description:
      'Blender multifungsi dengan jar 2 liter, 4 mata pisau stainless steel, dan motor 400W. Dilengkapi 2 gelas travel tumbler.',
    variants: ['Putih', 'Hitam'],
    official: false,
    freeShipping: true,
  },
  {
    id: 'mascara',
    name: 'Essence Lash Princess Mascara Volumizing',
    brand: 'Essence',
    category: 'kecantikan',
    price: 99_000,
    originalPrice: 139_000,
    image: images.mascara,
    rating: 4.6,
    sold: 8420,
    storeId: 'glow-beauty',
    description:
      'Maskara dengan efek volume instan dan formula tahan lama hingga 12 jam. Sikat khusus untuk bulu mata lentik tanpa gumpalan.',
    variants: ['Black', 'Waterproof Black'],
    official: false,
    freeShipping: false,
  },
  {
    id: 'backpack',
    name: 'White Faux Leather Backpack — Urban Chic',
    brand: 'Urban Chic',
    category: 'fashion',
    price: 359_000,
    originalPrice: 499_000,
    image: images.backpack,
    rating: 4.7,
    sold: 1560,
    storeId: 'nike-indonesia',
    description:
      'Tas punggung kulit sintetis dengan desain minimalis, muat laptop 14 inci, dan banyak kompartemen. Cocok untuk kerja maupun kuliah.',
    variants: ['White', 'Cream'],
    official: false,
    freeShipping: true,
  },
  {
    id: 'sunglasses',
    name: 'Black Sun Glasses Classic Aviator',
    brand: 'Fashion Shades',
    category: 'fashion',
    price: 249_000,
    originalPrice: 399_000,
    image: images.sunglasses,
    rating: 4.5,
    sold: 2320,
    storeId: 'luxe-time',
    description:
      'Kacamata hitam dengan lensa polarized dan frame metal ringan. Memberikan perlindungan UV400 untuk aktivitas outdoor.',
    variants: ['Black', 'Tortoise'],
    official: false,
    freeShipping: false,
  },
  {
    id: 'ipad-mini',
    name: 'iPad Mini 2021 64GB Wi-Fi — Starlight',
    brand: 'Apple',
    category: 'elektronik',
    price: 8_499_000,
    originalPrice: 9_999_000,
    image: images.ipad,
    rating: 4.8,
    sold: 640,
    storeId: 'gadget-hub',
    description:
      'iPad Mini 6 dengan chip A15 Bionic, layar Liquid Retina 8,3 inci, dan dukungan Apple Pencil generasi 2. Ringan dan mudah dibawa.',
    variants: ['Starlight', 'Space Grey', 'Purple'],
    official: true,
    freeShipping: true,
  },
  {
    id: 'echo-plus',
    name: 'Amazon Echo Plus Smart Speaker — Grey',
    brand: 'Amazon',
    category: 'elektronik',
    price: 1_299_000,
    originalPrice: 1_799_000,
    image: images.echo,
    rating: 4.6,
    sold: 430,
    storeId: 'gadget-hub',
    description:
      'Smart speaker dengan suara 360°, built-in hub Zigbee, dan asisten Alexa. Kendalikan lampu dan perangkat pintar rumah hanya dengan suara.',
    variants: ['Grey', 'Black'],
    official: false,
    freeShipping: true,
  },
  {
    id: 'tennis-racket',
    name: 'Tennis Racket Carbon Pro 300g',
    brand: 'AceSport',
    category: 'olahraga',
    price: 899_000,
    originalPrice: 1_299_000,
    image: images.tennis,
    rating: 4.7,
    sold: 370,
    storeId: 'nike-indonesia',
    description:
      'Raket tenis frame karbon dengan bobot 300 gram dan grip anti-slip. Sudah termasuk senar dan cover raket.',
    variants: ['Grip 3', 'Grip 4'],
    official: false,
    freeShipping: true,
  },
  {
    id: 'nescafe',
    name: 'Nescafé Classic Kopi Instan 200g',
    brand: 'Nescafé',
    category: 'makanan',
    price: 39_000,
    originalPrice: 52_000,
    image: images.coffee,
    rating: 4.8,
    sold: 12400,
    storeId: 'rumah-tangga-jaya',
    description:
      'Kopi instan murni dari biji pilihan dengan aroma khas Nescafé. Praktis diseduh kapan saja, cocok untuk stok di rumah.',
    variants: ['200g', '400g'],
    official: false,
    freeShipping: false,
  },
  {
    id: 'table-lamp',
    name: 'Table Lamp Vintage Rattan — Brown',
    brand: 'Rumah Cantik',
    category: 'rumah',
    price: 229_000,
    originalPrice: 349_000,
    image: images.lamp,
    rating: 4.5,
    sold: 520,
    storeId: 'rumah-tangga-jaya',
    description:
      'Lampu meja dengan kap anyaman rotan dan base kayu. Memberikan pencahayaan hangat untuk kamar tidur atau ruang baca.',
    variants: ['Brown', 'Natural'],
    official: false,
    freeShipping: false,
  },
];

export const products = productList;

export const productsById: Record<string, Product> = Object.fromEntries(
  productList.map((product) => [product.id, product]),
);

export const stores: Store[] = [
  {
    id: 'apple-official',
    name: 'Apple Official Store',
    tagline: 'Official Store',
    description: 'Produk Apple original bergaransi resmi iBox & Digimap.',
    badge: 'official',
    rating: 4.9,
    followers: 2_400_000,
    city: 'Jakarta Selatan',
    category: 'elektronik',
    colors: ['#1F2937', '#111827'],
    initials: 'A',
    productIds: ['iphone-13-pro', 'macbook-pro-14', 'airpods-max'],
  },
  {
    id: 'nike-indonesia',
    name: 'Nike Indonesia',
    tagline: 'Official Store',
    description: 'Sneaker, apparel, dan perlengkapan olahraga original Nike.',
    badge: 'official',
    rating: 4.8,
    followers: 1_800_000,
    city: 'Tangerang',
    category: 'fashion',
    colors: ['#7F1D1D', '#DC2626'],
    initials: 'N',
    productIds: ['nike-air-jordan', 'tennis-racket', 'backpack'],
  },
  {
    id: 'luxe-time',
    name: 'Luxe Timepieces',
    tagline: 'Official Store',
    description: 'Jam tangan mewah dan kacamata premium 100% authentic.',
    badge: 'official',
    rating: 4.9,
    followers: 324_000,
    city: 'Jakarta Pusat',
    category: 'fashion',
    colors: ['#3F2B1E', '#8B5E34'],
    initials: 'L',
    productIds: ['longines-watch', 'sunglasses'],
  },
  {
    id: 'glow-beauty',
    name: 'Glow Beauty',
    tagline: 'Diamond Seller',
    description: 'Makeup dan skincare pilihan dengan harga bersahabat.',
    badge: 'diamond',
    rating: 4.7,
    followers: 860_000,
    city: 'Bandung',
    category: 'kecantikan',
    colors: ['#9D174D', '#EC4899'],
    initials: 'G',
    productIds: ['mascara', 'sunglasses'],
  },
  {
    id: 'gadget-hub',
    name: 'GadgetHub',
    tagline: 'Diamond Seller',
    description: 'Gadget dan aksesori pintar dengan garansi toko 1 tahun.',
    badge: 'diamond',
    rating: 4.8,
    followers: 1_200_000,
    city: 'Surabaya',
    category: 'elektronik',
    colors: ['#0F766E', '#14B8A6'],
    initials: 'G',
    productIds: ['ipad-mini', 'echo-plus', 'iphone-13-pro'],
  },
  {
    id: 'rumah-tangga-jaya',
    name: 'Rumah Tangga Jaya',
    tagline: 'Silver Seller',
    description: 'Peralatan rumah, dapur, dan kebutuhan harian keluarga.',
    badge: 'silver',
    rating: 4.6,
    followers: 540_000,
    city: 'Depok',
    category: 'rumah',
    colors: ['#B45309', '#F59E0B'],
    initials: 'R',
    productIds: ['blender', 'table-lamp', 'nescafe'],
  },
];

export const storesById: Record<string, Store> = Object.fromEntries(
  stores.map((store) => [store.id, store]),
);

export const banners: Banner[] = [
  {
    id: 'gajian',
    eyebrow: 'GAJIAN EXTRA',
    title: 'Diskon sampai 70%',
    subtitle: 'Bebas ongkir 5x + cashback',
    cta: 'Cek Sekarang',
    colors: ['#00B368', '#007A46'],
    productId: 'airpods-max',
  },
  {
    id: 'apple-week',
    eyebrow: 'APPLE WEEK',
    title: 'iPhone 13 Pro',
    subtitle: 'Cicilan 0% hingga 12 bulan',
    cta: 'Lihat Promo',
    colors: ['#111C3D', '#2C4F91'],
    productId: 'iphone-13-pro',
  },
  {
    id: 'flash-sale',
    eyebrow: 'FLASH SALE',
    title: 'Serba Rp99.000',
    subtitle: 'Hanya hari ini, stok terbatas!',
    cta: 'Buruan Cek',
    colors: ['#FF8A00', '#F04400'],
    productId: 'mascara',
  },
];

export const categoriesById: Record<string, Category> = Object.fromEntries(
  categories.map((category) => [category.id, category]),
);

export function getProduct(id: string | undefined): Product | undefined {
  return id ? productsById[id] : undefined;
}

export function getStore(id: string): Store | undefined {
  return storesById[id];
}

export function productsForStore(storeId: string): Product[] {
  const store = storesById[storeId];
  if (!store) return [];
  return store.productIds
    .map((id) => productsById[id])
    .filter((product): product is Product => Boolean(product));
}

export function productsByCategory(categoryId: CategoryId): Product[] {
  return products.filter((product) => product.category === categoryId);
}

/** Cheap case-insensitive search across name, brand, category and store. */
export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;
  if (normalized === 'promo') {
    return products.filter((product) => product.originalPrice > product.price);
  }
  const tokens = normalized.split(/\s+/);
  return products.filter((product) => {
    const store = storesById[product.storeId];
    const haystack = [
      product.name,
      product.brand,
      categoriesById[product.category]?.label ?? '',
      store?.name ?? '',
    ]
      .join(' ')
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

export const trendingSearches = [
  'iPhone 13 Pro',
  'AirPods Max',
  'Nike Air Jordan',
  'Blender',
  'Kecantikan',
  'Longines',
];
