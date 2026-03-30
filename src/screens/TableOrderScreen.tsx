import React, { useState, useMemo } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TableOrderScreenNavigationProp, TableOrderScreenRouteProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

// Mock order data — will be replaced by API calls
const MOCK_ORDERS: Record<string, OrderItem[]> = {
  '2': [
    { id: 'o1', name: 'Romeo & Juliet Berry', price: 18.9, quantity: 1, emoji: '🍓' },
    { id: 'o2', name: "Hamlet's Dark Chocolate", price: 22.0, quantity: 1, emoji: '🍫' },
    { id: 'o3', name: 'Água Mineral', price: 5.0, quantity: 1, emoji: '💧' },
  ],
  '4': [
    { id: 'o4', name: "Midsummer Night's Dream", price: 24.5, quantity: 2, emoji: '🌸' },
    { id: 'o5', name: 'The Tempest Tropical', price: 21.0, quantity: 1, emoji: '🌴' },
    { id: 'o6', name: 'Sonnet 18 — Summer\'s Day', price: 8.5, quantity: 1, emoji: '🍑' },
  ],
  '6': [
    { id: 'o7', name: "Henry's Royal Caramel", price: 22.0, quantity: 3, emoji: '🍯' },
    { id: 'o8', name: "Richard's Golden Crown", price: 20.0, quantity: 2, emoji: '✨' },
    { id: 'o9', name: "Macbeth's Midnight Mocha", price: 18.0, quantity: 1, emoji: '☕' },
  ],
  '8': [
    { id: 'o10', name: 'Twelfth Night Tiramisu', price: 19.0, quantity: 1, emoji: '☕' },
    { id: 'o11', name: 'Sonnet 130 — Honest Blend', price: 13.0, quantity: 1, emoji: '🍓' },
  ],
};

const TABLE_NAMES: Record<string, string> = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
};

const TableOrderScreen: React.FC = () => {
  const navigation = useNavigation<TableOrderScreenNavigationProp>();
  const route = useRoute<TableOrderScreenRouteProp>();
  const { t } = useTranslation();
  const { tableId } = route.params;

  const [orderItems, setOrderItems] = useState<OrderItem[]>(MOCK_ORDERS[tableId] || []);
  const [isClosed, setIsClosed] = useState(false);

  const tableNumber = TABLE_NAMES[tableId] || tableId;

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [orderItems]
  );

  const serviceTax = subtotal * 0.1;
  const total = subtotal + serviceTax;

  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCloseBill = () => {
    // TODO: API call to close the bill
    setIsClosed(true);
  };

  if (isClosed) {
    return (
      <View className="flex-1 bg-background">
        <MenuButton />
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-6xl mb-6">✅</Text>
          <Text className="text-2xl font-bold text-foreground text-center mb-3">
            {t('tableOrder.billClosed')}
          </Text>
          <Text className="text-lg text-muted-foreground text-center mb-2">
            {t('tables.table')} {tableNumber}
          </Text>
          <Text className="text-3xl font-bold text-primary mb-8">R$ {total.toFixed(2)}</Text>
          <Button onPress={() => navigation.navigate('Tables')} className="w-full max-w-sm">
            <Text className="text-primary-foreground font-semibold">
              {t('tableOrder.backToTables')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-secondary-foreground/60 font-semibold uppercase mb-2">
            {t('tableOrder.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('tables.table')} {tableNumber}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          <Text className="text-lg text-secondary-foreground/80 text-center italic">
            {t('tableOrder.subtitle')}
          </Text>
        </View>

        {/* Order Items */}
        <View className="px-6 py-6 items-center">
          <View className="w-full max-w-lg gap-4">
            {orderItems.length === 0 ? (
              <Card className="w-full">
                <CardContent className="items-center py-8">
                  <Text className="text-4xl mb-4">📋</Text>
                  <Text className="text-lg text-muted-foreground text-center">
                    {t('tableOrder.emptyOrder')}
                  </Text>
                </CardContent>
              </Card>
            ) : (
              orderItems.map((item) => (
                <Card key={item.id} className="w-full">
                  <CardHeader className="flex-row items-center gap-4">
                    <Text className="text-2xl">{item.emoji}</Text>
                    <View className="flex-1 gap-1">
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>
                        R$ {item.price.toFixed(2)} × {item.quantity}
                      </CardDescription>
                    </View>
                    <Text className="text-lg font-bold text-foreground">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </CardHeader>
                  <CardContent>
                    <View className="flex-row items-center justify-between border-t border-border pt-3">
                      <Pressable
                        onPress={() => handleRemoveItem(item.id)}
                        className="px-3 py-1 rounded-md bg-destructive/10 active:bg-destructive/20"
                        accessibilityRole="button"
                        accessibilityLabel={t('tableOrder.removeItem')}
                      >
                        <Text className="text-sm text-destructive font-medium">
                          {t('tableOrder.removeItem')}
                        </Text>
                      </Pressable>
                      <View className="flex-row items-center gap-4">
                        <Pressable
                          onPress={() => handleUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-secondary items-center justify-center active:bg-secondary/80"
                          accessibilityRole="button"
                          accessibilityLabel={t('tableOrder.decrease')}
                        >
                          <Text className="text-lg font-bold text-secondary-foreground">−</Text>
                        </Pressable>
                        <Text className="text-lg font-semibold text-foreground min-w-[24px] text-center">
                          {item.quantity}
                        </Text>
                        <Pressable
                          onPress={() => handleUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-secondary items-center justify-center active:bg-secondary/80"
                          accessibilityRole="button"
                          accessibilityLabel={t('tableOrder.increase')}
                        >
                          <Text className="text-lg font-bold text-secondary-foreground">+</Text>
                        </Pressable>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              ))
            )}
          </View>
        </View>

        {/* Bill Summary */}
        {orderItems.length > 0 && (
          <View className="px-6 pb-6 items-center">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>{t('tableOrder.billSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="gap-3">
                <View className="flex-row justify-between">
                  <Text className="text-base text-muted-foreground">
                    {t('tableOrder.subtotal')}
                  </Text>
                  <Text className="text-base text-foreground">R$ {subtotal.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-base text-muted-foreground">
                    {t('tableOrder.serviceTax')}
                  </Text>
                  <Text className="text-base text-foreground">R$ {serviceTax.toFixed(2)}</Text>
                </View>
                <View className="border-t border-border pt-3 flex-row justify-between">
                  <Text className="text-xl font-bold text-foreground">
                    {t('tableOrder.total')}
                  </Text>
                  <Text className="text-xl font-bold text-primary">R$ {total.toFixed(2)}</Text>
                </View>
              </CardContent>
            </Card>
          </View>
        )}

        {/* Actions */}
        <View className="px-8 pb-10 items-center gap-3">
          {orderItems.length > 0 && (
            <Button onPress={handleCloseBill} className="w-full max-w-lg">
              <Text className="text-primary-foreground font-semibold">
                {t('tableOrder.closeBill')}
              </Text>
            </Button>
          )}
          <Button
            variant="outline"
            onPress={() => navigation.goBack()}
            className="w-full max-w-lg"
          >
            <Text>{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default TableOrderScreen;
