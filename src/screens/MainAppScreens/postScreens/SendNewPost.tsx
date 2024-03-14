import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import CustomButton from '../../../common/buttons/CustomButton';
import MediumText from '../../../common/text/MediumText';
import SubtitleText from '../../../common/text/SubtitleText';
import { useLocalImages } from '../../../services/media/useLocalImages';
import { COLORS } from '../../../styles/colors';
import { NewPostNavigationProps } from '../../../types/NavigationParams/newPostParams';


type routeProps = RouteProp<NewPostNavigationProps, 'sendNewPost'>;

export type MediaItem = {
    id: string; // Un identificador único para el elemento de media
    uri: string; // El URI de la imagen o video
    type: 'image' | 'video'; // Tipo de media, puede ser imagen o video
    // Agrega aquí cualquier otro campo relevante
};
export default function SendNewPost() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [isImageModalVisible, setImageModalVisible] = useState(false);
    const [currentImageUri, setCurrentImageUri] = useState(null);
    const images = useLocalImages();
    const theme = useTheme();
    const styles = style(theme);
    const { t } = useTranslation();
    const route = useRoute<routeProps>();


    const handlePress = (uri) => {
        setCurrentImageUri(uri);
        setImageModalVisible(true);
    };

    const selectImage = (uri) => {
        const index = selectedImages.indexOf(uri);
        if (index > -1) {
            // Si la imagen ya está seleccionada, se elimina de las seleccionadas
            setSelectedImages(selectedImages.filter((itemUri) => itemUri !== uri));
        } else {
            // Solo agrega la nueva imagen si hay menos de 5 imágenes seleccionadas
            if (selectedImages.length < 5) {
                setSelectedImages([...selectedImages, uri]);
            } else {
                // Aquí puedes manejar el caso de cuando el usuario intenta seleccionar más de 5 imágenes
                // Por ejemplo, mostrando una alerta o un mensaje en la pantalla
                alert("You can only select up to 5 images.");
            }
        }
    };



    // console.log(route.params);


    return (
        <View style={styles.container}>
            <View>
                <SubtitleText text={t("label.new_post")} />
            </View>

            <View style={styles.selectedImagesContainer}>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    {selectedImages.map((uri, index) => (
                        <View key={index} style={styles.selectedImageContainer}>
                            <TouchableOpacity onPress={() => handlePress(uri)}>
                                <Image source={{ uri }} style={styles.selectedImage} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.removeIcon}
                                onPress={() => selectImage(uri)} // Reutiliza selectImage para deseleccionar o crea una función dedicada si prefieres
                            >
                                <Feather name="x" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}

                </ScrollView>
            </View>


            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
                <MediumText text={t("label.select_images")} />
                <MaterialCommunityIcons name="image-filter-none" size={22} color="black" />
            </View>
            <View style={styles.galleryContainer}>
                <FlatList
                    data={images}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => selectImage(item.uri)}
                            onLongPress={() => handlePress(item.uri)}
                            style={styles.imageWrapper}
                        >
                            <Image source={{ uri: item.uri }} style={styles.image} />
                            {selectedImages.includes(item.uri) && (
                                <View style={styles.checkIcon}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={3}
                />
            </View>
            <View style={styles.continueButton}>

                <CustomButton color="primary" textColor={COLORS.black} type='elevated' onPress={() => { }} label={t('actions.post')} />
            </View>

        </View>
    );
}

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    noSelectionView: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSelectionText: {
        marginTop: 10,
        color: theme.colors.onSurface,
    },
    galleryContainer: {
        height: '60%',
    },
    imageWrapper: {
        flex: 1 / 3,
        aspectRatio: 1,
        padding: 2,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    selectedImagesContainer: {
        height: '40%',
        justifyContent: "center",
    },
    scrollViewContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    selectedImage: {
        width: 150,
        height: 150,
        margin: 5,
        borderRadius: 10,


    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    fullImage: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
    },
    button: {
        position: 'absolute',
        top: 30,
        right: 20,
    },
    checkIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
        padding: 2,
    },
    selectedImageContainer: {
        position: 'relative',
        margin: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 5,
        marginRight: 10,
    },
    removeIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
        padding: 2,
    },
    continueButton: {
        position: 'absolute',

        right: 20,
        bottom: 30
    }

});
