import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParams, RootStackParams } from '../../types/types';
import FeedScreen from '../../screens/MainAppScreens/HomeScreens/FeedScreen';
import ProfileScreen from '../../screens/MainAppScreens/ProfileScreens/ProfileScreen';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import MessagesScreen from '../../screens/MainAppScreens/MessageScreens/MessagesScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileNavigation from './ProfileNavigation';
const Tab = createBottomTabNavigator<AppTabParams>();
const MainRouteNavigation = () => {

    const theme = useTheme()
    return (
        <Tab.Navigator
            screenOptions={{ tabBarActiveTintColor: theme.colors.secondary, headerShown: false, tabBarShowLabel: false, tabBarActiveBackgroundColor : theme.colors.onSecondary , tabBarInactiveBackgroundColor: theme.colors.onSecondary ,  }}
        >
            <Tab.Screen name="feed" component={FeedScreen} options={{ tabBarIcon: ({ focused }) => (<Octicons name="home" size={focused ? 25 : 22} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />) }} />
            <Tab.Screen name="messages" component={MessagesScreen} options={{ tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="message-reply-outline" size={focused ? 25 : 22} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />) }}/>

            <Tab.Screen name="profileNavigation" component={ProfileNavigation} options={{  headerShown: false , headerTransparent: true,  tabBarIcon: ({ focused }) => (<Octicons name="person" size={focused ? 25 : 22} color={focused ? theme.colors.secondary : theme.colors.onPrimary} />) }}/>
            
        </Tab.Navigator>
    )
}

export default MainRouteNavigation