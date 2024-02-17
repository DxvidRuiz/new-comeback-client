import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { alarmError } from '../../../common/Alerts/showMessage';
import CustomButton from '../../../common/buttons/CustomButton';
import FormContainer from '../../../common/containers/FormContainer';
import Input from '../../../common/input/input';
import AuthTitleText from '../../../common/text/AuthTitleText';
import SmallText from '../../../common/text/SmallText';
import { findUserByEmail } from '../../../redux/actions/user.actions';
import { useAppDispatch } from '../../../redux/store/store';
import { AuthNavigationParams } from '../../../types/NavigationParams/AuthNavigationParams';
import { emailSchema } from '../../../validations/yupSchemas/passwordUpdateSchema';

const initialValues = {
    email: '',

};

type passwordRestoreEmailProp = NativeStackNavigationProp<AuthNavigationParams, 'passwordRestoreEmail'>;


const PasswordRestoreEmail = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation()
    const navigation = useNavigation<passwordRestoreEmailProp>()
    const theme = useTheme();
    const styles = style(theme);
    // const [emailParam, setEmailParam] = useState({});

    // const loading = useSelector((state: RootState) => state.multipleActions.loading)


    const onSubmit = (
        values: typeof initialValues,
        { setSubmitting, setFieldError, setFieldValue }: FormikHelpers<typeof initialValues>
    ) => {
        const data = {
            email: values.email,
        };

        // setEmailParam(data)





        dispatch(findUserByEmail(data))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    setSubmitting(false)


                    navigation.navigate("passwordRestoreCodeConfirmation", { email: data.email })


                    // Lógica después de una actualización exitosa...
                } else if (result.meta.requestStatus === "rejected") {
                    const errorPayload = result.payload as any;
                    const errorCode = errorPayload?.message?.status;


                    console.log("error ", errorCode);
                    if (errorCode === 404) {
                        // Usuario no encontrado
                        setFieldError("email", t("error.user_not_found"))
                        setSubmitting(false)
                        console.log(t("error.user_not_found"));
                        // También puedes establecer un error de campo específico si es necesario
                        // setFieldError('currentPassword', 'Current password is incorrect');
                    } else if (errorPayload) {
                        alarmError({
                            duration: 5000,
                            title: t("error.error_searching_user"),
                        });
                        setSubmitting(false)

                        // const errorMessage = errorPayload?.message?.status || 'An unexpected error occurred';
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
        validationSchema: emailSchema,
        onSubmit,
        enableReinitialize: true,
        validateOnBlur: true


    });

    return (

        <FormContainer>
            <View style={[styles.container, { backgroundColor: theme.colors.onSecondary }]}>
                {/* <Text style={{ color: 'white' }}>{JSON.stringify(formik.errors)}</Text> */}
                <View style={styles.content}>

                    <View>

                        <View style={styles.titleContainer}>
                            <AuthTitleText text={t("label.restore_password")} />
                        </View>

                        <View style={styles.titleContainer}>
                            <SmallText text={t("label.enter_associated_email")} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>

                        <Input
                            label={t("label.email")}
                            formik={formik}
                            name='email'
                            keyboardType='email-address'
                        />

                    </View>



                    <View style={styles.buttonContainer}>
                        <CustomButton
                            label={t("action.send")}
                            size="medium"
                            // loading={loading}
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

export default PasswordRestoreEmail;

const style = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        content: {
            backgroundColor: theme.colors.onSecondary,
            justifyContent: "space-around",
            width: '70%',
            height: "100%"

        },
        buttonContainer: {
            // marginTop: "50%",
            // marginBottom: "10%",
            marginVertical: '10%',

        },
        inputContainer: {
            marginVertical: '2%',
            gap: 8,
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
        },
        titleText: {
            color: 'white',
            marginRight: 8,
        },
        passwordVisibility: {
            alignItems: 'flex-end',
        },
    });
