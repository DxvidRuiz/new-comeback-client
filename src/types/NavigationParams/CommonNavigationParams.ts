import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CommonNavigationParams = {
    MainTabParam: undefined
    AuthParam: undefined
};

export type CommonNavigationProps = {
    MainTabProps: NativeStackNavigationProp<CommonNavigationParams, "MainTabParam">;
    AuthProps: NativeStackNavigationProp<CommonNavigationParams, "AuthParam">;
};


