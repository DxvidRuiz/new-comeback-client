// EditProfileScreen

import { AntDesign } from '@expo/vector-icons';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListButton from '../../../../common/buttons/ListButton';
import Button from '../../../../common/buttons/button';
import MainContainer from '../../../../common/containers/MainContainer';
import MediumText from '../../../../common/text/MediumText';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { ProfileNavigationProps } from '../../../../types/NavigationParams/profileParams';
import { personalDataSchema } from '../../../../validations/yupSchemas/registerSchema';



type EditProfileNavigationProp = NativeStackNavigationProp<ProfileNavigationProps, 'editProfile'>;


const EditProfileScreen = () => {
    const { t } = useTranslation()
    const navigation = useNavigation<EditProfileNavigationProp>()

    const { loading, user: data } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    const stateData = useSelector((state: RootState) => state.registerForm);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);



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

                // dispatch(setPersonalData({ name: values.name.trim(), lastname: values.lastname.trim(), dateOfBirth: values.dateOfBirth, gender: values.gender.trim() }));
                // navigation.navigate("registerUserData")
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
                            <Avatar.Image size={120} source={require('../../../../../assets/Profile/Duaprofile.jpeg')} style={styles.profilePhoto} />
                        </View>

                        <View style={styles.nameContariner}>
                            <MediumText text={data && `${data.name} ${data.lastname}`} fontWeight="900" />
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

                        <ListButton onPress={() => { navigation.navigate("editPersonalData") }} text={t("label.personal_information")} rightIcon={<AntDesign name="right" size={24} color={theme.colors.onSurface} />} />
                        <ListButton onPress={() => { navigation.navigate("editPassword") }} text={t("label.profile_information")} rightIcon={<AntDesign name="right" size={24} color={theme.colors.onSurface} />} />
                        <ListButton onPress={() => { navigation.navigate("editAuthData") }} text={t("label.password_security")} rightIcon={<AntDesign name="right" size={24} color={theme.colors.onSurface} />} />

                    </View>


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
