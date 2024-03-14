import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { MainNavigationProps } from '../../types/NavigationParams/MainNavigationParams';
import NewPostNavigation from './NewPostNavigation';
import ProfileNavigation from './ProfileNavigation';
import TabNavigation from './TabNavigator';

export const MainNavigation = () => {


    const darktheme = true
    const Stack = createNativeStackNavigator<MainNavigationProps>()

    const theme = useTheme()
    return (
        <Stack.Navigator screenOptions={{ statusBarColor: theme.colors.onSecondary, statusBarStyle: darktheme ? "light" : "dark" }}>

            <Stack.Group>
                <Stack.Screen name='mainTabNavigation' component={TabNavigation} options={{
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerBackButtonMenuEnabled: true,
                    headerTintColor: theme.colors.onPrimary,
                    headerTitle: "Edit profile",
                    headerTitleAlign: "center",
                    animation: "flip",
                    fullScreenGestureEnabled: true,
                    headerShown: false
                }} />
            </Stack.Group>

            <Stack.Screen name='profileNavigation' component={ProfileNavigation} options={{
                headerShown: false,
                headerTitleAlign: "center",
                presentation: "modal",
                animation: "fade_from_bottom"
            }} />

            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name='newPostNavigation' component={NewPostNavigation} options={{
                    headerShown: false,

                    // fullScreenGestureEnabled: true,


                    // headerTitleAlign: "center",
                    // presentation: "modal",
                    // animation: "fade_from_bottom"
                }} />

            </Stack.Group>






        </Stack.Navigator>
    )
}





export default MainNavigation