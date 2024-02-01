import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ProfileParams = {
    editProfile: undefined;
    editPersonalData: undefined;
    editProfileData: undefined;
    editAuthData: undefined;
    profileNavigation: undefined;
    editPassword: undefined;
    profileData: undefined;
    passwordUpdateForm: undefined;
    passwordUpdateFormAfter2FA: undefined;
    passwordUpdateCodeConfirmation: undefined;
};

export type ProfileNavigationProps = {
    editProfile: NativeStackNavigationProp<ProfileParams, "editProfile">;
    editPersonalData: NativeStackNavigationProp<ProfileParams, "editPersonalData">;
    editProfileData: NativeStackNavigationProp<ProfileParams, "editProfileData">;
    editAuthData: NativeStackNavigationProp<ProfileParams, "editAuthData">;
    profileNavigation: NativeStackNavigationProp<ProfileParams, "profileNavigation">;
    editPassword: NativeStackNavigationProp<ProfileParams, "editPassword">;
    profileData: NativeStackNavigationProp<ProfileParams, "profileData">;
    passwordUpdateForm: NativeStackNavigationProp<ProfileParams, "passwordUpdateForm">;
    passwordUpdateFormAfter2FA: NativeStackNavigationProp<ProfileParams, "passwordUpdateFormAfter2FA">;
    passwordUpdateCodeConfirmation: NativeStackNavigationProp<ProfileParams, "passwordUpdateCodeConfirmation">;
};



