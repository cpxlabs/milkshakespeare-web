import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  About: undefined;
  Tables: undefined;
  TableOrder: { tableId: string };
  Admin: undefined;
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;
export type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;
export type TablesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tables'>;
export type TableOrderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TableOrder'
>;
export type AdminScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;
export type MenuScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;
export type TableOrderScreenRouteProp = RouteProp<RootStackParamList, 'TableOrder'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
