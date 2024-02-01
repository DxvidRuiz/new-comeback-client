// ProfilePhoto.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CommonImagePicker, { ImageInfo } from '../../../common/images/CommonImagePicker';
import ImageModal from '../../../components/Modals/ImageModal';
import { uploadProfilePhoto } from '../../../redux/actions/user.actions';
import { RootState, useAppDispatch } from '../../../redux/store/store';

// interface ProfilePhotoProps {
//     initialImageUri: string; // Puedes cambiar el tipo según tus necesidades
// }

const ProfilePhoto: React.FC<any> = () => {
    const { loading, user: data } = useSelector((state: RootState) => state.user)
    const profilePhotoRoute = useSelector((state: RootState) => state.user?.user?.profile?.profilePhotoRoute);


    const [isVisible, setIsVisible] = useState(false);
    const [imageToUpload, setImageToUpload] = useState<ImageInfo>(null);
    const [profileImage, setProfileImage] = useState(profilePhotoRoute ? profilePhotoRoute : "../../../../assets/Profile/profile-placeholder.jpg");

    // const dispatch = useDispatch<AppThunkDispatch>();
    const dispatch = useAppDispatch()

    const theme = useTheme();



    const handleImageSelected = async (imageInfo: any) => {
        setImageToUpload(imageInfo)
        setProfileImage(imageInfo.uri)
        setIsVisible(true);
    };

    const handleImageCanceled = () => {
        setIsVisible(false);
    };
    useEffect(() => {
        setProfileImage(profilePhotoRoute)
    }, [profilePhotoRoute])

    const handleImageConfirm = async () => {
        if (imageToUpload) {

            // Agrega el Blob al FormData
            const fileName = imageToUpload.uri.split('/').pop();
            const fileType = fileName.split('.').pop();
            const formData = new FormData();
            formData.append('file', {
                uri: imageToUpload.uri,
                name: fileName,
                type: `image/${fileType}`
            } as any);


            // const fakeData = { "file": "nothing" }

            try {
                // Dispatch la acción para cargar la foto y manejar la respuesta
                const imagereturned = await dispatch(uploadProfilePhoto(formData));

                console.log("data obtenida dentro de la imagen retornada ", imagereturned);


                setProfileImage(profilePhotoRoute)
                // Puedes acceder a la respuesta exitosa en action.payload si es necesario

            } catch (error) {
                // Maneja errores si la carga de la foto falla
                console.error('Error uploading the photo:', error);
            }
        }

        setIsVisible(false);
    };

    // Aquí deberías tener la lógica para convertir la imagen seleccionada a un formato que espera tu API
    // Por ejemplo, si estás utilizando FormData:


    return (
        <View style={styles.avatarContainer}>
            <CommonImagePicker onImageSelected={handleImageSelected}>
                <Avatar.Image size={120} source={{ uri: profileImage }} style={styles.profilePhoto} />
            </CommonImagePicker>
            <ImageModal imageUri={profileImage} onAccept={handleImageConfirm} onCancel={handleImageCanceled} isVisible={isVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    profilePhoto: {
        elevation: 5,
    },
});

export default ProfilePhoto;
