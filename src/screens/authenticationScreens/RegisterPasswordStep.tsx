import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import Button from '../../common/buttons/button';
import AuthContainer from '../../common/containers/AuthContainer';
import Input from '../../common/input/input';
import AuthTitleText from '../../common/text/AuthTitleText';
import SmallText from '../../common/text/SmallText';
import { registerUser } from '../../redux/actions/user.actions';
import { setAuthentication } from '../../redux/slices/authSlice';
import { refreshUser } from '../../redux/slices/userSlice';
import { RootState, useAppDispatch } from '../../redux/store/store';
import { passwordValidationSchema } from '../../validations/yupSchemas/registerSchema';

const initialValues = { password: '', passwordConfirmation: '' }

const RegisterPasswordStep = () => {

    const dispatch = useAppDispatch();

    const stateData = useSelector((state: RootState) => state.registerForm);
    // const LASTSTATE = useSelector((state: RootState) => state.registerData);









    const onSubmit = async (values: typeof initialValues, { setSubmitting, setFieldError }: FormikHelpers<typeof initialValues>) => {
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
            dispatch(registerUser(finalData)).then(response => {
                if (response.meta.requestStatus === 'fulfilled') {
                    dispatch(refreshUser(response.payload))
                    dispatch(setAuthentication(true))
                }
                if (response.meta.requestStatus == 'rejected') {
                    const data = response.payload as any;
                    if (!data.response) {
                        setFieldError('submitError', 'Network error: Please check your internet connection and try again.');
                    } else {
                        const errorMessage = data.message || 'An unexpected error occurred';
                        setFieldError('submitError', errorMessage);
                    }
                }
            })


        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: passwordValidationSchema,
        onSubmit
    });
    //  styles ------------------------------------------------------- 
    const theme = useTheme();
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