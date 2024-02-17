import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import Login from "../../screens/authenticationScreens/Login";
import RegisterMethod from "../../screens/authenticationScreens/RegisterMethodScreen";
import RegisterPasswordStep from "../../screens/authenticationScreens/RegisterPasswordStep";
import RegisterPersonalData from "../../screens/authenticationScreens/RegisterPersonalData";
import RegisterUserData from "../../screens/authenticationScreens/RegisterUserData";
import Welcome from "../../screens/authenticationScreens/Welcome";
import PasswordRestoreCodeConfirmation from "../../screens/authenticationScreens/passwordRestore/PasswodRestoreCodeConfirmation";
import PasswordRestoreEmail from "../../screens/authenticationScreens/passwordRestore/PasswordRestoreEmail";
import PasswordRestoreForm from "../../screens/authenticationScreens/passwordRestore/PasswordRestoreForm ";
import PasswordRestoreFormAfter2FA from "../../screens/authenticationScreens/passwordRestore/PasswordRestoreFormAfter2FA";
import { AuthNavigationProps } from "../../types/NavigationParams/AuthNavigationParams";

const Stack = createNativeStackNavigator<AuthNavigationProps>()

const AuthNavigation = () => {
    const theme = useTheme();

    return (

        <Stack.Navigator initialRouteName="registerMethod" screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen name='welcome' component={Welcome} options={{ headerShown: false, headerBackButtonMenuEnabled: true, }} />
            <Stack.Screen name='registerMethod' component={RegisterMethod} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='login' component={Login} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='registerPersonalData' component={RegisterPersonalData} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='registerUserData' component={RegisterUserData} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='registerPassword' component={RegisterPasswordStep} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='passwordRestoreForm' component={PasswordRestoreForm} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />
            <Stack.Screen name='passwordRestoreCodeConfirmation' component={PasswordRestoreCodeConfirmation} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: ""
            }} />

            <Stack.Screen name='passwordRestoreEmail' component={PasswordRestoreEmail} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: "", headerShadowVisible: false
            }} />
            <Stack.Screen name='passwordRestoreFormAfter2FA' component={PasswordRestoreFormAfter2FA} options={{
                headerShown: true, headerBackButtonMenuEnabled: true, headerBackVisible: true, headerTransparent: true, headerTintColor: theme.colors.onPrimary, headerTitle: "", headerShadowVisible: false
            }} />
        </Stack.Navigator>
    )
}



export default AuthNavigation