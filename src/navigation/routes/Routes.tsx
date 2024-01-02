import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { darkTheme, lightTheme } from '../../styles/theme'
import { CommonNavigationProps } from '../../types/NavigationParams/CommonNavigationParams'
import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainTabNavigation'
// import MainTabNavigation from './MainTabNavigation'

const Stack = createNativeStackNavigator<CommonNavigationProps>()
const Routes = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const toggleDarkMode = () => { setIsDarkMode(!isDarkMode) };
    console.log(authenticated, 'in routes');

    return (
        <NavigationContainer>
            <PaperProvider theme={isDarkMode ? darkTheme : lightTheme} >
                <Stack.Navigator initialRouteName='AuthProps' >

                    {
                        authenticated
                            // false
                            ?
                            <Stack.Screen name='MainTabProps' component={MainNavigation} options={{ headerShown: false }} />
                            :
                            <Stack.Screen name='AuthProps' component={AuthNavigation} options={{ headerShown: false, headerBackButtonMenuEnabled: true, }} />
                    }
                </Stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    )
}

export default Routes