import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { alarmError, alarmsuccess } from '../../../../../common/Alerts/showMessage';
import CustomButton from '../../../../../common/buttons/CustomButton';
import CustomCodeInput from '../../../../../common/input/CustomCodeInput';
import NumberPad from '../../../../../common/input/numberPad';
import MediumText from '../../../../../common/text/MediumText';
import SmallText from '../../../../../common/text/SmallText';
import SubtitleText from '../../../../../common/text/SubtitleText';
import CountdownTimer from '../../../../../common/timer/CountdownTimer';
import { generatePasswordUpdateOTPcode } from '../../../../../redux/actions/auth.actions';
import { useAppDispatch } from '../../../../../redux/store/store';
import { ProfileNavigationProps } from '../../../../../types/NavigationParams/profileParams';

const initialValues = {
    confirmationCode: null,
};

type PasswordUpdateCodeConfirmationProps = {
    onCancel: () => void;
    onConfirm: (code: string) => void;
};

type editProfileataProp = NativeStackNavigationProp<ProfileNavigationProps, 'passwordUpdateCodeConfirmation'>;


const PasswordUpdateCodeConfirmation: React.FC<PasswordUpdateCodeConfirmationProps> = ({
    onCancel,
    onConfirm,
}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const styles = style(theme);
    const dispatch = useAppDispatch();

    const [startTimer, setStartTimer] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [digitsArray, setDigitsArray] = useState([]);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [verificationCodeStatus, setVerificationCodeStatus] = useState({});
    const [shouldClear, setShouldClear] = useState(() => () => false); // Inicialmente, retorna 'false'
    const [isError, setIsError] = useState(false); // Inicialmente, retorna 'false'



    const handleStartButtonClick = () => {
        setStartTimer(true); // Iniciar o reiniciar la cuenta regresiva
        setIsTimerVisible(true);
    };

    const onSubmit = async (
        value: any) => {
        // Llamar a la función onConfirm con el código ingresado
        // setSubmitting(false);

        console.log("valor listo para enviar", value);



    };
    const GetOTP = async () => {


        dispatch(generatePasswordUpdateOTPcode()).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
                alarmsuccess({
                    duration: 4000,
                    title: "Codigo enviado",
                });
            }
            if (response.meta.requestStatus === "rejected") {


            }

        })



        // handleStartButtonClick()

    }


    const handleTimerEnd = () => {
        console.log('¡La cuenta regresiva ha llegado a cero!');
        // setStartTimer(false); // Detener la cuenta regresiva cuando llega a cero
        setIsTimerVisible(false); // Ocultar el temporizador cuando se detiene
    };
    const handleClear = () => {
        alarmError({
            duration: 4000,
            title: "Passcode erronea",
        });
        setShouldClear(() => () => true); // Cambia a una función que retorna 'true'
    };


    useEffect(() => {
        if (startTimer) {
            // GetOTP();
        }
    }, [startTimer]);



    useEffect(() => {
        if (isValid) {
            const verificationCode = Number(digitsArray.join(''));
            setVerificationCodeStatus({ verificationCode: verificationCode });
        }
    }, [isValid, digitsArray]);

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

                <Button title='borrar' onPress={() => handleClear()} />

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

export default PasswordUpdateCodeConfirmation;

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
