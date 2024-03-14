import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import PostCameraComponent from "../../../components/camera/PostCameraComponent";
import NewPost from "../../../screens/MainAppScreens/postScreens/NewPost";
import SendNewPost from "../../../screens/MainAppScreens/postScreens/SendNewPost";
import { NewPostNavigationProps } from "../../../types/NavigationParams/newPostParams";


const NewPostNavigation = () => {
    const Stack = createNativeStackNavigator<NewPostNavigationProps>()
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Stack.Navigator initialRouteName="newPost" >
            {/* 
            <Stack.Screen name='newPostOptions' component={NewPostOptionsScreen} options={{

                headerShown: false,

            }} /> */}

            <Stack.Screen name='newPost' component={NewPost} options={{
                headerShown: true,
                title: t("label.new_post"),
                headerShadowVisible: false,
                headerTintColor: theme.colors.onSurface,
                headerStyle: {
                    // backgroundColor: theme.colors.onSecondary,
                    backgroundColor: theme.colors.onSecondary,

                    // Aquí estableces el color de fondo del encabezado
                },
                // headerTransparent: true,
                headerTitleAlign: "center"
            }} />
            <Stack.Screen name='sendNewPost' component={SendNewPost} options={{
                headerShadowVisible: false,

                animation: "slide_from_right",
                // headerShown: false,
            }} />
            <Stack.Screen name='postCameraComponent' component={PostCameraComponent}

                options={{

                    headerShown: false,  // Oculta el header
                    headerTransparent: true,  // Garantiza que no se reserve espacio para el header
                }} />


        </Stack.Navigator>
    )
}

export default NewPostNavigation;
