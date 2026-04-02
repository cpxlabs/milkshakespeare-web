import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

const FEATURED_ITEMS = [
  {
    nameKey: 'home.featuredRomeo',
    descKey: 'home.featuredRomeoDesc',
    priceKey: 'home.featuredRomeoPrice',
    emoji: '🍓',
    accentClass: 'border-l-4 border-l-destructive',
  },
  {
    nameKey: 'home.featuredHamlet',
    descKey: 'home.featuredHamletDesc',
    priceKey: 'home.featuredHamletPrice',
    emoji: '🍫',
    accentClass: 'border-l-4 border-l-secondary',
  },
  {
    nameKey: 'home.featuredMidsummer',
    descKey: 'home.featuredMidsummerDesc',
    priceKey: 'home.featuredMidsummerPrice',
    emoji: '🌸',
    accentClass: 'border-l-4 border-l-accent',
  },
];

const GALLERY_AREAS = [
  { nameKey: 'home.galleryCafe', descKey: 'home.galleryCafeDesc', emoji: '☕', borderClass: 'border-t-4 border-t-primary' },
  { nameKey: 'home.galleryGames', descKey: 'home.galleryGamesDesc', emoji: '🎮', borderClass: 'border-t-4 border-t-secondary' },
  { nameKey: 'home.galleryBooks', descKey: 'home.galleryBooksDesc', emoji: '📚', borderClass: 'border-t-4 border-t-accent' },
  { nameKey: 'home.galleryCollectibles', descKey: 'home.galleryCollectiblesDesc', emoji: '🃏', borderClass: 'border-t-4 border-t-destructive' },
];

const EXPERIENCES = [
  { nameKey: 'home.expGames', descKey: 'home.expGamesDesc', emoji: '♟️' },
  { nameKey: 'home.expTCG', descKey: 'home.expTCGDesc', emoji: '🃏' },
  { nameKey: 'home.expBooks', descKey: 'home.expBooksDesc', emoji: '📚' },
  { nameKey: 'home.expCollectibles', descKey: 'home.expCollectiblesDesc', emoji: '🎮' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <View className="bg-primary px-8 pt-20 pb-14 items-center">
          <Text className="text-lg tracking-widest text-accent font-semibold uppercase text-center mb-2">
            {t('home.heroLabel')}
          </Text>
          <Text className="text-5xl font-extrabold text-primary-foreground text-center tracking-tight">
            {t('home.title')}
          </Text>
          <View className="w-16 h-1 bg-accent rounded-full mt-4 mb-4" />
          <Text className="text-xl text-primary-foreground/80 text-center italic">
            {t('home.subtitle')}
          </Text>
          <Text className="text-base text-primary-foreground/70 text-center mt-4 max-w-md leading-6">
            {t('home.heroTagline')}
          </Text>
          <View className="flex-row gap-3 mt-8">
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

        {/* About Preview */}
        <View className="px-8 py-12 items-center">
          <View className="w-full max-w-lg items-center">
            <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
              {t('home.aboutLabel')}
            </Text>
            <Text className="text-2xl font-bold text-foreground text-center">
              {t('home.aboutTitle')}
            </Text>
            <View className="w-10 h-0.5 bg-accent rounded-full mt-3 mb-4" />
            <Text className="text-base text-muted-foreground text-center max-w-lg leading-7">
              {t('home.aboutText')}
            </Text>
          </View>
        </View>

        {/* Photo Gallery Section */}
        <View className="bg-muted/30 px-8 py-12 items-center">
          <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
            {t('home.galleryLabel')}
          </Text>
          <Text className="text-2xl font-bold text-foreground text-center mb-8">
            {t('home.galleryTitle')}
          </Text>
          <View className="w-full max-w-lg gap-3">
            {[GALLERY_AREAS.slice(0, 2), GALLERY_AREAS.slice(2, 4)].map((row, rowIdx) => (
              <View key={rowIdx} className="flex-row gap-3">
                {row.map((area) => (
                  <Card key={area.nameKey} className={`flex-1 ${area.borderClass}`}>
                    <CardContent className="pt-4 pb-4 items-center">
                      <Text className="text-3xl mb-2">{area.emoji}</Text>
                      <Text className="text-sm font-bold text-foreground text-center">
                        {t(area.nameKey)}
                      </Text>
                      <Text className="text-xs text-muted-foreground text-center mt-1">
                        {t(area.descKey)}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Experiences Section */}
        <View className="bg-muted/30 px-8 py-12 items-center">
          <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
            ✨
          </Text>
          <Text className="text-2xl font-bold text-foreground text-center mb-8">
            {t('home.experiencesTitle')}
          </Text>
          <View className="w-full max-w-lg gap-4">
            {EXPERIENCES.map((exp) => (
              <Card key={exp.nameKey} className="w-full border-accent/20">
                <CardContent className="flex-row items-center gap-4 pt-4">
                  <Text className="text-3xl">{exp.emoji}</Text>
                  <View className="flex-1 gap-1">
                    <Text className="text-base font-semibold text-foreground">
                      {t(exp.nameKey)}
                    </Text>
                    <Text className="text-sm text-muted-foreground">{t(exp.descKey)}</Text>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* Featured Creations */}
        <View className="px-8 py-12 items-center">
          <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
            {t('home.featuredLabel')}
          </Text>
          <Text className="text-2xl font-bold text-foreground text-center mb-8">
            {t('home.featuredTitle')}
          </Text>
          <View className="w-full max-w-lg gap-4">
            {FEATURED_ITEMS.map((item) => (
              <Card key={item.nameKey} className={`w-full ${item.accentClass}`}>
                <CardHeader className="flex-row items-center gap-4">
                  <Text className="text-3xl">{item.emoji}</Text>
                  <View className="flex-1 gap-1.5">
                    <CardTitle className="text-secondary">{t(item.nameKey)}</CardTitle>
                    <CardDescription>{t(item.descKey)}</CardDescription>
                    <Text className="text-base font-bold text-accent mt-1">
                      {t(item.priceKey)}
                    </Text>
                  </View>
                </CardHeader>
              </Card>
            ))}
          </View>

          <Button onPress={() => navigation.navigate('Menu')} className="mt-8" size="lg">
            <Text className="font-bold">{t('home.viewFullMenu')}</Text>
          </Button>
        </View>

        {/* Business Hours Section */}
        <View className="px-8 py-12 items-center">
          <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
            {t('home.hoursLabel')}
          </Text>
          <Text className="text-2xl font-bold text-foreground text-center mb-6">
            {t('home.hoursTitle')}
          </Text>
          <Card className="w-full max-w-lg border-accent/30">
            <CardContent className="pt-6 gap-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🕐</Text>
                <Text className="text-base font-semibold text-foreground flex-1">
                  {t('home.hoursValue')}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">📍</Text>
                <Text className="text-base text-muted-foreground flex-1">
                  {t('home.hoursAddress')}
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Footer CTA */}
        <View className="bg-secondary px-8 py-10 items-center">
          <Text className="text-xl font-bold text-secondary-foreground text-center">
            {t('home.ctaTitle')}
          </Text>
          <Text className="text-base text-secondary-foreground/80 text-center mt-2 max-w-md leading-6">
            {t('home.ctaText')}
          </Text>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('About')}
            className="mt-6 border-secondary-foreground/30"
          >
            <Text className="text-secondary-foreground font-semibold">{t('home.learnMore')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
