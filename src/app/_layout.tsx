import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastProvider } from '@/components/Toast';
import { ShopProvider } from '@/store/shop';
import { colors, MAX_WIDTH, shadows } from '@/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ShopProvider>
        <ToastProvider>
          <View style={styles.outer}>
            <View style={styles.frame}>
              <StatusBar style="dark" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.bg },
                }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="search" options={{ animation: 'fade' }} />
                <Stack.Screen name="wishlist" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="product/[id]" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="+not-found" options={{ animation: 'fade' }} />
              </Stack>
            </View>
          </View>
        </ToastProvider>
      </ShopProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#E6ECE9' : colors.bg,
    alignItems: 'center',
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_WIDTH,
    backgroundColor: colors.bg,
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? shadows.float : null),
  },
});
