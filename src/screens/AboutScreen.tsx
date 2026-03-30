import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AboutScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

const VALUES = [
  {
    key: 'about.valueCraft',
    emoji: '✨',
  },
  {
    key: 'about.valueCreativity',
    emoji: '🎨',
  },
  {
    key: 'about.valueCommunity',
    emoji: '🤝',
  },
];

const OFFERINGS = [
  { key: 'about.offerCafe', emoji: '☕' },
  { key: 'about.offerGames', emoji: '♟️' },
  { key: 'about.offerBooks', emoji: '📚' },
  { key: 'about.offerCollectibles', emoji: '🎮' },
];

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-primary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
            {t('about.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-primary-foreground text-center">
            {t('about.title')}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          <Text className="text-lg text-primary-foreground/80 text-center italic">
            {t('about.headerSubtitle')}
          </Text>
        </View>

        {/* Story */}
        <View className="px-8 py-12 items-center">
          <View className="w-full max-w-lg gap-10">
            {/* Our Story section */}
            <View className="gap-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">📖</Text>
                <Text className="text-2xl font-bold text-foreground">{t('about.storyTitle')}</Text>
              </View>
              <View className="border-l-4 border-l-accent pl-4">
                <Text className="text-base text-muted-foreground leading-7">
                  {t('about.storyText')}
                </Text>
              </View>
            </View>

            {/* Mission section */}
            <View className="gap-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🎯</Text>
                <Text className="text-2xl font-bold text-foreground">
                  {t('about.missionTitle')}
                </Text>
              </View>
              <View className="border-l-4 border-l-secondary pl-4">
                <Text className="text-base text-muted-foreground leading-7">
                  {t('about.missionText')}
                </Text>
              </View>
            </View>

            {/* What We Offer */}
            <View className="gap-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🏪</Text>
                <Text className="text-2xl font-bold text-foreground">
                  {t('about.whatWeOffer')}
                </Text>
              </View>
              <View className="gap-3">
                {OFFERINGS.map((offering) => (
                  <Card key={offering.key} className="border-accent/20">
                    <CardContent className="flex-row items-center gap-4 pt-4">
                      <Text className="text-2xl">{offering.emoji}</Text>
                      <Text className="text-base text-foreground leading-6 flex-1">
                        {t(offering.key)}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </View>
            </View>

            {/* Values */}
            <View className="gap-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">💎</Text>
                <Text className="text-2xl font-bold text-foreground">{t('about.valuesTitle')}</Text>
              </View>
              <View className="gap-3">
                {VALUES.map((value) => (
                  <Card key={value.key} className="border-accent/30">
                    <CardContent className="flex-row items-center gap-4 pt-4">
                      <Text className="text-2xl">{value.emoji}</Text>
                      <Text className="text-base text-foreground leading-6 flex-1">
                        {t(value.key)}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </View>
            </View>

            {/* Visit Us */}
            <Card className="bg-secondary">
              <CardHeader className="flex-row items-center gap-3">
                <Text className="text-2xl">📍</Text>
                <CardTitle className="text-secondary-foreground">{t('about.visitTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="gap-3">
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🏠</Text>
                  <Text className="text-base text-secondary-foreground/90 flex-1">
                    {t('about.visitAddress')}
                  </Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🕐</Text>
                  <Text className="text-base text-secondary-foreground/90 flex-1">
                    {t('about.visitHours')}
                  </Text>
                </View>
              </CardContent>
            </Card>
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

export default AboutScreen;
