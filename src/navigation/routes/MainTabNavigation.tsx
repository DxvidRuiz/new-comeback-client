import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { MainNavigationProps } from '../../types/NavigationParams/MainNavigationParams';
import ProfileNavigation from './ProfileNavigation';
import TabNavigation from './TabNavigator';

export const MainNavigation = () => {
    const Stack = createNativeStackNavigator<MainNavigationProps>()

    const theme = useTheme()
    return (
        <Stack.Navigator >
            <Stack.Screen name='home' component={TabNavigation} options={{
                headerStyle: { backgroundColor: theme.colors.background },
                headerBackButtonMenuEnabled: true,
                headerTintColor: theme.colors.onPrimary,
                headerTitle: "Edit profile",
                headerTitleAlign: "center",
                animation: "flip",
                fullScreenGestureEnabled: true,
                headerShown: false
            }} />

            <Stack.Screen name='profileNavigation' component={ProfileNavigation} options={{
                headerShown: false,
                headerTitleAlign: "center",
                presentation: "modal",
                animation: "fade_from_bottom"
            }} />


        </Stack.Navigator>
    )
}





export default MainNavigation