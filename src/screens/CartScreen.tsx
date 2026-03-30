import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CartScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';
import { useCart } from '@/providers/CartProvider';

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { t } = useTranslation();
  const { items, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-secondary-foreground/60 font-semibold uppercase mb-2">
            {t('cart.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('cart.title')}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          {totalItems > 0 && (
            <Text className="text-lg text-secondary-foreground/80 text-center">
              {totalItems} {t('cart.items')}
            </Text>
          )}
        </View>

        {items.length === 0 ? (
          /* Empty Cart */
          <View className="px-8 py-16 items-center">
            <Text className="text-6xl mb-6">🛒</Text>
            <Text className="text-xl font-bold text-foreground text-center mb-2">
              {t('cart.empty')}
            </Text>
            <Text className="text-base text-muted-foreground text-center mb-8 max-w-sm">
              {t('cart.emptyDesc')}
            </Text>
            <Button onPress={() => navigation.navigate('Menu')} size="lg">
              <Text className="font-bold">{t('cart.browseMenu')}</Text>
            </Button>
          </View>
        ) : (
          /* Cart Items */
          <View className="px-6 py-8 items-center">
            <View className="w-full max-w-lg gap-4">
              {items.map((item) => (
                <Card key={item.id} className="w-full">
                  <CardContent className="flex-row items-center gap-4 pt-4">
                    <Text className="text-3xl">{item.emoji}</Text>
                    <View className="flex-1 gap-1">
                      <Text className="text-base font-semibold text-foreground">
                        {t(item.nameKey)}
                      </Text>
                      <Text className="text-sm text-accent font-bold">
                        {formatPrice(item.price)}
                      </Text>
                    </View>

                    {/* Quantity Controls */}
                    <View className="flex-row items-center gap-2">
                      <Pressable
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-muted items-center justify-center active:opacity-70"
                      >
                        <Text className="text-foreground font-bold text-lg">−</Text>
                      </Pressable>
                      <Text className="text-base font-bold text-foreground w-6 text-center">
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-accent items-center justify-center active:opacity-70"
                      >
                        <Text className="text-accent-foreground font-bold text-lg">+</Text>
                      </Pressable>
                    </View>
                  </CardContent>
                </Card>
              ))}

              {/* Total */}
              <View className="border-t border-border pt-6 mt-4">
                <View className="flex-row items-center justify-between px-2">
                  <Text className="text-xl font-bold text-foreground">{t('cart.total')}</Text>
                  <Text className="text-2xl font-extrabold text-accent">
                    {formatPrice(totalPrice)}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View className="gap-3 mt-4">
                <Button size="lg" className="w-full bg-accent">
                  <Text className="text-accent-foreground font-bold">{t('cart.checkout')}</Text>
                </Button>
                <Button variant="outline" onPress={clearCart} className="w-full">
                  <Text>{t('cart.clearCart')}</Text>
                </Button>
              </View>
            </View>
          </View>
        )}

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

export default CartScreen;
