import React from 'react';
import { View, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Moon, Sun, Languages, BookOpen, UtensilsCrossed, ShoppingCart, LogIn, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português' },
];

export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const navigateToHome = () => {
    props.navigation.navigate('Main', { screen: 'Home' });
    props.navigation.closeDrawer();
  };

  const navigateToMenu = () => {
    props.navigation.navigate('Main', { screen: 'Menu' });
    props.navigation.closeDrawer();
  };

  const navigateToAbout = () => {
    props.navigation.navigate('Main', { screen: 'About' });
    props.navigation.closeDrawer();
  };

  const navigateToCart = () => {
    props.navigation.navigate('Main', { screen: 'Cart' });
    props.navigation.closeDrawer();
  };

  const navigateToLogin = () => {
    props.navigation.navigate('Main', { screen: 'Login' });
    props.navigation.closeDrawer();
  };

  const cycleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex].code);
  };

  const currentLanguageLabel =
    LANGUAGES.find((l) => l.code === language)?.label ?? language;

  const iconColor = isDark ? '#fffbe8' : '#0b234a';

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingBottom: insets.bottom }}
    >
      <View className="flex-1 bg-background px-4">
        {/* Header */}
        <View className="border-b border-border pb-4 mb-2 mt-2">
          <Text className="text-xl font-bold text-foreground">
            {t('sidemenu.appName')}
          </Text>
        </View>

        {/* Navigation */}
        <View className="gap-1 mt-2">
          <Pressable
            onPress={navigateToHome}
            className="flex-row items-center gap-3 rounded-md px-3 py-3 active:bg-accent"
          >
            <Home size={20} color={iconColor} />
            <Text className="text-base text-foreground">{t('sidemenu.home')}</Text>
          </Pressable>

          <Pressable
            onPress={navigateToMenu}
            className="flex-row items-center gap-3 rounded-md px-3 py-3 active:bg-accent"
          >
            <UtensilsCrossed size={20} color={iconColor} />
            <Text className="text-base text-foreground">{t('sidemenu.menu')}</Text>
          </Pressable>

          <Pressable
            onPress={navigateToCart}
            className="flex-row items-center gap-3 rounded-md px-3 py-3 active:bg-accent"
          >
            <ShoppingCart size={20} color={iconColor} />
            <Text className="text-base text-foreground flex-1">{t('sidemenu.cart')}</Text>
            {totalItems > 0 && (
              <View className="bg-accent rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-xs font-bold text-accent-foreground">{totalItems}</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={navigateToAbout}
            className="flex-row items-center gap-3 rounded-md px-3 py-3 active:bg-accent"
          >
            <BookOpen size={20} color={iconColor} />
            <Text className="text-base text-foreground">{t('sidemenu.about')}</Text>
          </Pressable>

          <Pressable
            onPress={navigateToLogin}
            className="flex-row items-center gap-3 rounded-md px-3 py-3 active:bg-accent"
          >
            {isAuthenticated ? (
              <User size={20} color={iconColor} />
            ) : (
              <LogIn size={20} color={iconColor} />
            )}
            <Text className="text-base text-foreground">
              {isAuthenticated ? user?.name ?? t('sidemenu.profile') : t('sidemenu.login')}
            </Text>
          </Pressable>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Settings section */}
        <View className="border-t border-border pt-4 gap-3 mb-4">
          {/* Theme toggle */}
          <View className="flex-row items-center justify-between px-3 py-2">
            <View className="flex-row items-center gap-3">
              {isDark ? (
                <Moon size={20} color={iconColor} />
              ) : (
                <Sun size={20} color={iconColor} />
              )}
              <Text className="text-base text-foreground">
                {isDark ? t('sidemenu.darkMode') : t('sidemenu.lightMode')}
              </Text>
            </View>
            <Toggle
              value={isDark}
              onValueChange={toggleTheme}
              activeColor="#d3b03b"
              inactiveColor="#3664a0"
            />
          </View>

          {/* Language toggle */}
          <Pressable
            onPress={cycleLanguage}
            className="flex-row items-center justify-between px-3 py-2 rounded-md active:bg-accent"
          >
            <View className="flex-row items-center gap-3">
              <Languages size={20} color={iconColor} />
              <Text className="text-base text-foreground">{t('sidemenu.language')}</Text>
            </View>
            <Text className="text-sm text-muted-foreground">{currentLanguageLabel}</Text>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
