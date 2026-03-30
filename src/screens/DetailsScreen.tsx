import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MenuScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';
import { useCart } from '@/providers/CartProvider';

type MenuItem = {
  id: string;
  nameKey: string;
  descKey: string;
  priceKey: string;
  price: number;
  emoji: string;
};

const MENU_SECTIONS: {
  titleKey: string;
  emoji: string;
  accentClass: string;
  items: MenuItem[];
}[] = [
  {
    titleKey: 'menu.tragedies',
    emoji: '🎭',
    accentClass: 'border-l-destructive',
    items: [
      { id: 'romeo', nameKey: 'menu.romeoName', descKey: 'menu.romeoDesc', priceKey: 'menu.romeoPrice', price: 22.9, emoji: '🍓' },
      { id: 'hamlet', nameKey: 'menu.hamletName', descKey: 'menu.hamletDesc', priceKey: 'menu.hamletPrice', price: 24.9, emoji: '🍫' },
      { id: 'macbeth', nameKey: 'menu.macbethName', descKey: 'menu.macbethDesc', priceKey: 'menu.macbethPrice', price: 23.9, emoji: '☕' },
    ],
  },
  {
    titleKey: 'menu.comedies',
    emoji: '😄',
    accentClass: 'border-l-accent',
    items: [
      { id: 'midsummer', nameKey: 'menu.midsummerName', descKey: 'menu.midsummerDesc', priceKey: 'menu.midsummerPrice', price: 25.9, emoji: '🌸' },
      { id: 'tempest', nameKey: 'menu.tempestName', descKey: 'menu.tempestDesc', priceKey: 'menu.tempestPrice', price: 23.9, emoji: '🌴' },
      { id: 'twelfth', nameKey: 'menu.twelfthNightName', descKey: 'menu.twelfthNightDesc', priceKey: 'menu.twelfthNightPrice', price: 26.9, emoji: '☕' },
    ],
  },
  {
    titleKey: 'menu.histories',
    emoji: '👑',
    accentClass: 'border-l-secondary',
    items: [
      { id: 'henry', nameKey: 'menu.henryName', descKey: 'menu.henryDesc', priceKey: 'menu.henryPrice', price: 24.9, emoji: '🍯' },
      { id: 'richard', nameKey: 'menu.richardName', descKey: 'menu.richardDesc', priceKey: 'menu.richardPrice', price: 22.9, emoji: '✨' },
    ],
  },
  {
    titleKey: 'menu.sonnets',
    emoji: '✒️',
    accentClass: 'border-l-primary',
    items: [
      { id: 'sonnet18', nameKey: 'menu.sonnet18Name', descKey: 'menu.sonnet18Desc', priceKey: 'menu.sonnet18Price', price: 21.9, emoji: '🍑' },
      { id: 'sonnet130', nameKey: 'menu.sonnet130Name', descKey: 'menu.sonnet130Desc', priceKey: 'menu.sonnet130Price', price: 19.9, emoji: '🍓' },
    ],
  },
];

const ADDED_FEEDBACK_DURATION_MS = 1200;

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      nameKey: item.nameKey,
      price: item.price,
      emoji: item.emoji,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), ADDED_FEEDBACK_DURATION_MS);
  };

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-secondary-foreground/60 font-semibold uppercase mb-2">
            {t('menu.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('menu.title')}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          <Text className="text-lg text-secondary-foreground/80 text-center italic">
            {t('menu.subtitle')}
          </Text>
        </View>

        {/* Menu Sections */}
        <View className="px-6 py-10 items-center">
          <View className="w-full max-w-lg gap-10">
            {MENU_SECTIONS.map((section) => (
              <View key={section.titleKey} className="gap-4">
                <View className="flex-row items-center gap-3 border-b border-accent/30 pb-3">
                  <Text className="text-2xl">{section.emoji}</Text>
                  <Text className="text-xl font-bold text-accent">{t(section.titleKey)}</Text>
                </View>
                {section.items.map((item) => (
                  <Card key={item.nameKey} className={`w-full border-l-4 ${section.accentClass}`}>
                    <CardHeader className="flex-row items-center gap-4">
                      <Text className="text-3xl">{item.emoji}</Text>
                      <View className="flex-1 gap-1.5">
                        <CardTitle>{t(item.nameKey)}</CardTitle>
                        <CardDescription>{t(item.descKey)}</CardDescription>
                        <Text className="text-base font-bold text-accent mt-1">
                          {t(item.priceKey)}
                        </Text>
                      </View>
                    </CardHeader>
                    <CardFooter className="justify-end pt-0">
                      <Pressable
                        onPress={() => handleAddToCart(item)}
                        className={`px-5 py-2 rounded-lg active:opacity-70 ${
                          addedId === item.id ? 'bg-green-600' : 'bg-accent'
                        }`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            addedId === item.id
                              ? 'text-white'
                              : 'text-accent-foreground'
                          }`}
                        >
                          {addedId === item.id ? t('menu.added') : t('menu.addToCart')}
                        </Text>
                      </Pressable>
                    </CardFooter>
                  </Card>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Cart Button */}
        <View className="px-8 pb-4 items-center">
          <Button
            onPress={() => navigation.navigate('Cart')}
            className="w-full max-w-lg bg-accent"
            size="lg"
          >
            <Text className="text-accent-foreground font-bold">🛒 {t('cart.title')}</Text>
          </Button>
        </View>

        {/* Back Button */}
        <View className="px-8 pb-10 items-center">
          <Button variant="outline" onPress={() => navigation.goBack()} className="w-full max-w-lg">
            <Text>{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
