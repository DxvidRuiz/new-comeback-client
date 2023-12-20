import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Button from '../../common/buttons/button';
import AuthContainer from '../../common/containers/AuthContainer';
import AuthTitleText from '../../common/text/AuthTitleText';
import MediumText from '../../common/text/MediumText';
import { AppDispatch } from '../../redux/store/store';
import { AuthNavigationScreenNavigationProp } from '../../types/types';


const RegisterMethod = () => {
    const navigation = useNavigation<AuthNavigationScreenNavigationProp>()


    const theme = useTheme();

    const dispatch = useDispatch<AppDispatch>();
    //  styles ------------------------------------------------------- 
    const styles = style(theme)

    return (

        <AuthContainer>
            <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <View style={styles.content} >

                    <View style={styles.titleContariner}>
                        <AuthTitleText text='Register options:' />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            label='Register with email'
                            size='medium'
                            onPress={() => navigation.navigate("registerPersonalData")}
                            Icon={"email"}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label='Register with Google'
                            size='medium'
                            onPress={() => { }}
                            color='tertiary'
                            Icon={"google"}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label='Register With Facebook'
                            size='medium'
                            onPress={() => { }}
                            color='tertiary'

                            Icon={"facebook"}
                        // Icon={()=> <MaterialIcons name="email" size={24} color="black" />}


                        />
                    </View>
                    <View style={styles.registerOption}>
                        <MediumText color={theme.colors.onPrimary} text={"Already have account?"} />
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <MediumText fontWeight={"bold"} color={theme.colors.tertiary} text={"Log in"} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </AuthContainer>
    )
}

export default RegisterMethod



const style = (theme: MD3Theme) => StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            verticalAlign: "center",
        }
        ,
        content: {
            backgroundColor: theme.colors.primary,
        },
        buttonContainer: {
            marginVertical: 10
        }
        ,
        inputContainer: {
            marginVertical: "2%",
            gap: 8
        },

        button: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.onSecondary
        },
        titleContariner: {
            flexDirection: "row",
            marginVertical: 20
        },
        logoContariner: {
            flexDirection: "row",

            width: "100%",
            justifyContent: "center",
            marginVertical: 20

        },
        registerOption: {
            flexDirection: "row",
            alignItems: "center"
        }
    })