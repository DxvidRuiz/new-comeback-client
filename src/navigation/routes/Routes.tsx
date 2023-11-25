import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParams } from '../../types/types'
import Login from '../../screens/authenticationScreens/Login'
import { PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from '../../styles/theme'
import Welcome from '../../screens/authenticationScreens/Welcome'
import RegisterPersonalData from '../../screens/authenticationScreens/RegisterPersonalData'
import RegisterUserData from '../../screens/authenticationScreens/RegisterUserData'
import RegisterPasswordStep from '../../screens/authenticationScreens/RegisterPasswordStep'
import AuthNavigation from './AuthNavigation'
import MainRouteNavigation from './MainRouteNavigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'

const Stack = createNativeStackNavigator<RootStackParams>()






const Routes = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const authenticated = useSelector((state: RootState) => state.mainReducer.authUser.isAuthenticated);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (

        <NavigationContainer>
            <PaperProvider theme={isDarkMode ? darkTheme : lightTheme} >
                <Stack.Navigator initialRouteName='authNavigation' >

                    {
                    // authenticated 
                    true
                    ?
                        <Stack.Screen name='mainRouteNavigation' component={MainRouteNavigation} options={{ headerShown: false, headerBackButtonMenuEnabled: true, }} />
                        :
                        <Stack.Screen name='authNavigation' component={AuthNavigation} options={{ headerShown: false, headerBackButtonMenuEnabled: true, }} />
                    }
                </Stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    )
}

export default Routes