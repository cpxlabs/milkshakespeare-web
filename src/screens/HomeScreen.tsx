import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

const RARE_EDITIONS = [
  {
    nameKey: 'home.rareOpheliaName',
    priceKey: 'home.rareOpheliaPrice',
    descKey: 'home.rareOpheliaDesc',
    emoji: '🌸',
  },
  {
    nameKey: 'home.rareMacbethName',
    priceKey: 'home.rareMacbethPrice',
    descKey: 'home.rareMacbethDesc',
    emoji: '🗡️',
  },
  {
    nameKey: 'home.rarePuckName',
    priceKey: 'home.rarePuckPrice',
    descKey: 'home.rarePuckDesc',
    emoji: '✨',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* ── Top Nav Bar ── */}
        <View className="bg-background px-6 py-4 flex-row items-center justify-between">
          <Text className="text-xs tracking-widest text-muted-foreground font-medium uppercase">
            {t('home.navEstablished')}
          </Text>
          <View className="items-center">
            <Text className="text-lg font-extrabold text-foreground tracking-tight">
              ♛ {t('home.title')}
            </Text>
          </View>
          <Text className="text-xs tracking-widest text-muted-foreground font-medium uppercase">
            {t('home.navLocation')}
          </Text>
        </View>

        <View className="w-full h-px bg-border" />

        {/* ── Hero Section ── */}
        <View className="bg-background px-8 pt-12 pb-10 items-center">
          <Text className="text-4xl font-extrabold text-foreground text-center leading-tight tracking-tight">
            {t('home.heroHeadline')}
          </Text>
          <Text className="text-base text-muted-foreground text-center mt-4 max-w-sm leading-6">
            {t('home.heroDescription')}
          </Text>
          <Button
            onPress={() => navigation.navigate('Bookings')}
            className="bg-accent mt-8 px-8 rounded-full"
            size="lg"
          >
            <Text className="text-accent-foreground font-bold text-sm">
              {t('home.heroReserveBtn')}
            </Text>
          </Button>
          <Pressable onPress={() => navigation.navigate('Menu')} className="mt-4">
            <Text className="text-sm text-muted-foreground underline">
              {t('home.heroViewMenu')}
            </Text>
          </Pressable>
        </View>

        {/* ── Featured Drink of the Month ── */}
        <View className="px-6 pb-8 items-center">
          <View className="w-full max-w-lg bg-primary rounded-2xl overflow-hidden">
            <View className="w-full h-48 bg-secondary/30 items-center justify-center">
              <Text className="text-6xl">🥤</Text>
            </View>
            <View className="bg-primary/90 px-6 py-4 items-center">
              <Text className="text-lg font-bold text-primary-foreground text-center italic">
                {t('home.featuredDrinkName')}
              </Text>
              <Text className="text-xs tracking-widest text-accent font-semibold uppercase mt-1">
                {t('home.featuredDrinkLabel')}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Chapter Select ── */}
        <View className="px-6 py-10 items-center">
          <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase mb-2">
            {t('home.chapterSelectTitle')}
          </Text>

          <Card className="w-full max-w-lg bg-accent/10 border-accent/30">
            <CardContent className="pt-5 pb-5 items-center gap-2">
              <Text className="text-xl">📖</Text>
              <Text className="text-xl font-bold text-foreground text-center">
                {t('home.exploreMenuTitle')}
              </Text>
              <Text className="text-sm text-muted-foreground text-center italic">
                {t('home.exploreMenuSubtitle')}
              </Text>
            </CardContent>
          </Card>

          <View className="flex-row gap-3 mt-3 w-full max-w-lg">
            <Card className="flex-1 border-accent/20">
              <CardContent className="pt-4 pb-4 items-center gap-2">
                <Text className="text-2xl">🧩</Text>
                <Text className="text-sm font-bold text-foreground text-center">
                  {t('home.dailyRiddleTitle')}
                </Text>
                <Text className="text-xs text-accent font-semibold uppercase tracking-wide">
                  {t('home.dailyRiddleSubtitle')}
                </Text>
              </CardContent>
            </Card>
            <Card className="flex-1 border-accent/20">
              <CardContent className="pt-4 pb-4 items-center gap-2">
                <Text className="text-2xl">📅</Text>
                <Text className="text-sm font-bold text-foreground text-center">
                  {t('home.bookTableTitle')}
                </Text>
                <Text className="text-xs text-accent font-semibold uppercase tracking-wide">
                  {t('home.bookTableSubtitle')}
                </Text>
              </CardContent>
            </Card>
          </View>
        </View>

        {/* ── Library Section ── */}
        <View className="bg-background px-8 py-12 items-center">
          <Text className="text-3xl font-extrabold text-foreground text-center leading-tight tracking-tight">
            {t('home.libraryTitle')}
          </Text>
          <Text className="text-base text-muted-foreground text-center mt-6 max-w-sm leading-7">
            {t('home.libraryText')}
          </Text>
          <Text className="text-lg italic text-foreground mt-6">
            {t('home.libraryCurator')}
          </Text>
          <View className="mt-6 border-l-4 border-l-accent pl-4 max-w-sm">
            <Text className="text-base italic text-muted-foreground leading-7">
              {t('home.libraryQuote')}
            </Text>
            <Text className="text-sm font-semibold text-foreground mt-2">
              {t('home.libraryQuoteAttribution')}
            </Text>
          </View>
        </View>

        {/* ── Rare Editions ── */}
        <View className="px-6 py-10 items-center">
          <View className="w-full max-w-lg flex-row items-baseline justify-between mb-1">
            <Text className="text-2xl font-extrabold text-foreground">
              {t('home.rareEditionsTitle')}
            </Text>
            <Pressable onPress={() => navigation.navigate('Menu')}>
              <Text className="text-xs tracking-widest text-accent font-bold uppercase">
                {t('home.rareEditionsViewCatalog')}
              </Text>
            </Pressable>
          </View>
          <View className="w-full max-w-lg mb-6">
            <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase">
              {t('home.rareEditionsSubtitle')}
            </Text>
          </View>

          <View className="w-full max-w-lg gap-6">
            {RARE_EDITIONS.map((item) => (
              <View key={item.nameKey} className="flex-row gap-4 items-start">
                <View className="w-20 h-20 bg-primary rounded-xl items-center justify-center">
                  <Text className="text-3xl">{item.emoji}</Text>
                </View>
                <View className="flex-1 gap-1">
                  <View className="flex-row items-baseline justify-between">
                    <Text className="text-lg font-bold text-foreground italic">
                      {t(item.nameKey)}
                    </Text>
                    <Text className="text-base font-bold text-foreground">
                      {t(item.priceKey)}
                    </Text>
                  </View>
                  <Text className="text-sm text-muted-foreground leading-5">
                    {t(item.descKey)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── Footer CTA ── */}
        <View className="bg-primary px-8 py-12 items-center">
          <Text className="text-xl font-bold text-primary-foreground text-center">
            {t('home.ctaTitle')}
          </Text>
          <Text className="text-base text-primary-foreground/80 text-center mt-3 max-w-md leading-6">
            {t('home.ctaText')}
          </Text>
          <View className="flex-row gap-3 mt-6">
            <Button
              onPress={() => navigation.navigate('Menu')}
              className="bg-accent px-6"
              size="lg"
            >
              <Text className="text-accent-foreground font-bold">{t('home.viewFullMenu')}</Text>
            </Button>
            <Button
              variant="outline"
              onPress={() => navigation.navigate('About')}
              className="border-primary-foreground/30 px-6"
              size="lg"
            >
              <Text className="text-primary-foreground font-semibold">{t('home.learnMore')}</Text>
            </Button>
          </View>
        </View>

        {/* ── Info Bar ── */}
        <View className="bg-secondary px-6 py-4 flex-row items-center justify-center gap-6 flex-wrap">
          <View className="flex-row items-center gap-2">
            <Text className="text-base">📍</Text>
            <Text className="text-sm font-medium text-secondary-foreground">
              {t('home.hoursAddress')}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-base">🕐</Text>
            <Text className="text-sm font-medium text-secondary-foreground">
              {t('home.hoursValue')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
