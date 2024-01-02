import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainParams = {
    profileNavigation: undefined;
    home: undefined;
};

export type MainNavigationProps = {
    home: NativeStackNavigationProp<MainParams, "home">;
    profileNavigation: NativeStackNavigationProp<MainParams, "profileNavigation">;
};


