// EditProfileScreen
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Button from '../../../common/buttons/CustomButton';
import { ImageInfo } from '../../../common/images/CommonImagePicker';
import MediumText from '../../../common/text/MediumText';
import ProfilePost from '../../../components/profile/postContainer/ProfilePost';
import ProfilePhoto from '../../../components/profile/profilePhotoContainers/ProfilePhoto';
import { getProfilePosts } from '../../../redux/actions/profile.actions';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import { ProfileNavigationProps } from '../../../types/NavigationParams/profileParams';




const ProfileScreen = () => {
    type ProfileNavigationProp = NativeStackNavigationProp<ProfileNavigationProps, 'profileData'>;
    // const { loading, user: data } = useSelector((state: RootState) => state.user)
    const eeeee = useSelector((state: RootState) => state.auth.token)
    const { t } = useTranslation()


    const dispatch = useAppDispatch();
    const { error, loading, otpCodeCountdown, profilePosts } = useSelector((state: RootState) => state.profileSlices);
    const { user } = useSelector((state: RootState) => state.user);
    const [date, setDate] = useState(new Date(1598051730000));
    const [isVisible, setIsVisible] = useState(false);
    const [profileImage, setProfileImage] = useState('../../../../assets/Profile/Duaprofile.jpeg');

    const navigation = useNavigation<ProfileNavigationProp>()

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



    const datos = profilePosts;


    const theme = useTheme();

    const styles = style(theme)


    const handleGetProfilePosts = async () => {

        dispatch(getProfilePosts()).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
                const profilePosts = response.payload; // El array de posts

                profilePosts.forEach(post => {
                    // const mediaArray = post._doc.media;
                    // Hacer algo con el array de media, por ejemplo, imprimirlo en la consola
                    // console.log(mediaArray);
                });

                console.log(profilePosts);


            }
            if (response.meta.requestStatus == 'rejected') {
                const errorPayload = response.payload as any;
                const errorCode = errorPayload?.message?.status;



                console.log("Respuesta de error", response);


                if (errorCode === 404) {
                    // Contraseña actual incorrecta

                    // También puedes establecer un error de campo específico si es necesario
                    // setFieldError('currentPassword', 'Current password is incorrect');
                } else if (errorCode === 401) {
                    // Error en la respuesta con código de estado definido


                    // setFieldError('submitError', errorMessage);
                } else {
                    // Error en la red
                    console.log("error");

                }
            }
        })
    }

    useEffect(() => {
        handleGetProfilePosts();
        console.log("get post");

    }, []);




    return (
        <View style={{ flex: 1 }}>
            {/* <Text style={{ color: "white" }}> {JSON.stringify(formik.errors)}</Text> */}
            <View style={styles.content} >
                <View style={styles.mainAvatarContariner}>
                    <View style={styles.avatarContariner}>
                        <ProfilePhoto />
                    </View>
                    <View style={styles.nameContariner}>
                        <MediumText text={user && `${user.name} ${user.lastname}`} fontWeight="900" />
                        <Button
                            type='outlined'
                            textColor={theme.colors.onPrimary}
                            label={t("actions.edit_profile")}
                            size='small'
                            onPress={() => navigation.navigate("profileNavigation")}
                            color="clear"
                        // disabled={formik.isSubmitting || !formik.isValid}
                        />
                        <Button label='PROFILE' onPress={() => { handleGetProfilePosts() }} />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                </View>
            </View>





            <FlatList
                data={profilePosts}
                renderItem={({ item, index }) => <ProfilePost post={item} index={index} />}
                keyExtractor={(item) => item?._id}
                showsVerticalScrollIndicator={false}
            />



        </View>
    )
}

export default ProfileScreen


const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.onSecondary
    },

    content: {


        justifyContent: "center",
        verticalAlign: "center",

    },
    buttonContainer: {
        marginVertical: 10,
    },
    inputContainer: {
        marginVertical: "2%",
        gap: 8,
        backgroundColor: "orange"
    },
    titleContariner: {
        flexDirection: "row",
        marginVertical: 20,
    },
    mainAvatarContariner: {
        flexDirection: "row",
        elevation: 1,
        padding: 10,
        // backgroundColor: "green"
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
