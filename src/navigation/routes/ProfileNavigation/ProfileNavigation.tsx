import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import ProfileScreen from "../../../screens/MainAppScreens/ProfileScreens/ProfileScreen";
import EditAuthData from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditAuthData";
import EditPersonalData from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditPersonalData";
import EditProfileData from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditProfileData";
import EditProfileScreen from "../../../screens/MainAppScreens/ProfileScreens/editProfile/EditProfileScreen";
import EditPassword from "../../../screens/MainAppScreens/ProfileScreens/editProfile/authenticationEdit/EditPassword";
import { ProfileNavigationProps } from "../../../types/NavigationParams/profileParams";


const ProfileNavigation = () => {
    const Stack = createNativeStackNavigator<ProfileNavigationProps>()
    const theme = useTheme();

    return (
        <Stack.Navigator initialRouteName="profileData" screenOptions={{ animation: "slide_from_right" }}>

            <Stack.Group>
                <Stack.Screen name='profileData' component={ProfileScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal", animation: "flip" }}>

                <Stack.Screen name='editProfile' component={EditProfileScreen} options={{
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerBackButtonMenuEnabled: true,
                    headerTintColor: theme.colors.onPrimary,
                    headerTitle: "Edit profile",
                    headerTitleAlign: "center",
                    animation: "flip"
                }} />
            </Stack.Group>

            <Stack.Screen name='editPersonalData' component={EditPersonalData} options={{
                headerBackButtonMenuEnabled: true,
                headerTintColor: theme.colors.onPrimary,
                headerTitle: "Personal data",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: theme.colors.background }
            }} />



            <Stack.Screen name='editProfileData' component={EditProfileData} options={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerTransparent: true,
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
                headerTitleAlign: "center",
            }} />

            <Stack.Screen name='editPassword' component={EditPassword} options={{
                headerShown: false,
                headerBackButtonMenuEnabled: true,
                headerBackVisible: true,
                headerTitle: "",
                headerTransparent: false,
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: "center",
            }} />


        </Stack.Navigator>
    )
}

export default ProfileNavigation;
