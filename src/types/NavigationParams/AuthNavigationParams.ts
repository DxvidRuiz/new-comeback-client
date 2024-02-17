import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthNavigationProps = {
    welcome: NativeStackNavigationProp<AuthNavigationParams, "welcome">;
    registerMethod: NativeStackNavigationProp<AuthNavigationParams, "registerMethod">;
    login: NativeStackNavigationProp<AuthNavigationParams, "login">;
    registerPersonalData: NativeStackNavigationProp<AuthNavigationParams, "registerPersonalData">;
    registerUserData: NativeStackNavigationProp<AuthNavigationParams, "registerUserData">;
    registerPassword: NativeStackNavigationProp<AuthNavigationParams, "registerPassword">;
    passwordRestoreForm: NativeStackNavigationProp<AuthNavigationParams, "passwordRestoreForm">;
    passwordRestoreFormAfter2FA: NativeStackNavigationProp<AuthNavigationParams, "passwordRestoreFormAfter2FA">;
    passwordRestoreCodeConfirmation: NativeStackNavigationProp<AuthNavigationParams, "passwordRestoreCodeConfirmation">;
    passwordRestoreEmail: NativeStackNavigationProp<AuthNavigationParams, "passwordRestoreEmail">;

};

export type AuthNavigationParams = {
    welcome: undefined;
    registerMethod: undefined;
    login: undefined;
    registerPersonalData: undefined;
    registerUserData: undefined;
    registerPassword: undefined;
    passwordRestoreForm: undefined;
    passwordRestoreFormAfter2FA: { email: string } | undefined;
    passwordRestoreCodeConfirmation: { email: string } | undefined;
    passwordRestoreEmail: undefined;
};

