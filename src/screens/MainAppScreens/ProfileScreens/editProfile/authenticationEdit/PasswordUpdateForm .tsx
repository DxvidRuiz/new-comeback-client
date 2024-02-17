import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { alarmError, alarmsuccess } from '../../../../../common/Alerts/showMessage';
import Button from '../../../../../common/buttons/CustomButton';
import FormContainer from '../../../../../common/containers/FormContainer';
import Input from '../../../../../common/input/input';
import AuthTitleText from '../../../../../common/text/AuthTitleText';
import SmallText from '../../../../../common/text/SmallText';
import { updatePassword } from '../../../../../redux/actions/auth.actions';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { ProfileNavigationProps } from '../../../../../types/NavigationParams/profileParams';
import { passwordUpdateValidationSchema } from '../../../../../validations/yupSchemas/passwordUpdateSchema';

const initialValues = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
};

type editProfileataProp = NativeStackNavigationProp<ProfileNavigationProps, 'passwordUpdateForm'>;


const PasswordUpdateForm = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation()
    const navigation = useNavigation<editProfileataProp>()
    const theme = useTheme();
    const styles = style(theme);

    const loading = useSelector((state: RootState) => state.multipleActions.loading)
    const [passwordVisibility, setPasswordVisibility] = useState(false);


    const onSubmit = (
        values: typeof initialValues,
        { setSubmitting, setFieldError, setFieldValue }: FormikHelpers<typeof initialValues>
    ) => {
        const data = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        };

        dispatch(updatePassword(data))
            .then((actionResult) => {
                if (actionResult.meta.requestStatus === "fulfilled") {

                    alarmsuccess({
                        duration: 5000,
                        title: t("message.password_change")
                    });

                    navigation.navigate("editAuthData");

                    // Lógica después de una actualización exitosa...
                } else if (actionResult.meta.requestStatus === "rejected") {
                    const errorPayload = actionResult.payload as any;
                    const errorCode = errorPayload?.message?.status;

                    if (errorCode === 401) {
                        // Contraseña actual incorrecta

                        setFieldError("currentPassword", t("error.current_password_incorrect"))
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
                            title: "Error en red",
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error general:", error);

                // setSubmitting(false)
                // alarmError({
                //     duration: 5000,
                //     title: t("error.password_update_password"),
                // });
            });

    };


    const formik = useFormik({
        initialValues,
        validationSchema: passwordUpdateValidationSchema,
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

                    <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)} style={styles.passwordVisibility}>
                        {passwordVisibility ?
                            <MaterialIcons name='remove-red-eye' color={theme.colors.onPrimary} size={24} /> :
                            <MaterialCommunityIcons name="eye-off" size={24} color="black" />
                        }
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Input
                            label={t("label.current_password")}
                            formik={formik}
                            name="currentPassword"
                            secureTextEntry={passwordVisibility}
                        />
                        <Input
                            label={t("label.new_password")}
                            formik={formik}
                            name="newPassword"
                            secureTextEntry={passwordVisibility}
                        />
                        <Input
                            label={t("label.confirm_password")}
                            formik={formik}
                            name="newPasswordConfirmation"
                            secureTextEntry={passwordVisibility}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label={t("actions.update")}
                            size="medium"
                            loading={loading}
                            onPress={formik.handleSubmit}
                            disabled={formik.isSubmitting || !formik.touched || !formik.isValid}
                            color='secondary'
                            textColor={theme.colors.primary}
                        />
                    </View>

                    <View style={styles.forgotPasswordContainer}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate("passwordUpdateCodeConfirmation")
                            // alarmError({
                            //     duration: 8000,
                            //     title: t("message.password_change"),
                            // })

                        }>

                            <SmallText text={t("label.forgot_password")} />
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        </FormContainer>
    );
};

export default PasswordUpdateForm;

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

            // Estilo específico para el texto "hhh"
            color: 'white', // Puedes ajustar el color según sea necesario
            marginRight: 8, // Espacio entre el texto y los campos de entrada
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
