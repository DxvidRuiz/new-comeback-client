import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthNavigationProps = {
    welcome: NativeStackNavigationProp<AuthNavigationParams, "welcome">;
    registerMethod: NativeStackNavigationProp<AuthNavigationParams, "registerMethod">;
    login: NativeStackNavigationProp<AuthNavigationParams, "login">;
    registerPersonalData: NativeStackNavigationProp<AuthNavigationParams, "registerPersonalData">;
    registerUserData: NativeStackNavigationProp<AuthNavigationParams, "registerUserData">;
    registerPassword: NativeStackNavigationProp<AuthNavigationParams, "registerPassword">;
};

export type AuthNavigationParams = {
    welcome: undefined;
    registerMethod: undefined;
    login: undefined;
    registerPersonalData: undefined;
    registerUserData: undefined;
    registerPassword: undefined;
};

