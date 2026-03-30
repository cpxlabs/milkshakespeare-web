import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MenuScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

type MenuItem = {
  nameKey: string;
  descKey: string;
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
      { nameKey: 'menu.romeoName', descKey: 'menu.romeoDesc', emoji: '🍓' },
      { nameKey: 'menu.hamletName', descKey: 'menu.hamletDesc', emoji: '🍫' },
      {
        nameKey: 'menu.macbethName',
        descKey: 'menu.macbethDesc',
        emoji: '☕',
      },
    ],
  },
  {
    titleKey: 'menu.comedies',
    emoji: '😄',
    accentClass: 'border-l-accent',
    items: [
      {
        nameKey: 'menu.midsummerName',
        descKey: 'menu.midsummerDesc',
        emoji: '🌸',
      },
      {
        nameKey: 'menu.tempestName',
        descKey: 'menu.tempestDesc',
        emoji: '🌴',
      },
      {
        nameKey: 'menu.twelfthNightName',
        descKey: 'menu.twelfthNightDesc',
        emoji: '☕',
      },
    ],
  },
  {
    titleKey: 'menu.histories',
    emoji: '👑',
    accentClass: 'border-l-secondary',
    items: [
      { nameKey: 'menu.henryName', descKey: 'menu.henryDesc', emoji: '🍯' },
      {
        nameKey: 'menu.richardName',
        descKey: 'menu.richardDesc',
        emoji: '✨',
      },
    ],
  },
  {
    titleKey: 'menu.sonnets',
    emoji: '✒️',
    accentClass: 'border-l-primary',
    items: [
      {
        nameKey: 'menu.sonnet18Name',
        descKey: 'menu.sonnet18Desc',
        emoji: '🍑',
      },
      {
        nameKey: 'menu.sonnet130Name',
        descKey: 'menu.sonnet130Desc',
        emoji: '🍓',
      },
    ],
  },
];

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const { t } = useTranslation();

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
                      <Text className="text-2xl">{item.emoji}</Text>
                      <View className="flex-1 gap-1.5">
                        <CardTitle>{t(item.nameKey)}</CardTitle>
                        <CardDescription>{t(item.descKey)}</CardDescription>
                      </View>
                    </CardHeader>
                  </Card>
                ))}
              </View>
            ))}
          </View>
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
