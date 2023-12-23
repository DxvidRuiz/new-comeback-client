// EditProfileScreen

import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListButton from '../../../../common/buttons/ListButton';
import MainContainer from '../../../../common/containers/MainContainer';
import { setPersonalData } from '../../../../redux/slices/registerFormSlice';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { ProfileNavigationProps } from '../../../../types/NavigationParams/profileParams';
import { personalDataSchema } from '../../../../validations/yupSchemas/registerSchema';



type EditAuthDataNavigationProp = NativeStackNavigationProp<ProfileNavigationProps, 'editAuthData'>;


const EditAuthData = () => {

    const { t } = useTranslation()
    const { loading, user: data } = useSelector((state: RootState) => state.user)
    const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const stateData = useSelector((state: RootState) => state.registerForm);
    const [show, setShow] = useState(false);

    const navigation = useNavigation<EditAuthDataNavigationProp>()


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
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.content} >
                    <View style={styles.inputContainer}>
                        <ListButton
                            onPress={() => navigation.navigate("editProfile")
                            }
                            text={t("label.email")}
                            rightIcon={<Text style={[styles.icono, { marginRight: 15 }]}>{t("label.change")}</Text>} />
                        <ListButton
                            onPress={() => navigation.navigate("editPassword")}
                            text={t("label.password")}
                            rightIcon={<Text style={[styles.icono, { marginRight: 15 }]}>{t("label.change")}</Text>} />
                    </View>
                </View>
            </View>
        </MainContainer>
    )
}

export default EditAuthData


const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        verticalAlign: "center",
    },

    content: {
        paddingHorizontal: 30

    }, icono: {
        justifyContent: 'flex-end',
        color: theme.colors.secondary
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
