import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../../../common/buttons/button';
import MainContainer from '../../../../common/containers/MainContainer';
import Input from '../../../../common/input/input';
import SmallText from '../../../../common/text/SmallText';
import GenderSelection from '../../../../components/PersonalData/GenderSelection';
import CommonDatePicker from '../../../../components/date/CommonDatePicker';
import { RootState, useAppDispatch } from '../../../../redux/store/store';
import UserData_I from '../../../../types/userDataInterface';
import { personalDataSchema } from '../../../../validations/yupSchemas/registerSchema';
// import { updateUser } from '../../../redux/slices/editUserDataSlice';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { updateUser } from '../../../../redux/actions/user.actions';
import { ProfileNavigationProps } from '../../../../types/NavigationParams/profileParams';


type editPersonalDataProp = NativeStackNavigationProp<ProfileNavigationProps, 'editPersonalData'>;

const initialValues = {
    name: '',
    lastname: '',
    dateOfBirth: '',
    gender: null,
    date: new Date()
}

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 12);


const EditPersonalData = () => {
    const { t } = useTranslation()

    const dispatch = useAppDispatch()
    const { loading, user: data } = useSelector((state: RootState) => state.user)
    const stateData = useSelector((state: RootState) => state.registerForm);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [date, setDate] = useState(maxDate);
    const [show, setShow] = useState(false);
    const [datePickerValues, setDatePickerValues] = useState({ day: "Day", month: "Month", year: "Year" });
    const [selectedGender, setSelectedGender] = useState<string>(null); // Estado para el género seleccionado
    console.log(data, 'niier----');
    const navigation = useNavigation<editPersonalDataProp>()

    // const stateData = useSelector((state: RootState) => state.registerData);



    // --------------------------------- max date validation
    const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'set') {  // Verificar si se realizó una selección
            setDate(selectedDate);

            // This will trigger the useEffect
            setShow(false);

            await formik.setFieldValue('dateOfBirth', selectedDate);

            const day = selectedDate.getDate().toString();
            const monthIndex = selectedDate.getMonth();
            const year = selectedDate.getFullYear().toString();
            const month = monthNames[monthIndex];

            const newDatePickerValues = { day, month, year };
            setDatePickerValues(newDatePickerValues);
        } else if (event.type === 'dismissed') {
            // Handle the case where the date picker is dismissed (e.g., user cancels the picker)
            setShow(false);
        }

    };





    const onSubmit = async (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {

        try {
            const hasChanges =
                values.name !== formik.initialValues.name ||
                values.lastname !== formik.initialValues.lastname ||
                values.dateOfBirth !== formik.initialValues.dateOfBirth ||
                values.gender !== formik.initialValues.gender;
            if (hasChanges) {

                const modifiedData: Partial<UserData_I> = {};
                if (values.name !== formik.initialValues.name) { modifiedData.name = values.name; }
                if (values.lastname !== formik.initialValues.lastname) { modifiedData.lastname = values.lastname; }
                if (values.dateOfBirth !== formik.initialValues.dateOfBirth) { modifiedData.dateOfBirth = values.dateOfBirth; }
                if (values.gender !== formik.initialValues.gender) {
                    modifiedData.gender = values.gender;
                }

                console.log('Modified data:', modifiedData);
                const response = await dispatch(updateUser(modifiedData))

                Alert.alert(
                    "Changes saved",
                    "Personal data has been updated",
                    [
                        { text: 'OK', onPress: () => navigation.navigate("editProfile") },
                    ],
                    { cancelable: false }
                );

                console.log("response to update data", response);

                // ConfirmationAlert("Changes saved","", ()=> navigation.navigate("editProfile"))
                // console.log(API_ENDPOINTS.URL_BASE+ API_ENDPOINTS.USER );
                // dispatch(updateUser(modifiedData))


            } else {
                // Si no hay cambios, puedes mostrar un mensaje o simplemente no hacer nada
                console.log('No changes made .');
            }

        } catch (error) {
            console.error('Error in onSubmit:', error);
            // También podrías agregar lógica para mostrar un mensaje de error en el componente
        } finally {
            setSubmitting(false);  // Asegúrate de llamar a setSubmitting(false) para indicar que la operación de envío ha terminado
        }
    }

    const theme = useTheme();
    const formik = useFormik({
        initialValues,
        validationSchema: personalDataSchema,
        onSubmit,
        enableReinitialize: true,
    });



    useEffect(() => {
        if (data) {
            const currentDate = new Date(moment(data.dateOfBirth).unix() * 1000)
            setDate(currentDate);
            formik.setValues({
                ...initialValues,
                name: data.name,
                lastname: data.lastname,
                gender: data.gender,
                dateOfBirth: currentDate.toISOString()
            })
            const day = currentDate.getDate().toString();
            const monthIndex = currentDate.getMonth();
            const year = currentDate.getFullYear().toString();
            const month = monthNames[monthIndex];

            const newDatePickerValues = { day, month, year };
            setDatePickerValues(newDatePickerValues);
            setSelectedGender(data.gender)

        }
    }, [])
    //  styles ------------------------------------------------------- 
    const styles = style(theme)
    return (


        <MainContainer >

            <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text>
            <View style={[styles.container]}>

                {/* 
                    <View style={styles.titleContariner}>
                        <AuthTitleText text='Personal data' />
                    </View> */}

                <View style={styles.inputContainer}>
                    <Input
                        label='Name'
                        formik={formik}
                        name='name'
                        keyboardType='default'
                    />
                    <Input
                        label='Lastname'
                        formik={formik}
                        name='lastname'
                        keyboardType='default'
                    />
                    <GenderSelection

                        selectedGender={selectedGender}
                        onGenderChange={(selection) => {

                            formik.setFieldValue('gender', selection, true);

                        }} />

                    <View style={styles.dateOfBirthContainer}>

                        <SmallText
                            fontWeight={"500"}
                            color={theme.colors.onSurface}
                            text={"Date of Birth"}
                        />
                        <SmallText
                            fontWeight={"400"}
                            color={theme.colors.onSurface}
                            text={"(12 years or older)"}
                        />
                    </View>
                    <CommonDatePicker
                        colorText={theme.colors.onSurface}
                        day={datePickerValues.day}
                        month={datePickerValues.month}
                        year={datePickerValues.year}
                        openCalendar={() => setShow(true)}
                    />


                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label='Update'
                        size='medium'
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty || loading}

                    />
                </View>

                {
                    show &&
                    <DateTimePicker
                        value={formik.values.date}
                        mode={'date'}
                        onChange={onChange}
                        display='spinner'
                        minimumDate={new Date(1920, 0, 1)}
                        maximumDate={maxDate}
                    />
                }

            </View>
        </MainContainer>
    )
}

export default EditPersonalData



const style = (theme: MD3Theme) => StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            verticalAlign: "center",
            paddingHorizontal: 35,
            backgroundColor: theme.colors.background
        }
        ,
        content: {
            backgroundColor: theme.colors.background,
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
            marginLeft: -6,
        }

    })