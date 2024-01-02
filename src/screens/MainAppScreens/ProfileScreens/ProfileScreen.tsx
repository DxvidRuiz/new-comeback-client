// EditProfileScreen
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../common/buttons/button';
import MainContainer from '../../../common/containers/MainContainer';
import MediumText from '../../../common/text/MediumText';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { ProfileNavigationProps } from '../../../types/NavigationParams/profileParams';




const ProfileScreen = () => {
    type ProfileNavigationProp = NativeStackNavigationProp<ProfileNavigationProps, 'profileData'>;
    const { loading, user: data } = useSelector((state: RootState) => state.user)
    const { t } = useTranslation()


    const dispatch = useDispatch<AppDispatch>();
    const stateData = useSelector((state: RootState) => state.registerForm);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const navigation = useNavigation<ProfileNavigationProp>()



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

    const styles = style(theme)

    return (

        <MainContainer>

            {/* <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text> */}
            <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.content} >

                    <View style={styles.mainAvatarContariner}>

                        <View style={styles.avatarContariner}>
                            <Avatar.Image size={120} source={require('../../../../assets/Profile/Duaprofile.jpeg')} style={styles.profilePhoto} />
                        </View>

                        <View style={styles.nameContariner}>
                            <MediumText text={data && `${data.name} ${data.lastname}`} fontWeight="900" />
                            <Button
                                type='outlined'
                                textColor={theme.colors.onPrimary}
                                label={t("actions.edit_profile")}
                                size='small'
                                onPress={() => navigation.navigate("profileNavigation")}
                                color="clear"
                            // disabled={formik.isSubmitting || !formik.isValid}

                            />
                            <Button
                                type='outlined'
                                textColor={theme.colors.onPrimary}
                                label={t("actions.edit_profile")}
                                size='small'
                                onPress={() => navigation.navigate("editProfile")}
                                color="clear"
                            // disabled={formik.isSubmitting || !formik.isValid}

                            />
                            {/* <Button
                                type='outlined'
                                textColor={theme.colors.onPrimary}
                                label={t("actions.edit_profile")}
                                size='small'
                                onPress={() => ALTnavigation.navigate("editProfile", { screen: "editPersonalData" })}
                                color="clear"
                            // disabled={formik.isSubmitting || !formik.isValid}

                            /> */}
                        </View>
                    </View>


                    <View style={styles.inputContainer}>
                    </View>

                </View>
            </ScrollView>
        </MainContainer>
    )
}

export default ProfileScreen


const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        paddingHorizontal: 30,
        justifyContent: "center",
        verticalAlign: "center",

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
