import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { alarmError, alarmsuccess } from '../../../common/Alerts/showMessage';
import CustomButton from '../../../common/buttons/CustomButton';
import FormContainer from '../../../common/containers/FormContainer';
import Input from '../../../common/input/input';
import AuthTitleText from '../../../common/text/AuthTitleText';
import SmallText from '../../../common/text/SmallText';
import { restorePasswordAfter2FA } from '../../../redux/actions/auth.actions';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import { AuthNavigationParams } from '../../../types/NavigationParams/AuthNavigationParams';
import { passwordUpdateSchema } from '../../../validations/yupSchemas/passwordUpdateSchema';
const initialValues = {
    password: '',
    passwordConfirmation: ''
};

type navigationProps = NativeStackNavigationProp<AuthNavigationParams, 'passwordRestoreFormAfter2FA'>;
type routeProps = RouteProp<AuthNavigationParams, 'passwordRestoreFormAfter2FA'>;



const PasswordRestoreFormAfter2FA = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation()
    const navigation = useNavigation<navigationProps>()
    const theme = useTheme();
    const styles = style(theme);

    const loading = useSelector((state: RootState) => state.multipleActions.loading)
    const route = useRoute<routeProps>();

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const { email } = route.params;
    const [emailStored, setEmailStores] = useState(email);




    const onSubmit = (
        values: typeof initialValues,
        { setSubmitting, setFieldError, setFieldValue }: FormikHelpers<typeof initialValues>
    ) => {
        const data = {
            password: values.password,
            email: emailStored
        };

        dispatch(restorePasswordAfter2FA(data))
            .then((actionResult) => {
                if (actionResult.meta.requestStatus === "fulfilled") {
                    console.log("succesfull response");
                    alarmsuccess({
                        duration: 5000,
                        title: t("message.password_change")
                    });

                    navigation.navigate("login");

                    // Lógica después de una actualización exitosa...
                } if (actionResult.meta.requestStatus === "rejected") {
                    const errorPayload = actionResult.payload as any;
                    const errorCode = errorPayload?.message?.status;


                    if (errorCode === 400) {
                        // Contraseña actual incorrecta

                        setFieldError("password", t("error.password_must_be_different"))
                        setSubmitting(false)
                        console.log(t("error.current_password_incorrect"));
                        // También puedes establecer un error de campo específico si es necesario
                        // setFieldError('currentPassword', 'Current password is incorrect');
                    } else if (errorPayload) {
                        // Error en la respuesta con código de estado definido
                        alarmError({
                            duration: 5000,
                            title: t("error.password_update_error"),
                        });

                        setSubmitting(false)

                        const errorMessage = errorPayload?.message?.status || 'An unexpected error occurred';
                        // setFieldError('submitError', errorMessage);
                    } else {
                        // Error en la red
                        alarmError({
                            duration: 5000,
                            title: t("error.network_error"),
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error general:", error);

                setSubmitting(false)
                // alarmError({
                //     duration: 5000,
                //     title: t("error.password_update_password"),
                // });
            });

    };
    const formik = useFormik({
        initialValues,
        validationSchema: passwordUpdateSchema,
        onSubmit,
        enableReinitialize: true,
        validateOnBlur: true
    });



    return (

        <FormContainer>
            <View style={[styles.container, { backgroundColor: theme.colors.onSecondary }]}>
                <Text style={{ color: 'white' }}>{JSON.stringify(formik.errors)}</Text>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <AuthTitleText text={t("label.update_password")} />
                    </View>

                    <View style={styles.titleContainer}>
                        <SmallText text={t("label.update_password_subtitle")} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)} style={styles.passwordVisibility}>
                            {passwordVisibility ?
                                <MaterialIcons name='remove-red-eye' color={theme.colors.onPrimary} size={24} /> :
                                <MaterialCommunityIcons name="eye-off" size={24} color="black" />
                            }
                        </TouchableOpacity>

                        <Input
                            label={t("label.new_password")}
                            formik={formik}
                            name="password"
                            secureTextEntry={passwordVisibility}
                        />
                        <Input
                            label={t("label.confirm_password")}
                            formik={formik}
                            name="passwordConfirmation"
                            secureTextEntry={passwordVisibility}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <CustomButton
                            label={t("actions.update")}
                            size="medium"
                            loading={loading}
                            onPress={formik.handleSubmit}
                            disabled={formik.isSubmitting || !formik.touched || !formik.isValid}
                            color='secondary'
                            textColor={theme.colors.primary}
                        />
                    </View>
                </View>
            </View>
        </FormContainer>
    );
};

export default PasswordRestoreFormAfter2FA;

const style = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            backgroundColor: theme.colors.onSecondary,
            width: "70%"


        },
        buttonContainer: {
            marginVertical: '10%'
        },
        inputContainer: {
            marginVertical: '2%',
            gap: 8
        },
        titleText: {

            color: 'white',
            marginRight: 8,
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
        },
        forgotPasswordContainer: {
            marginVertical: 16,
            alignItems: 'center'
        },
        forgotPasswordText: {
            color: theme.colors.onBackground
        },
        passwordVisibility: {
            alignItems: "flex-end",


        }
    });
