import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import EditAuthData from "../../../screens/MainAppScreens/ProfileScreens/EditAuthData";
import EditPersonalData from "../../../screens/MainAppScreens/ProfileScreens/EditPersonalData";
import EditProfileData from "../../../screens/MainAppScreens/ProfileScreens/EditProfileData";
import EditProfileScreen from "../../../screens/MainAppScreens/ProfileScreens/EditProfileScreen";
import ProfileScreen from "../../../screens/MainAppScreens/ProfileScreens/ProfileScreen";
import { RootStackParams } from "../../../types/types";

const Stack = createNativeStackNavigator<RootStackParams>()

const ProfileNavigation = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator initialRouteName="registerMethod" screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen name='editProfile' component={EditProfileScreen
            } options={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerBackButtonMenuEnabled: true, headerTintColor: theme.colors.onPrimary, headerTitle: "Edit profile", headerTitleAlign: "center"
            }} />

            <Stack.Screen name='profile' component={ProfileScreen
            } options={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />

            <Stack.Screen name='editPersonalData' component={EditPersonalData
            } options={{

                headerBackButtonMenuEnabled: true, headerTintColor: theme.colors.onPrimary, headerTitle: "Personal data", headerTitleAlign: "center", headerStyle: { backgroundColor: theme.colors.background }
            }} />


            <Stack.Screen name='editProfileData' component={EditProfileData
            } options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='editAuthData' component={EditAuthData
            } options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTitle: "Auth Information", headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitleAlign: "center",
            }} />

        </Stack.Navigator>
    )
}



export default ProfileNavigation