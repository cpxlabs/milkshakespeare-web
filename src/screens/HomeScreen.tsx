import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
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
      {/* ── Top Nav Bar ── */}
      <View className="bg-background px-4 pt-3 pb-3 flex-row items-center justify-between border-b border-border/40">
        <View className="flex-row items-center gap-2">
          <MenuButton className="static top-0 left-0 z-0 w-9 h-9 bg-transparent border-transparent" />
          <Text className="text-sm font-bold text-foreground tracking-tight">
            {t('home.title')}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-xs">📍</Text>
          <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase">
            {t('home.navLocation')}
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Cart')} accessibilityLabel="Open cart">
          <Text className="text-xl">🛒</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* ── Hero Section ── */}
        <View className="bg-background px-5 pt-6 pb-10">
          <Text className="text-xs tracking-widest text-muted-foreground font-medium uppercase mb-5">
            {t('home.navEstablished')}
          </Text>
          {/* Mixed-style headline: "Prose" and "Palate" in gold italic */}
          <Text className="text-5xl font-extrabold text-foreground leading-tight tracking-tight">
            {'Where '}
            <Text className="text-accent italic">{'Prose'}</Text>
            {'\nmeets the '}
            <Text className="text-accent italic">{'Palate'}</Text>
            {'.'}
          </Text>
          <Text className="text-sm text-muted-foreground mt-5 leading-6 max-w-xs">
            {t('home.heroDescription')}
          </Text>
          <Button
            onPress={() => navigation.navigate('Bookings')}
            className="bg-accent mt-7 rounded-full self-start px-8"
            size="lg"
          >
            <Text className="text-accent-foreground font-bold text-sm">
              {t('home.heroReserveBtn')}
            </Text>
          </Button>
          <Pressable onPress={() => navigation.navigate('Menu')} className="mt-4">
            <Text className="text-sm text-muted-foreground">{t('home.heroViewMenu')}</Text>
          </Pressable>
        </View>

        {/* ── Featured Drink of the Month ── */}
        <View className="px-4 mb-8">
          <View className="rounded-2xl overflow-hidden bg-primary">
            {/* Large image area */}
            <View className="w-full h-52 bg-secondary/25 items-center justify-center">
              <Text className="text-9xl">🥤</Text>
            </View>
            {/* Caption row */}
            <View className="px-5 py-4 flex-row items-center justify-between">
              <Text className="text-base font-semibold italic text-primary-foreground flex-1 mr-4">
                {t('home.featuredDrinkName')}
              </Text>
              <View className="bg-accent rounded-md px-3 py-1 self-start">
                <Text className="text-xs font-bold text-accent-foreground uppercase tracking-widest">
                  {t('home.featuredDrinkLabel')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Chapter Select ── */}
        <View className="px-5 mb-10">
          <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase mb-4">
            {t('home.chapterSelectTitle')}
          </Text>

          {/* Explore the Menu — dark blue card, left-aligned */}
          <Pressable onPress={() => navigation.navigate('Menu')}>
            <View className="bg-secondary rounded-2xl px-5 py-6 mb-3 flex-row items-center gap-4">
              <Text className="text-3xl">🍴</Text>
              <View className="flex-1">
                <Text className="text-xl font-bold text-secondary-foreground">
                  {t('home.exploreMenuTitle')}
                </Text>
                <Text className="text-xs text-secondary-foreground/70 mt-1 italic leading-5">
                  {t('home.exploreMenuSubtitle')}
                </Text>
              </View>
            </View>
          </Pressable>

          {/* Daily Riddle + Book a Table — two small side-by-side cards */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-card border border-border rounded-2xl px-4 py-5 items-center gap-2">
              <Text className="text-2xl">🧩</Text>
              <Text className="text-sm font-bold text-foreground text-center">
                {t('home.dailyRiddleTitle')}
              </Text>
              <Text className="text-xs text-accent font-semibold uppercase tracking-wide text-center">
                {t('home.dailyRiddleSubtitle')}
              </Text>
            </View>
            <Pressable
              className="flex-1"
              onPress={() => navigation.navigate('Bookings')}
            >
              <View className="bg-card border border-border rounded-2xl px-4 py-5 items-center gap-2 flex-1">
                <Text className="text-2xl">📅</Text>
                <Text className="text-sm font-bold text-foreground text-center">
                  {t('home.bookTableTitle')}
                </Text>
                <Text className="text-xs text-accent font-semibold uppercase tracking-wide text-center">
                  {t('home.bookTableSubtitle')}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* ── Library Section ── */}
        <View className="px-5 mb-10">
          {/* Mixed-style heading: "Thirsty Mind" in italic */}
          <Text className="text-3xl font-extrabold text-foreground leading-tight tracking-tight">
            {'A Library Built for the '}
            <Text className="italic">{'Thirsty Mind.'}</Text>
          </Text>
          <Text className="text-sm text-muted-foreground mt-5 leading-6">
            {t('home.libraryText')}
          </Text>
          <Text className="text-base italic text-foreground mt-6">
            {t('home.libraryCurator')}
          </Text>
          <View className="mt-4 border-l-4 border-l-accent pl-4">
            <Text className="text-sm italic text-muted-foreground leading-6">
              {t('home.libraryQuote')}
            </Text>
            <Text className="text-xs font-semibold text-foreground mt-2">
              {t('home.libraryQuoteAttribution')}
            </Text>
          </View>
          {/* Two atmospheric image placeholders */}
          <View className="flex-row gap-3 mt-6">
            <View className="flex-1 h-28 bg-primary rounded-xl items-center justify-center">
              <Text className="text-4xl">📚</Text>
            </View>
            <View className="flex-1 h-28 bg-secondary rounded-xl items-center justify-center">
              <Text className="text-4xl">🕯️</Text>
            </View>
          </View>
        </View>

        {/* ── Rare Editions ── */}
        <View className="px-5 mb-10">
          <View className="flex-row items-baseline justify-between mb-1">
            <Text className="text-2xl font-extrabold text-foreground">
              {t('home.rareEditionsTitle')}
            </Text>
            <Pressable onPress={() => navigation.navigate('Menu')}>
              <Text className="text-xs tracking-widest text-accent font-bold uppercase">
                {t('home.rareEditionsViewCatalog')}
              </Text>
            </Pressable>
          </View>
          <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase mb-6">
            {t('home.rareEditionsSubtitle')}
          </Text>

          {/* Each drink: tall full-width portrait image card */}
          {RARE_EDITIONS.map((item) => (
            <View key={item.nameKey} className="mb-8">
              {/* Tall portrait image */}
              <View className="w-full h-64 bg-primary rounded-2xl items-center justify-center mb-4 overflow-hidden">
                <Text className="text-8xl">{item.emoji}</Text>
              </View>
              {/* Name + price row */}
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="text-lg font-bold text-foreground italic">
                  {t(item.nameKey)}
                </Text>
                <Text className="text-base font-bold text-foreground">
                  {t(item.priceKey)}
                </Text>
              </View>
              {/* Description */}
              <Text className="text-sm text-muted-foreground leading-5">
                {t(item.descKey)}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Footer CTA ── */}
        <View className="bg-primary px-5 py-10">
          <Text className="text-xl font-bold text-primary-foreground">
            {t('home.ctaTitle')}
          </Text>
          <Text className="text-sm text-primary-foreground/80 mt-3 leading-6">
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
        <View className="bg-secondary px-5 py-4 flex-row items-center gap-6 flex-wrap">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm">📍</Text>
            <Text className="text-xs font-medium text-secondary-foreground">
              {t('home.hoursAddress')}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm">🕐</Text>
            <Text className="text-xs font-medium text-secondary-foreground">
              {t('home.hoursValue')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
