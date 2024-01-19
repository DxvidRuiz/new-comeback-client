import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../../../../common/buttons/CustomButton';
import FormContainer from '../../../../../common/containers/FormContainer';
import Input from '../../../../../common/input/input';
import AuthTitleText from '../../../../../common/text/AuthTitleText';
import SmallText from '../../../../../common/text/SmallText';
import EmailConfirmationModal from '../../../../../components/Modals/EmailConfirmationModal';
import { updatePassword } from '../../../../../redux/actions/auth.actions';
import { RootState, useAppDispatch } from '../../../../../redux/store/store';
import { passwordUpdateValidationSchema } from '../../../../../validations/yupSchemas/passwordUpdateSchema';

const initialValues = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
};

const PasswordUpdateForm = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation()

    const theme = useTheme();
    const styles = style(theme);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const loading = useSelector((state: RootState) => state.multipleActions.loading)


    const onSubmit = async (
        values: typeof initialValues,
        { setSubmitting, setFieldError }: FormikHelpers<typeof initialValues>
    ) => {

        const data = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        };

        try {
            // Despacha la acción de actualización de contraseña
            const actionResult = await dispatch(updatePassword(data));

            console.log(actionResult);

            // Manejar la respuesta del servidor directamente en el extraReducers
            if (updatePassword.fulfilled.match(actionResult)) {

                console.log("respuesta exitosa");


                // Lógica después de una actualización exitosa
            } else if (updatePassword.rejected.match(actionResult)) {
                const data = actionResult.error.message as any;


                if (!data.response) {
                    setFieldError('submitError', 'Network error: Please check your internet connection and try again.');
                } else {
                    const errorMessage = data.message || 'An unexpected error occurred';
                    setFieldError('submitError', errorMessage);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    const formik = useFormik({
        initialValues,
        validationSchema: passwordUpdateValidationSchema,
        onSubmit
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
                        <Input
                            label={t("label.current_password")}
                            formik={formik}
                            name="currentPassword"
                            secureTextEntry
                        />
                        <Input
                            label={t("label.new_password")}
                            formik={formik}
                            name="newPassword"
                            secureTextEntry
                        />
                        <Input
                            label={t("label.confirm_password")}
                            formik={formik}
                            name="newPasswordConfirmation"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label={t("actions.update")}
                            size="medium"
                            loading={loading}
                            onPress={formik.handleSubmit}
                            disabled={formik.isSubmitting || !formik.isValid}
                        />
                    </View>

                    <View style={styles.forgotPasswordContainer}>

                        <TouchableOpacity onPress={() =>
                            setShowPasswordModal(true)
                            // successAlarm({
                            //     message: "test",
                            //     type: "danger",
                            //     duration: 8000
                            // })

                        }>

                            <SmallText text={t("label.forgot_password")} />
                        </TouchableOpacity>

                        <EmailConfirmationModal currentEmail='eeee' isVisible={showPasswordModal} onCancel={() => setShowPasswordModal(false)} onConfirm={() => { }} />
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
        }
    });
