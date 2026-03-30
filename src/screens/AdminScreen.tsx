import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AdminScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

interface DashboardStat {
  labelKey: string;
  value: string;
  emoji: string;
}

// Mock dashboard data — will be replaced by API calls
const DASHBOARD_STATS: DashboardStat[] = [
  { labelKey: 'admin.statTotalTables', value: '8', emoji: '🪑' },
  { labelKey: 'admin.statOccupied', value: '4', emoji: '🔴' },
  { labelKey: 'admin.statAvailable', value: '3', emoji: '🟢' },
  { labelKey: 'admin.statReserved', value: '1', emoji: '🟡' },
];

const REVENUE_STATS: DashboardStat[] = [
  { labelKey: 'admin.statTodayRevenue', value: 'R$ 1.280,40', emoji: '💰' },
  { labelKey: 'admin.statOpenOrders', value: '4', emoji: '📋' },
  { labelKey: 'admin.statClosedToday', value: '12', emoji: '✅' },
  { labelKey: 'admin.statAvgTicket', value: 'R$ 45,50', emoji: '🎫' },
];

const AdminScreen: React.FC = () => {
  const navigation = useNavigation<AdminScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-12 items-center">
          <Text className="text-sm tracking-widest text-secondary-foreground/60 font-semibold uppercase mb-2">
            {t('admin.headerLabel')}
          </Text>
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('admin.title')}
          </Text>
          <View className="w-12 h-1 bg-accent rounded-full mt-4 mb-3" />
          <Text className="text-lg text-secondary-foreground/80 text-center italic">
            {t('admin.subtitle')}
          </Text>
        </View>

        {/* Tables Overview */}
        <View className="px-6 pt-8 items-center">
          <View className="w-full max-w-lg gap-4">
            <Text className="text-xl font-bold text-foreground">{t('admin.tablesOverview')}</Text>
            <View className="flex-row flex-wrap gap-3">
              {DASHBOARD_STATS.map((stat) => (
                <Card key={stat.labelKey} className="flex-1 min-w-[140px]">
                  <CardContent className="items-center py-4">
                    <Text className="text-3xl mb-2">{stat.emoji}</Text>
                    <Text className="text-2xl font-bold text-foreground">{stat.value}</Text>
                    <Text className="text-xs text-muted-foreground text-center mt-1">
                      {t(stat.labelKey)}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </View>
        </View>

        {/* Revenue Overview */}
        <View className="px-6 pt-8 items-center">
          <View className="w-full max-w-lg gap-4">
            <Text className="text-xl font-bold text-foreground">{t('admin.revenueOverview')}</Text>
            <View className="flex-row flex-wrap gap-3">
              {REVENUE_STATS.map((stat) => (
                <Card key={stat.labelKey} className="flex-1 min-w-[140px]">
                  <CardContent className="items-center py-4">
                    <Text className="text-3xl mb-2">{stat.emoji}</Text>
                    <Text className="text-2xl font-bold text-foreground">{stat.value}</Text>
                    <Text className="text-xs text-muted-foreground text-center mt-1">
                      {t(stat.labelKey)}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pt-8 pb-6 items-center">
          <View className="w-full max-w-lg gap-4">
            <Text className="text-xl font-bold text-foreground">{t('admin.quickActions')}</Text>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('admin.manageTables')}</CardTitle>
                <CardDescription>{t('admin.manageTablesDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onPress={() => navigation.navigate('Tables')} className="w-full">
                  <Text className="text-primary-foreground font-semibold">
                    {t('admin.goToTables')}
                  </Text>
                </Button>
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

export default AdminScreen;
