import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';
import AuthContainer from '../../common/containers/AuthContainer';
import AuthTitleText from '../../common/text/AuthTitleText';
import Input from '../../common/input/input';
import Button from '../../common/buttons/button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { apiCallThunk } from '../../redux/thunks/apiCallThunk';
import { debounce } from 'lodash';

import { personalDataSchema, userDataSchema } from '../../validations/yupSchemas/registerSchema';
import { useFormik } from 'formik';
import { API_ENDPOINTS } from '../../services/api/urlEndpoints/authEnpoint';
import { METOD_E } from '../../types/apiTypes';
import { setUserData } from '../../redux/slices/registerFormSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types/types';
import { useNavigation } from '@react-navigation/native';

type AuthNavigationProp = NativeStackNavigationProp<RootStackParams, 'registerUserData'>;



const RegisterUserData = () => {
    const dispatch = useDispatch<AppDispatch>();
    const stateData = useSelector((state: RootState) => state.mainReducer.registerForm);
    const theme = useTheme();
    const styles = style(theme)
    const navigation = useNavigation<AuthNavigationProp>()
    // Save register information on redux storage using formik 
    const formik = useFormik({
        initialValues: { username: '', email: '' },
        validationSchema: userDataSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                console.log(stateData);
                // last fields validation 
                await Promise.all([
                    debouncedCheckEmail(values.email),
                    debouncedCheckUsername(values.username),
                ]);
                dispatch(setUserData({ email: values.email.trim(), username: values.username.trim() }));
                navigation.navigate("registerPassword")
                console.log(stateData);

            } catch (error) {

                throw new Error("message:", error)

            }
        },

    });



    // Existent email validation ---------------------
    const debouncedCheckEmail = useMemo(() =>
        debounce(async (email) => {

            console.log(email);
            try {
                const emailResponse = await dispatch(apiCallThunk({
                    base_url: API_ENDPOINTS.URL_BASE, endpoint: API_ENDPOINTS.CHECK_EMAIL,
                    method: METOD_E.POST, data: { email: email }
                })).unwrap();
                if (emailResponse) {
                    formik.setFieldError("email", "Email already in use, please try another")
                    console.log(emailResponse.statusCode);
                }
            } catch (error) {
                console.log(error);
            }
        }, 500), []); // 500 ms de retrasom

    // Existent username  validation ---------------------

    const debouncedCheckUsername = useMemo(() =>

        debounce(async (username) => {
            try {
                if (!formik.errors.username) {
                    const usernameResponse = await dispatch(apiCallThunk({
                        base_url: API_ENDPOINTS.URL_BASE, endpoint: API_ENDPOINTS.CHECK_USERNAME,
                        data: { username: username }, method: METOD_E.POST
                    })).unwrap();
                    if (usernameResponse) {
                        formik.setFieldError("username", "Username already in use, please try another");
                        console.log(formik.errors.email);
                    }
                }

            } catch (error) {
                console.log(error);

            }

        }, 500), [])



    useEffect(() => {
        return () => {
            debouncedCheckEmail.cancel();
            debouncedCheckUsername.cancel();
        };
    }, []);

    return (

        <AuthContainer>

            <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text>
            <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <View style={styles.content} >

                    <View style={styles.titleContariner}>
                        <AuthTitleText text='Create your username:' />
                    </View>

                    <View style={styles.inputContainer}>
                        <Input
                            label='Email'
                            formik={formik}
                            name='email'
                            keyboardType='default'
                            externalOnChangeText={debouncedCheckEmail}
                        />
                        <Input
                            label='Username'
                            formik={formik}
                            name='username'
                            keyboardType='default'
                            externalOnChangeText={debouncedCheckUsername}
                        />

                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label='Last step'
                            size='medium'
                            onPress={formik.handleSubmit}
                            disabled={formik.isSubmitting || !formik.isValid}
                        />
                    </View>


                </View>
            </View>
        </AuthContainer>
    )
}

export default RegisterUserData



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
            marginVertical: "10%"
        }
        ,
        inputContainer: {
            marginVertical: "2%",
            gap: 8
        },
        input: {
            backgroundColor: theme.colors.surface
        },
        button: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.onSecondary
        },
        titleContariner: {
            flexDirection: "row",
            marginVertical: 20
        }


    })