import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TablesScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface TableData {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
  currentOrderTotal: number;
  guestName?: string;
}

// Mock data for front-end — will be replaced by API calls
const MOCK_TABLES: TableData[] = [
  { id: '1', number: 1, seats: 2, status: 'available', currentOrderTotal: 0 },
  {
    id: '2',
    number: 2,
    seats: 4,
    status: 'occupied',
    currentOrderTotal: 45.9,
    guestName: 'Hamlet',
  },
  { id: '3', number: 3, seats: 4, status: 'reserved', currentOrderTotal: 0, guestName: 'Ophelia' },
  {
    id: '4',
    number: 4,
    seats: 6,
    status: 'occupied',
    currentOrderTotal: 78.5,
    guestName: 'Macbeth',
  },
  { id: '5', number: 5, seats: 2, status: 'available', currentOrderTotal: 0 },
  {
    id: '6',
    number: 6,
    seats: 8,
    status: 'occupied',
    currentOrderTotal: 124.0,
    guestName: 'Prospero',
  },
  { id: '7', number: 7, seats: 4, status: 'available', currentOrderTotal: 0 },
  {
    id: '8',
    number: 8,
    seats: 2,
    status: 'occupied',
    currentOrderTotal: 32.0,
    guestName: 'Juliet',
  },
];

const STATUS_CONFIG: Record<TableStatus, { emoji: string; colorClass: string }> = {
  available: { emoji: '🟢', colorClass: 'border-l-green-500' },
  occupied: { emoji: '🔴', colorClass: 'border-l-red-500' },
  reserved: { emoji: '🟡', colorClass: 'border-l-yellow-500' },
};

const TablesScreen: React.FC = () => {
  const navigation = useNavigation<TablesScreenNavigationProp>();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<TableStatus | 'all'>('all');

  const filteredTables =
    filter === 'all' ? MOCK_TABLES : MOCK_TABLES.filter((table) => table.status === filter);

  const counts = {
    all: MOCK_TABLES.length,
    available: MOCK_TABLES.filter((t) => t.status === 'available').length,
    occupied: MOCK_TABLES.filter((t) => t.status === 'occupied').length,
    reserved: MOCK_TABLES.filter((t) => t.status === 'reserved').length,
  };

  const handleTablePress = (tableId: string) => {
    navigation.navigate('TableOrder', { tableId });
  };

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-secondary-foreground/60 font-semibold uppercase mb-2">
            {t('tables.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('tables.title')}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          <Text className="text-lg text-secondary-foreground/80 text-center italic">
            {t('tables.subtitle')}
          </Text>
        </View>

        {/* Filter Pills */}
        <View className="px-6 pt-6 items-center">
          <View className="w-full max-w-lg">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {(
                [
                  { key: 'all', label: t('tables.filterAll') },
                  { key: 'available', label: t('tables.filterAvailable') },
                  { key: 'occupied', label: t('tables.filterOccupied') },
                  { key: 'reserved', label: t('tables.filterReserved') },
                ] as const
              ).map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => setFilter(item.key)}
                  className={`px-4 py-2 rounded-full border ${
                    filter === item.key
                      ? 'bg-primary border-primary'
                      : 'bg-background border-border'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      filter === item.key ? 'text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    {item.label} ({counts[item.key]})
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Tables Grid */}
        <View className="px-6 py-6 items-center">
          <View className="w-full max-w-lg gap-4">
            {filteredTables.map((table) => {
              const statusConfig = STATUS_CONFIG[table.status];
              return (
                <Pressable
                  key={table.id}
                  onPress={() => handleTablePress(table.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${t('tables.table')} ${table.number}`}
                >
                  <Card className={`w-full border-l-4 ${statusConfig.colorClass}`}>
                    <CardHeader className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-3">
                        <Text className="text-3xl">🪑</Text>
                        <View className="gap-1">
                          <CardTitle>
                            {t('tables.table')} {table.number}
                          </CardTitle>
                          <CardDescription>
                            {table.seats} {t('tables.seats')}
                          </CardDescription>
                        </View>
                      </View>
                      <View className="items-end gap-1">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-base">{statusConfig.emoji}</Text>
                          <Text className="text-sm font-medium text-foreground">
                            {t(`tables.status_${table.status}`)}
                          </Text>
                        </View>
                        {table.guestName && (
                          <Text className="text-xs text-muted-foreground">{table.guestName}</Text>
                        )}
                      </View>
                    </CardHeader>
                    {table.status === 'occupied' && (
                      <CardContent>
                        <View className="flex-row items-center justify-between border-t border-border pt-3">
                          <Text className="text-sm text-muted-foreground">
                            {t('tables.currentTotal')}
                          </Text>
                          <Text className="text-lg font-bold text-foreground">
                            R$ {table.currentOrderTotal.toFixed(2)}
                          </Text>
                        </View>
                      </CardContent>
                    )}
                  </Card>
                </Pressable>
              );
            })}
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

export default TablesScreen;
