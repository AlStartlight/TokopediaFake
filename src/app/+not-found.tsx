import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { ScreenHeader } from '@/components/ScreenHeader';
import { colors } from '@/theme';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Halaman tidak ditemukan" showBack={false} />
      <EmptyState
        icon="compass-outline"
        title="Ups, tersesat!"
        description="Halaman yang kamu tuju tidak ada di TokopediaFake."
        actionLabel="Kembali ke Home"
        onAction={() => router.replace('/')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
