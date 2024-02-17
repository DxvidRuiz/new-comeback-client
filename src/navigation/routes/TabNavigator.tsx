import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import FeedScreen from '../../screens/MainAppScreens/HomeScreens/FeedScreen';
import NewPostOptionsScreen, { default as MessagesScreen } from '../../screens/MainAppScreens/MessageScreens/newPostOptionsScreen';
import ProfileScreen from '../../screens/MainAppScreens/ProfileScreens/ProfileScreen';
import { AppTabNavigationProps } from '../../types/NavigationParams/AppTabNavigationProps';
export const TabNavigation = () => {
    const Tab = createBottomTabNavigator<AppTabNavigationProps>();

    const theme = useTheme()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.secondary,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: theme.colors.onSecondary,
                tabBarInactiveBackgroundColor: theme.colors.onSecondary,

            }}
        >
            <Tab.Screen name="feed" component={FeedScreen} options={{ tabBarIcon: ({ focused }) => (<Octicons name="home" size={focused ? 25 : 22} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />) }} />

            <Tab.Screen name="newPostOptions" component={NewPostOptionsScreen} options={{
                headerShown: false, headerTransparent: false, tabBarIcon: ({ focused }) => (

                    <AntDesign name="pluscircle" size={focused ? 30 : 26} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />)
            }} />

            <Tab.Screen name="messages" component={MessagesScreen} options={{ tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="message-reply-outline" size={focused ? 25 : 22} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />) }} />

            <Tab.Screen name="profile" component={ProfileScreen} options={{ headerShown: false, headerTransparent: false, tabBarIcon: ({ focused }) => (<Octicons name="person" size={focused ? 25 : 22} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />) }} />
        </Tab.Navigator>
    )
}





export default TabNavigation