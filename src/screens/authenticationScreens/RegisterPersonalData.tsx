import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../common/buttons/button';
import AuthContainer from '../../common/containers/AuthContainer';
import Input from '../../common/input/input';
import AuthTitleText from '../../common/text/AuthTitleText';
import { RootState, useAppDispatch } from '../../redux/store/store';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SmallText from '../../common/text/SmallText';
import GenderSelection from '../../components/PersonalData/GenderSelection';
import CommonDatePicker from '../../components/date/CommonDatePicker';
import { setPersonalData } from '../../redux/slices/registerFormSlice';
import { RootStackParams } from '../../types/types';
import { personalDataSchema } from '../../validations/yupSchemas/registerSchema';



type AuthNavigationProp = NativeStackNavigationProp<RootStackParams, 'registerPersonalData'>;


const RegisterPersonalData = () => {
  const dispatch = useAppDispatch();
  const stateData = useSelector((state: RootState) => state.registerForm);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [datePickerValues, setDatePickerValues] = useState({ day: "Day", month: "Month", year: "Year" });

  const navigation = useNavigation<AuthNavigationProp>()

  // const stateData = useSelector((state: RootState) => state.registerData);

  // --------------------------------- max date validation
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12); // Resta 12 años

  const initialValues = { name: '', lastname: '', dateOfBirth: "", gender: null }




  const onSubmit = async (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
    try {
      dispatch(setPersonalData({ name: values.name.trim(), lastname: values.lastname.trim(), dateOfBirth: values.dateOfBirth, gender: values.gender.trim() }));
      navigation.navigate("registerUserData")
    } catch (error) {

      throw new Error("message:", error)
    }

  }
  const theme = useTheme();
  const formik = useFormik({
    initialValues,
    validationSchema: personalDataSchema,
    onSubmit
  });
  const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {

    if (event) {
      setDate(selectedDate);

      // This will trigger the useEffect
      setShow(false);
      const dateString = date.toISOString();
      await formik.setFieldValue('dateOfBirth', dateString, true);

      const day = selectedDate.getDate().toString();
      const monthIndex = selectedDate.getMonth();
      const year = selectedDate.getFullYear().toString();
      const month = monthNames[monthIndex];

      const newDatePickerValues = { day, month, year };
      setDatePickerValues(newDatePickerValues);

    } else {
      // Handle the case where there is no date selected (e.g., user cancels the picker)
      setShow(false);
    }
  };

  //  styles ------------------------------------------------------- 
  const styles = style(theme)

  return (

    <AuthContainer>

      <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text>
      <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.content} >

          <View style={styles.titleContariner}>
            <AuthTitleText text='Create new account' />
          </View>

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


            <GenderSelection onGenderChange={(selection) => {
              formik.setFieldValue('gender', selection, true);

            }} />



            <View style={styles.dateOfBirthContainer}>

              <SmallText fontWeight={"500"} color={theme.colors.onTertiary} text={"Date of Birth"} />
              <SmallText fontWeight={"400"} color={theme.colors.onTertiary} text={"(12 years or older)"} />
            </View>

            <CommonDatePicker colorText={theme.colors.onSurface} day={datePickerValues.day} month={datePickerValues.month} year={datePickerValues.year} openCalendar={() => setShow(true)} />

          </View>

          <View style={styles.buttonContainer}>
            <Button

              label='Continue'
              size='medium'
              onPress={formik.handleSubmit}
              disabled={formik.isSubmitting || !formik.isValid}

            />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={onChange}
              display='spinner'
              minimumDate={new Date(1920, 0, 1)}
              maximumDate={maxDate}
            />
          )}

        </View>
      </View>
    </AuthContainer>
  )
}

export default RegisterPersonalData



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