import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { LoginScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';
import { useAuth } from '@/providers/AuthProvider';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { t } = useTranslation();
  const { user, isAuthenticated, signInWithGoogle, signInWithFacebook, signInWithInstagram, signInAsGuest, signOut } =
    useAuth();

  if (isAuthenticated && user) {
    return (
      <View className="flex-1 bg-background">
        <MenuButton />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-primary px-8 pt-20 pb-12 items-center">
            <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
              {t('auth.profile')}
            </Text>
            <Text className="text-4xl font-extrabold text-primary-foreground text-center">
              {user.name}
            </Text>
            <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
            <Text className="text-lg text-primary-foreground/80 text-center italic">
              {t('auth.signedInAs')} {user.email}
            </Text>
          </View>

          <View className="px-6 py-10 items-center">
            <View className="w-full max-w-md gap-4">
              {user.provider && (
                <Card className="border-accent/30">
                  <CardContent className="flex-row items-center gap-4 pt-4">
                    <Text className="text-2xl">
                      {user.provider === 'google' && '🔵'}
                      {user.provider === 'facebook' && '🟦'}
                      {user.provider === 'instagram' && '🟣'}
                      {user.provider === 'guest' && '👤'}
                    </Text>
                    <Text className="text-base text-foreground capitalize flex-1">
                      {user.provider}
                    </Text>
                  </CardContent>
                </Card>
              )}

              <Button
                variant="destructive"
                onPress={signOut}
                className="w-full mt-4"
                size="lg"
              >
                <Text className="text-destructive-foreground font-bold">
                  {t('auth.signOut')}
                </Text>
              </Button>

              <Button
                variant="outline"
                onPress={() => navigation.goBack()}
                className="w-full"
              >
                <Text>{t('common.back')}</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-primary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-accent font-semibold uppercase mb-2">
            {t('auth.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-primary-foreground text-center">
            {t('auth.title')}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          <Text className="text-lg text-primary-foreground/80 text-center italic">
            {t('auth.subtitle')}
          </Text>
        </View>

        {/* Social Login Buttons */}
        <View className="px-6 py-10 items-center">
          <View className="w-full max-w-md gap-4">
            {/* Google */}
            <Pressable
              onPress={signInWithGoogle}
              className="flex-row items-center bg-card border border-border rounded-xl px-6 py-4 gap-4 active:opacity-80"
            >
              <Text className="text-2xl">🔵</Text>
              <Text className="text-base font-semibold text-foreground flex-1">
                {t('auth.googleBtn')}
              </Text>
              <Text className="text-muted-foreground">→</Text>
            </Pressable>

            {/* Facebook */}
            <Pressable
              onPress={signInWithFacebook}
              className="flex-row items-center bg-card border border-border rounded-xl px-6 py-4 gap-4 active:opacity-80"
            >
              <Text className="text-2xl">🟦</Text>
              <Text className="text-base font-semibold text-foreground flex-1">
                {t('auth.facebookBtn')}
              </Text>
              <Text className="text-muted-foreground">→</Text>
            </Pressable>

            {/* Instagram */}
            <Pressable
              onPress={signInWithInstagram}
              className="flex-row items-center bg-card border border-border rounded-xl px-6 py-4 gap-4 active:opacity-80"
            >
              <Text className="text-2xl">🟣</Text>
              <Text className="text-base font-semibold text-foreground flex-1">
                {t('auth.instagramBtn')}
              </Text>
              <Text className="text-muted-foreground">→</Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center gap-4 my-2">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-muted-foreground text-sm">{t('auth.or')}</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Guest */}
            <Button
              variant="outline"
              onPress={signInAsGuest}
              className="w-full"
              size="lg"
            >
              <Text className="font-semibold">{t('auth.guestBtn')}</Text>
            </Button>
          </View>
        </View>

        {/* Back Button */}
        <View className="px-8 pb-10 items-center">
          <Button variant="outline" onPress={() => navigation.goBack()} className="w-full max-w-md">
            <Text>{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
