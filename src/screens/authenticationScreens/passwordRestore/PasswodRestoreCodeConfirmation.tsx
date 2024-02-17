import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { alarmError, alarmsuccess } from '../../../common/Alerts/showMessage';
import CustomButton from '../../../common/buttons/CustomButton';
import CustomCodeInput from '../../../common/input/CustomCodeInput';
import NumberPad from '../../../common/input/numberPad';
import MediumText from '../../../common/text/MediumText';
import SmallText from '../../../common/text/SmallText';
import SubtitleText from '../../../common/text/SubtitleText';
import CountdownTimer from '../../../common/timer/CountdownTimer';
import EmailConfirmationModal from '../../../components/Modals/EmailConfirmationModal';
import { generatePasswordUpdateOTPcode, passwordRestoreCodeValidation } from '../../../redux/actions/auth.actions';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import { AuthNavigationParams } from '../../../types/NavigationParams/AuthNavigationParams';


type PasswordUpdateCodeConfirmationProps = {
    onCancel: () => void;
    onConfirm: (code: string) => void;
};

type navigationProps = NativeStackNavigationProp<AuthNavigationParams, 'passwordRestoreCodeConfirmation'>;
type routeProps = RouteProp<AuthNavigationParams, 'passwordRestoreCodeConfirmation'>;


const PasswordRestoreCodeConfirmation: React.FC<PasswordUpdateCodeConfirmationProps> = ({
    onCancel,
    onConfirm,
}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const styles = style(theme);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<navigationProps>()

    const [startTimer, setStartTimer] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [digitsArray, setDigitsArray] = useState([]);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [verificationCodeStatus, setVerificationCodeStatus] = useState({});
    const [shouldClear, setShouldClear] = useState(() => () => false); // Inicialmente, retorna 'false'
    const [isError, setIsError] = useState(false); // Inicialmente, retorna 'false'
    const [isOtpGenerated, setIsOtpGenerated] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(true);

    const loading = useSelector((state: RootState) => state.multipleActions.loading)
    const route = useRoute<routeProps>();
    const { email } = route.params;

    const [emailStored, setEmailStores] = useState(email);




    // console.log("este es el email que se esta pasando por ruta al 1 componente ", emailStored);


    const handleStartButtonClick = () => {
        setStartTimer(true); // Iniciar o reiniciar la cuenta regresiva
        setIsTimerVisible(true);
        GetOTP()
    };



    const onSubmit = async (
        value: any) => {
        // Llamar a la función onConfirm con el código ingresado
        // setSubmitting(false);
        const otp = `${value.verificationCode}`

        const data = { verification_code: otp, email: email }

        dispatch(passwordRestoreCodeValidation(data)).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {

                console.log("Verification code resquest", response);

                setShouldClear(() => () => true); // Cambia a una función que retorna 'true'
                navigation.navigate("passwordRestoreFormAfter2FA", { email: email })

            }
            if (response.meta.requestStatus === "rejected") {
                handleClear()
            }

        })


    };


    const GetOTP = async () => {
        dispatch(generatePasswordUpdateOTPcode()).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
                alarmsuccess({
                    duration: 4000,
                    title: t("message.verification_code_sent"),
                });
            }
            if (response.meta.requestStatus === "rejected") {

                alarmError({
                    duration: 4000,
                    title: t("error.incorrect_expired_code"),
                });
            }

        })
    }


    const handleTimerEnd = () => {
        setStartTimer(false); // Detener la cuenta regresiva cuando llega a cero
        setIsTimerVisible(false); // Ocultar el temporizador cuando se detiene
    };
    const handleClear = () => {
        alarmError({
            duration: 4000,
            title: t("error.incorrect_expired_code"),
        });
        setShouldClear(() => () => true); // Cambia a una función que retorna 'true'
    };



    const onConfirmModal = async () => {
        // navigation.navigate("passwordUpdateCodeConfirmation");
        setShowPasswordModal(false)
        // setIsOtpGenerated(!isOtpGenerated)
        setIsTimerVisible(true)
        GetOTP()
    }


    useEffect(() => {
        if (isValid) {
            const verificationCode = Number(digitsArray.join(''));
            setVerificationCodeStatus({ verificationCode: verificationCode });
        }
    }, [isValid, digitsArray]);


    // useEffect(() => {
    //     GetOTP()
    // }, [isOtpGenerated]);

    const digitsListHandler = (list: number[]) => {
        setDigitsArray(list);
        if (!startTimer) {
            setStartTimer(true);
        }
        if (list.length < 6) {
            setIsValid(false);
        } else {
            setIsValid(true);

        }
    };


    return (
        <View style={[styles.container, { backgroundColor: theme.colors.onSecondary }]}>
            {/* <LoadingModal isVisible={true} text='Sending code...' /> */}
            {/* <Text style={{ color: 'black' }}>{JSON.stringify(formik.errors)}</Text>
            <Text style={{ color: 'black' }}>{JSON.stringify(formik.values)}</Text> */}
            <View style={styles.content}>

                <EmailConfirmationModal isVisible={showPasswordModal} message={t("message.change_email_message")} onCancel={() => { navigation.goBack(), setShowPasswordModal(false) }} onConfirm={() => { onConfirmModal() }} />
                <View style={styles.titleContainer}>
                    <SubtitleText text={t("label.verification_code")} />
                </View>



                <View style={styles.inputContainer}>
                    <MediumText color={theme.colors.onPrimary} text={t("label.enter_verification_code")} />
                </View>

                {/* {true && <SmallText color={theme.colors.error} text={t("label.enter_verification_code")} />} */}
                <View style={styles.inputContainer}>
                    <CustomCodeInput codeArray={digitsArray} />
                </View>

                <NumberPad clear={shouldClear} digitList={(list: []) => { digitsListHandler(list) }} />


                <View style={styles.buttonContainer}>
                    <CustomButton
                        label={t("actions.confirm")}
                        size="large"
                        onPress={() => onSubmit(verificationCodeStatus)}
                        disabled={!isValid}
                        color='secondary'
                        textColor={theme.colors.primary}
                    />
                </View>

                <Button title='borrar' onPress={() => navigation.navigate("passwordRestoreFormAfter2FA")} />

                <View style={styles.inputContainer}>
                    <SmallText text={t('label.no_code_received')} />

                    {isTimerVisible ?
                        <View style={styles.countdown}>
                            <SmallText text={t('actions.resend_in')} color={theme.colors.secondary} fontWeight="bold" />
                            <CountdownTimer onTimerEnd={() => handleTimerEnd()} start={startTimer} />
                        </View>
                        :
                        <TouchableOpacity onPress={() => handleStartButtonClick()}>
                            <SmallText underline text={t('actions.resend')} color={theme.colors.secondary} fontWeight="bold" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
};

export default PasswordRestoreCodeConfirmation;

const style = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            backgroundColor: theme.colors.onSecondary,
            width: "70%",
        },
        buttonContainer: {
        },
        inputContainer: {
            marginTop: 10,
            marginBottom: 25,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",

            gap: 8,
        },
        titleText: {
            color: 'black',
            marginRight: 8,
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            justifyContent: "center"
        },
        countdown: {
            flexDirection: 'row',

        },
        forgotPasswordText: {
            color: theme.colors.onBackground,
        },
    });
