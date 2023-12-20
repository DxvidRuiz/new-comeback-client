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

  editProfile: undefined;

  editPersonalData: undefined;
  editProfileData: undefined;
  editAuthData: undefined;

  profileNavigation: undefined;
  profile: undefined;
};

export type AppTabParams = {
  feed: undefined;
  profile: undefined;
  messages: undefined;
  profileNavigation: undefined;
};

// Definir tipos de navegación para cada pantalla
export type RegisterPersonalDataScreenNavigationProp =
  NativeStackNavigationProp<RootStackParams, "registerPersonalData">;
export type RegisterUserDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "registerUserData"
>;

export type EditPersonalDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "editPersonalData"
>;

export type EditProfileDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "editProfileData"
>;
export type EditAuthDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "editAuthData"
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
export type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "editProfile"
>;
export type profileNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "profileNavigation"
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
export type ProfileNavigationTabNavigationProp = BottomTabNavigationProp<
  AppTabParams,
  "profileNavigation"
>;
