import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';
import CustomInput from '../../common/buttons/CustomInput';
import AuthContainer from '../../common/containers/AuthContainer';
import AuthTitleText from '../../common/text/AuthTitleText';
import Input from '../../common/input/input';
import Button from '../../common/buttons/button';
import MediumText from '../../common/text/MediumText';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { apiCallThunk } from '../../redux/thunks/apiCallThunk';
import { passwordValidationSchema, personalDataSchema } from '../../validations/yupSchemas/registerSchema';
import SmallText from '../../common/text/SmallText';
import { useFormik } from 'formik';
import uuid from 'react-native-uuid';
import { API_ENDPOINTS } from '../../services/api/urlEndpoints/authEnpoint';
import { METOD_E } from '../../types/apiTypes';
import { setAccessToken, setAuthentication } from '../../redux/slices/authSlice';


const RegisterPasswordStep = () => {

    const dispatch = useDispatch<AppDispatch>();

    const stateData = useSelector((state: RootState) => state.mainReducer.registerForm);
    // const LASTSTATE = useSelector((state: RootState) => state.mainReducer.registerData);
    const actual = useSelector((state: RootState) => state.mainReducer.authUser);

    console.log(actual);
    // console.log(LASTSTATE);
    const theme = useTheme();
    const formik = useFormik({
        initialValues: { password: '', passwordConfirmation: '' },
        validationSchema: passwordValidationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            console.log(values);
            const newuuid = uuid.v4()
            console.log(newuuid);
            const dataRecovered = stateData.data
            const finalData = {
                ...dataRecovered,
                id: newuuid,
                password: values.password
            }


            try {
                const registerResponse = await dispatch(apiCallThunk({
                    base_url: API_ENDPOINTS.URL_BASE, endpoint: API_ENDPOINTS.REGISTER,
                    method: METOD_E.POST, data: finalData
                })).unwrap();

                console.log("respuesta al registro", registerResponse);

                dispatch(setAuthentication(true));
                dispatch(setAccessToken(registerResponse.token));


            } catch (error) {
                console.log(error);

            }
        },
    });
    //  styles ------------------------------------------------------- 
    const styles = style(theme)

    return (

        <AuthContainer>

            <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text>
            <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <View style={styles.content} >

                    <View style={styles.titleContariner}>
                        <AuthTitleText text='Create Password:' />
                    </View>

                    <View style={styles.titleContariner}>
                        <SmallText text='Please create a password for your accont.' />
                    </View>

                    <View style={styles.inputContainer}>
                        <Input
                            label='Password'
                            formik={formik}
                            name='password'
                            keyboardType='default'

                        />
                        <Input
                            label='Password confirmation'
                            formik={formik}
                            name='passwordConfirmation'
                            keyboardType='default'
                        />

                    </View>

                    <View style={styles.buttonContainer}>
                        <Button

                            label='Finish'
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

export default RegisterPasswordStep



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
        },
        dateOfBirthContainer: {
            flexDirection: "row",
            marginLeft: -6
        }

    })