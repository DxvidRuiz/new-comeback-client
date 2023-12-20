// EditProfileScreen

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MD3Theme, useTheme } from 'react-native-paper';
import AuthContainer from '../../../common/containers/AuthContainer';
import { Formik, useFormik } from 'formik';
import AuthTitleText from '../../../common/text/AuthTitleText';
import Input from '../../../common/input/input';
import Button from '../../../common/buttons/button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Avatar } from 'react-native-paper';
import CommonDatePicker from '../../../components/date/CommonDatePicker';
import { personalDataSchema } from '../../..//validations/yupSchemas/registerSchema';
import SmallText from '../../../common/text/SmallText';
import { setPersonalData } from '../../../redux/slices/registerFormSlice';
import GenderSelection from '../../../components/PersonalData/GenderSelection';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../types/types';
import { useNavigation } from '@react-navigation/native';
import MediumText from '../../../common/text/MediumText';
import MainContainer from '../../../common/containers/MainContainer';
import TouchableList from '../../../common/list/TouchableList';
import ListButton from '../../../common/buttons/ListButton';
import { AntDesign } from '@expo/vector-icons';



type AuthNavigationProp = NativeStackNavigationProp<RootStackParams, 'editProfile'>;


const EditProfileScreen = () => {

    const { loading, user: data } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    const stateData = useSelector((state: RootState) => state.registerForm);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [datePickerValues, setDatePickerValues] = useState({ day: "Day", month: "Month", year: "Year" });

    const navigation = useNavigation<AuthNavigationProp>()


    // const stateData = useSelector((state: RootState) => state.registerData);

    // --------------------------------- max date validation
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 12); // Resta 12 años

    const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {


    };
    useEffect(() => {


    }, []);


    console.log(stateData);

    const theme = useTheme();
    const formik = useFormik({
        initialValues: { name: '', lastname: '', dateOfBirth: "", gender: null },
        validationSchema: personalDataSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                // console.log(stateData);

                dispatch(setPersonalData({ name: values.name.trim(), lastname: values.lastname.trim(), dateOfBirth: values.dateOfBirth, gender: values.gender.trim() }));
                navigation.navigate("registerUserData")
            } catch (error) {

                throw new Error("message:", error)
            }
        },
    });
    //  styles ------------------------------------------------------- 
    const styles = style(theme)

    return (

        <MainContainer>

            <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text>
            <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.content} >

                    <View style={styles.mainAvatarContariner}>

                        <View style={styles.avatarContariner}>
                            <Avatar.Image size={120} source={require('../../../../assets/Profile/Duaprofile.jpeg')} style={styles.profilePhoto} />
                        </View>

                        <View style={styles.nameContariner}>
                            <MediumText text={`${data.name} ${data.lastname}`} fontWeight="900" />
                            <Button
                                type='outlined'
                                textColor={theme.colors.onPrimary}
                                label='Edit photo'
                                size='small'
                                onPress={() => { }}
                                color="clear"
                                disabled={formik.isSubmitting || !formik.isValid}

                            />
                        </View>
                    </View>


                    <View style={styles.inputContainer}>

                        <ListButton onPress={() => { navigation.navigate("editPersonalData") }} text='Personal data' rightIcon={<AntDesign name="right" size={24} color={theme.colors.onSurface} />} />
                        <ListButton onPress={() => { navigation.navigate("editProfileData") }} text='Profile data' rightIcon={<AntDesign name="right" size={24} color={theme.colors.onSurface} />} />
                        <ListButton onPress={() => { navigation.navigate("editAuthData") }} text='Auth data' rightIcon={<AntDesign name="right" size={24} color={theme.colors.onSurface} />} />

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
            </ScrollView>
        </MainContainer>
    )
}

export default EditProfileScreen


const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // verticalAlign: "center", 
    },

    content: {
        paddingHorizontal: 30

    },
    buttonContainer: {
        marginVertical: 10,
    },
    inputContainer: {
        marginVertical: "2%",
        gap: 8,
    },
    titleContariner: {
        flexDirection: "row",
        marginVertical: 20,
    },
    mainAvatarContariner: {
        flexDirection: "row",
        elevation: 1
        , padding: 10
        // marginVertical: 10,
        // justifyContent: "space-between",


    },
    avatarContariner: {
        flexDirection: "row",
        flex: 1

    },
    nameContariner: {
        justifyContent: "space-evenly",
        flex: 1

    },
    dateOfBirthContainer: {
        flexDirection: "row",
        marginLeft: -6,
    },
    profilePhoto: {
        elevation: 5
    },
});
