import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainParams = {
    profileNavigation: undefined;
    mainTabNavigation: undefined;
    newPostNavigation: undefined
};

export type MainNavigationProps = {
    mainTabNavigation: NativeStackNavigationProp<MainParams, "mainTabNavigation">;
    profileNavigation: NativeStackNavigationProp<MainParams, "profileNavigation">;
    newPostNavigation: NativeStackNavigationProp<MainParams, "newPostNavigation">;
};


