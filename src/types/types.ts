import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootStackParams = {
  registerPersonalData: undefined;
  registerUserData: undefined;
  registerPassword: undefined;
  login: undefined;
  welcome: undefined;
  authNavigation: undefined;
  mainRouteNavigation: undefined;
  registerMethod: undefined;
  feed: undefined;
  messages: undefined;
};

export type AppTabParams = {
  feed: undefined;
  profile: undefined;
  messages: undefined;
};

// Definir tipos de navegación para cada pantalla
export type RegisterPersonalDataScreenNavigationProp =
  NativeStackNavigationProp<RootStackParams, "registerPersonalData">;
export type RegisterUserDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "registerUserData"
>;
export type RegisterPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "registerPassword"
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "login"
>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "welcome"
>;
export type AuthNavigationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "authNavigation"
>;
export type MainRouteNavigationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "mainRouteNavigation"
>;
export type RegisterMethodScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "registerMethod"
>;

// Tab navigaitors
export type FeedTabNavigationProp = BottomTabNavigationProp<
  AppTabParams,
  "feed"
>;
export type MessagesTabNavigationProp = BottomTabNavigationProp<
  AppTabParams,
  "messages"
>;
export type ProfileTabNavigationProp = BottomTabNavigationProp<
  AppTabParams,
  "profile"
>;
