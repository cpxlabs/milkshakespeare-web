import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  About: undefined;
  Login: undefined;
  Cart: undefined;
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;
export type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
export type MenuScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
