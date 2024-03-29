import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import EditAuthData from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditAuthData";
import EditPersonalData from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditPersonalData";
import EditProfileData from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditProfileData";
import EditProfileScreen from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditProfileScreen";
import PasswordUpdateCodeConfirmation from "../../../screens/MainAppScreens/ProfileScreens/editProfile/authenticationEdit/PasswodUpdateCodeConfirmation";
import PasswordUpdateForm from "../../../screens/MainAppScreens/ProfileScreens/editProfile/authenticationEdit/PasswordUpdateForm ";
import PasswordUpdateFormAfter2FA from "../../../screens/MainAppScreens/ProfileScreens/editProfile/authenticationEdit/PasswordUpdateFormAfter2FA";
import { ProfileNavigationProps } from "../../../types/NavigationParams/profileParams";


const ProfileNavigation = () => {
    const Stack = createNativeStackNavigator<ProfileNavigationProps>()
    const theme = useTheme();

    return (
        <Stack.Navigator initialRouteName="editProfile">
            {/* <Stack.Group>
                <Stack.Screen name='profileData' component={ProfileScreen} />
            </Stack.Group> */}
            <Stack.Screen name='editProfile' component={EditProfileScreen} options={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerBackButtonMenuEnabled: true,
                headerTintColor: theme.colors.onPrimary,
                headerTitle: "Edit profile",
                headerTitleAlign: "center",
            }} />

            <Stack.Screen name='editPersonalData' component={EditPersonalData} options={{
                headerBackButtonMenuEnabled: true,
                headerTintColor: theme.colors.onPrimary,
                headerTitle: "Personal data",
                headerTitleAlign: "center",
                animation: "slide_from_right",

                headerStyle: { backgroundColor: theme.colors.background }
            }} />

            <Stack.Screen name='editProfileData' component={EditProfileData} options={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerTransparent: true,
                animation: "slide_from_right",
                headerTintColor: theme.colors.onPrimary,
                headerTitle: ""
            }} />

            <Stack.Screen name='editAuthData' component={EditAuthData} options={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerTitle: "Auth Information",
                headerTransparent: true,
                headerTintColor: theme.colors.onPrimary,
                animation: "slide_from_right",
                headerTitleAlign: "center",
            }} />


            <Stack.Screen name='passwordUpdateForm' component={PasswordUpdateForm} options={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerTitle: "",
                headerTransparent: true,
                animation: "slide_from_right",
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: "center",
            }} />
            <Stack.Screen name='passwordUpdateFormAfter2FA' component={PasswordUpdateFormAfter2FA} options={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerTitle: "",
                headerTransparent: true,
                animation: "slide_from_right",
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: "center",
            }} />
            <Stack.Screen name='passwordUpdateCodeConfirmation' component={PasswordUpdateCodeConfirmation} options={{
                headerShown: true,
                headerBackButtonMenuEnabled: false,
                headerBackVisible: false,
                headerTitle: "",
                headerTransparent: true,
                animation: "slide_from_right",
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: "center",
            }} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation;
