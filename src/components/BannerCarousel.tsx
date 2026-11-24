import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { banners, productsById, type Banner } from '@/data/catalog';
import { colors, MAX_WIDTH, radius } from '@/theme';
import { haptic } from '@/utils/format';

type BannerCarouselProps = {
  onPressBanner?: (banner: Banner) => void;
};

/** Auto-playing promo carousel built on a paged FlatList (no snap-carousel dep). */
export function BannerCarousel({ onPressBanner }: BannerCarouselProps) {
  const { width } = useWindowDimensions();
  const pageWidth = Math.min(width, MAX_WIDTH);
  const listRef = useRef<FlatList<Banner>>(null);
  const [index, setIndex] = useState(0);
  const dragging = useRef(false);
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (dragging.current || paused.current) return;
      const next = (index + 1) % banners.length;
      listRef.current?.scrollToOffset({ offset: next * pageWidth, animated: true });
      setIndex(next);
    }, 4200);
    return () => clearInterval(timer);
  }, [index, pageWidth]);

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    dragging.current = false;
    const next = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    setIndex(Math.max(0, Math.min(banners.length - 1, next)));
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={banners}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        getItemLayout={(_, itemIndex) => ({
          length: pageWidth,
          offset: pageWidth * itemIndex,
          index: itemIndex,
        })}
        onScrollBeginDrag={() => {
          dragging.current = true;
        }}
        onMomentumScrollEnd={handleMomentumEnd}
        onScrollEndDrag={() => {
          dragging.current = false;
        }}
        renderItem={({ item }) => (
          <View style={{ width: pageWidth, paddingHorizontal: 16 }}>
            <Pressable
              onPress={() => {
                haptic('light');
                if (onPressBanner) onPressBanner(item);
              }}
              accessibilityRole="button"
              accessibilityLabel={`${item.eyebrow}: ${item.title}`}
              style={({ pressed }) => [styles.cardWrap, pressed && styles.pressed]}>
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}>
                <View style={styles.textBlock}>
                  <View style={styles.eyebrow}>
                    <Text style={styles.eyebrowText}>{item.eyebrow}</Text>
                  </View>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {item.subtitle}
                  </Text>
                  <View style={styles.cta}>
                    <Text style={styles.ctaText}>{item.cta}</Text>
                    <Ionicons name="arrow-forward" size={11} color="#0B3B25" />
                  </View>
                </View>
                <View style={styles.art}>
                  <View style={styles.artCircle} />
                  <Image
                    source={productsById[item.productId]?.image}
                    style={styles.artImage}
                    contentFit="contain"
                    transition={200}
                  />
                </View>
                <View style={styles.decorA} />
                <View style={styles.decorB} />
              </LinearGradient>
            </Pressable>
          </View>
        )}
      />
      <View style={styles.dots} accessibilityLabel={`Banner ${index + 1} dari ${banners.length}`}>
        {banners.map((banner, bannerIndex) => (
          <View
            key={banner.id}
            style={[styles.dot, bannerIndex === index ? styles.dotActive : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    height: 154,
    borderRadius: radius.lg + 2,
    overflow: 'hidden',
    shadowColor: '#0B3B25',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.992 }],
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 16,
    overflow: 'hidden',
  },
  textBlock: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
    gap: 3,
    paddingRight: 8,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 3,
  },
  eyebrowText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  title: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 10.5,
    fontWeight: '500',
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginTop: 7,
  },
  ctaText: {
    color: '#0B3B25',
    fontSize: 10,
    fontWeight: '800',
  },
  art: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artCircle: {
    position: 'absolute',
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  artImage: {
    width: 118,
    height: 118,
    transform: [{ rotate: '-8deg' }, { scale: 1.04 }],
  },
  decorA: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    right: -30,
    top: -34,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  decorB: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    left: -22,
    bottom: -28,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 9,
    paddingBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD6CF',
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.primary,
  },
});
