import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme';

export type TabItem = {
  key: string;
  label: string;
  count?: number;
};

type TopTabsProps = {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
};

/** Compact underline tabs used by the Feed and Official Store screens. */
export function TopTabs({ tabs, active, onChange, style }: TopTabsProps) {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(tab.key)}
            style={styles.tab}>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
              {typeof tab.count === 'number' ? ` · ${tab.count}` : ''}
            </Text>
            <View style={[styles.indicator, isActive && styles.indicatorActive]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  tab: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.muted,
    marginBottom: 10,
  },
  labelActive: {
    color: colors.ink,
    fontWeight: '800',
  },
  indicator: {
    height: 3,
    width: 34,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: colors.primary,
  },
});
