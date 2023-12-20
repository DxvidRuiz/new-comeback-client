import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../common/buttons/button';
import AuthContainer from '../../common/containers/AuthContainer';
import Input from '../../common/input/input';
import AuthTitleText from '../../common/text/AuthTitleText';
import { RootState, useAppDispatch } from '../../redux/store/store';

import { debounce } from 'lodash';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, useFormik } from 'formik';
import { checkEmail, checkUsername } from '../../redux/actions/user.actions';
import { setUserData } from '../../redux/slices/registerFormSlice';
import { RootStackParams } from '../../types/types';
import { userDataSchema } from '../../validations/yupSchemas/registerSchema';

type AuthNavigationProp = NativeStackNavigationProp<RootStackParams, 'registerUserData'>;



const RegisterUserData = () => {
    const dispatch = useAppDispatch();

    const partialUserData = useSelector((state: RootState) => state.registerData)

    const stateData = useSelector((state: RootState) => state.registerForm);
    const theme = useTheme();
    const styles = style(theme)
    const navigation = useNavigation<AuthNavigationProp>()
    // Save register information on redux storage using formik 
    const initialValues = { username: '', email: '' }




    const onSubmit = async (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
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
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userDataSchema,
        onSubmit

    });
    const debouncedCheckEmail = useMemo(() =>
        debounce(async (email) => {
            const emailToCheck = { "email": email };
            try {
                if (!formik.errors.email) {
                    const emailResponse = await dispatch(checkEmail(emailToCheck));

                    if (emailResponse.payload) {
                        if (emailResponse.payload.statusCode === 200) {
                            formik.setFieldError("email", "Email already in use, please try another");
                            console.log(formik.errors.email);
                        } else if (emailResponse.payload.statusCode === 404) {
                            console.log("Email does not exist");
                        } else {
                            console.log(`Unexpected status code: ${emailResponse.payload.statusCode}`);
                        }
                    } else {
                        console.log("Unexpected payload:", emailResponse.payload);
                    }
                }
            } catch (error) {
                // Aquí puedes manejar otros errores que puedan ocurrir durante la llamada
                console.log("Error during email validation:", error);
            }
        }, 500), [dispatch, formik.errors.email]);


    // Existent username  validation ---------------------
    const debouncedCheckUsername = useMemo(() =>
        debounce(async (username) => {
            const usernameToCheck = { "username": username };
            try {
                if (!formik.errors.username) {
                    const usernameResponse = await dispatch(checkUsername(usernameToCheck));


                    if (usernameResponse.payload) {
                        if (usernameResponse.payload.statusCode === 200) {
                            formik.setFieldError("username", "Username already in use, please try another");
                            console.log(formik.errors.username);
                        } else if (usernameResponse.payload.statusCode === 404) {
                            console.log("Username does not exist");
                        } else {
                            console.log(`Unexpected status code: ${usernameResponse.payload.statusCode}`);
                        }
                    } else {
                        console.log("Unexpected payload:", usernameResponse.payload);
                    }
                }
            } catch (error) {
                // Aquí puedes manejar otros errores que puedan ocurrir durante la llamada
                console.log("Error during username validation:", error);
            }
        }, 500), [dispatch, formik.errors.username]);



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
                            keyboardType='email-address'
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