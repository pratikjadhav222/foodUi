import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import { useTabBar } from '../../src/context/TabBarContext';
import { COLORS, FONT_SIZE } from '../../src/constants/theme';

function CartBadge() {
  const { totalItems } = useCart();
  if (totalItems === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
    </View>
  );
}

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: { name: string; title: string; icon: IoniconName; activeIcon: IoniconName }[] = [
  { name: '(home)', title: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'search', title: 'Search', icon: 'search-outline', activeIcon: 'search' },
  { name: 'orders', title: 'Orders', icon: 'receipt-outline', activeIcon: 'receipt' },
  { name: '(profile)', title: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function AppLayout() {
  const { tabBarVisible } = useTabBar();
  const { totalItems } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarVisible ? styles.tabBar : { display: 'none' },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textDim,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {TAB_CONFIG.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color }) => (
              <View>
                <Ionicons name={focused ? tab.activeIcon : tab.icon} size={22} color={color} />
                {tab.name === 'orders' && <CartBadge />}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabBar,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
  },
  tabLabel: { fontSize: FONT_SIZE.xs, fontWeight: '600' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: COLORS.error,
    borderRadius: 9999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: COLORS.white, fontSize: 9, fontWeight: '800' },
});
