// EditProfileScreen
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../common/buttons/CustomButton';
import MainContainer from '../../../common/containers/MainContainer';
import { ImageInfo } from '../../../common/images/CommonImagePicker';
import MediumText from '../../../common/text/MediumText';
import ProfilePhoto from '../../../components/profile/profilePhotoContainers/ProfilePhoto';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { ProfileNavigationProps } from '../../../types/NavigationParams/profileParams';




const ProfileScreen = () => {
    type ProfileNavigationProp = NativeStackNavigationProp<ProfileNavigationProps, 'profileData'>;
    const { loading, user: data } = useSelector((state: RootState) => state.user)
    const { t } = useTranslation()


    const dispatch = useDispatch<AppDispatch>();
    const stateData = useSelector((state: RootState) => state.registerForm);
    const [date, setDate] = useState(new Date(1598051730000));
    const [isVisible, setIsVisible] = useState(false);
    const [profileImage, setProfileImage] = useState('../../../../assets/Profile/Duaprofile.jpeg');

    const navigation = useNavigation<ProfileNavigationProp>()



    // const stateData = useSelector((state: RootState) => state.registerData);


    // --------------------------------- max date validation
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 12); // Resta 12 años


    const handleImageSelected = async (ImageInfo: ImageInfo) => {
        // Aquí puedes manejar la lógica de lo que deseas hacer con la imagen seleccionada
        console.log('Imagen seleccionada:', ImageInfo.uri);
        console.log('Imagen uri:', ImageInfo.file.uri);
        setProfileImage(ImageInfo.uri)
        setIsVisible(true)
    };




    const theme = useTheme();

    const styles = style(theme)

    return (

        <MainContainer>

            {/* <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text> */}
            <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.content} >

                    <View style={styles.mainAvatarContariner}>

                        <View style={styles.avatarContariner}>
                            {/* <CommonImagePicker onImageSelected={handleImageSelected}>
                                <Avatar.Image size={120} source={{ uri: data.}} style={styles.profilePhoto} />
                              

                            </CommonImagePicker> */}


                            <ProfilePhoto />
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
