import { Feather, FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    FlatList, Image,
    KeyboardAvoidingView,
    Modal, Platform, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CustomButton from '../../../common/buttons/CustomButton';
import TextAreaInput from '../../../common/input/TextAreaInput';
import MediumText from '../../../common/text/MediumText';
import { default as LocalVideoPlayer, default as VideoPlayerTest } from '../../../components/Video/LocalVideoPlayer';
import { RootState, useAppDispatch } from '../../../redux/store/store';
import { formatDuration } from '../../../services/format/videoTimeFormat';
import LocationSearch from '../../../services/location/LocationSearch';
import { useLocalImages } from '../../../services/media/useLocalImages';
import { useLocalVideos } from '../../../services/media/useLocalVideos';
import { COLORS } from '../../../styles/colors';

import { alarmError, alarmsuccess } from '../../../common/Alerts/showMessage';
import { newPost } from '../../../redux/actions/profile.actions';
import { AppTabNavigationParams } from '../../../types/NavigationParams/AppTabNavigationProps';
import { NewPostNavigationProps } from '../../../types/NavigationParams/newPostParams';
import SwipeGestureHandler from '../../../utils/SwipeGestureHandler';
import { createFormData } from '../../../utils/createFormData';
type NewPostProps = NativeStackNavigationProp<AppTabNavigationParams, 'feed'>;
type routes = RouteProp<NewPostNavigationProps, 'sendNewPost'>;


export default function NewPost() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [isMediaModalVisible, setMediaModalVisible] = useState(false);
    const [currentMediaItem, setCurrentMediaItem] = useState(null);
    const [imageGridModalVisible, setImageGridModalVisible] = useState(false);
    const [videoGridModalVisible, setVideoGridModalVisible] = useState(false);
    // const [isSelectModalVisible, setSelectModalVisible] = useState(false);
    const localImages = useLocalImages();
    const localVideos = useLocalVideos();
    const dispatch = useAppDispatch();
    const { loadingNewPost, newPost: data } = useSelector((state: RootState) => state.profileSlices)

    const theme = useTheme();
    const styles = style(theme);
    const { t } = useTranslation();




    const [media, setMedia] = useState(localImages);

    const [textValue, setTextValue] = useState('');

    const navigation = useNavigation<NewPostProps>()

    const handlePress = (item) => {

        console.log(item);

        setCurrentMediaItem(item);
        setMediaModalVisible(true);
    };


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        // Aquí puedes hacer más lógica si es necesario, como enviar la ubicación a una API o almacenarla en un estado global
    };


    const selectImage = (item) => {
        // Busca el índice del item basado en su propiedad única 'uri'
        const index = selectedImages.findIndex((selectedItem) => selectedItem.uri === item.uri);

        if (index > -1) {
            // Si el índice existe, significa que el item ya está seleccionado y se debe eliminar
            setSelectedImages(selectedImages.filter((_, i) => i !== index));
        } else {
            // Si el item no está seleccionado y hay menos de 5 imágenes, lo agrega al arreglo
            if (selectedImages.length < 5) {
                setSelectedImages([...selectedImages.reverse(), item]);
            } else {
                // Maneja el caso de más de 5 imágenes seleccionadas
                alert("You can only select up to 5 images.");
            }
        }
    };

    const selectVideo = (video) => {
        // Reemplaza cualquier video existente con el nuevo video seleccionado
        setSelectedVideos([video]);
        setVideoGridModalVisible(false);

    };

    console.log(selectedVideos);

    const handleTextChange = (text) => {
        setTextValue(text);
    };

    const sendPost = async () => {
        let postData: FormData | null = null;

        try {
            const additionalData = {
                message: textValue,
                public: true,
            };

            // Combine selectedVideos and selectedImages into a single array
            const mediaItems = [...selectedVideos, ...selectedImages];

            // Check if there are elements to send
            if (mediaItems.length > 0) {
                postData = createFormData(mediaItems, additionalData); // Assuming you handle this function to properly handle the combined array
            } else {
                console.log("No videos or images selected to send.");
                return; // Exit the function if there's nothing to send
            }

            if (!postData) {
                console.error("FormData is empty.");
                return;
            }

            // Sending the data
            console.log("postData before sending:", postData);
            const response = await dispatch(newPost(postData));

            // Checking the response
            if (response.meta.requestStatus === 'fulfilled') {
                const res = response.payload;


                alarmsuccess({

                    duration: 5000,
                    title: t("label.done"),
                    description: t("label.your_post_has_been_shared")
                })

                navigation.navigate("feed")
                console.log("Successful response:", res);
            } else if (response.meta.requestStatus === 'rejected') {
                const errorPayload = response.payload;
                const errorCode = errorPayload?.message?.status;
                console.error(`Error: ${errorCode}`);
            }
        } catch (error) {


            alarmError({
                duration: 5000,
                title: t("alert.ups_something_went_wrong"),
                description: t("alert.your_post_could_not_be_shared")
            })
            // Handle any other errors that were not caught by the promise
            console.error("Unexpected error:", error);
        }
    };



    // console.log(selectedImages);



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Ajusta este valor según sea necesario para tu diseño
        >
            <View style={styles.container}>
                {selectedImages.length > 0 && (
                    <View style={styles.selectedImagesContainer}>
                        <FlatList
                            // horizontal
                            data={selectedImages}
                            renderItem={({ item, index }) => (
                                <View key={index} style={styles.selectedImageContainer}>
                                    <TouchableOpacity onPress={() => handlePress(item)}>
                                        <Image source={{ uri: item.uri }} style={styles.selectedImage} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.removeIcon}
                                        onPress={() => selectImage(item)} // Reutiliza selectImage para deseleccionar
                                    >
                                        <Feather name="x" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(_, index) => index.toString()}
                            numColumns={3}


                        />

                        {selectedImages.length < 5 &&

                            <TouchableOpacity style={styles.addButton} onPress={() => setImageGridModalVisible(true)}>
                                <Feather name="plus" size={24} color={COLORS.gray05} />
                            </TouchableOpacity>
                        }
                    </View>
                )}
                {selectedVideos.length > 0 && (
                    <View style={styles.selectedVideoContainer}>
                        {selectedVideos.map((selectedVideo, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.selectedVideoContent,
                                    {
                                        aspectRatio: selectedVideo?.width / selectedVideo?.height,
                                        height: selectedVideo?.height > selectedVideo?.width ? '100%' : undefined,
                                        width: selectedVideo?.width > selectedVideo?.height ? '100%' : undefined,
                                    },
                                ]}
                            >
                                <VideoPlayerTest
                                    videoTotalDuration={selectedVideo?.duration * 1000}
                                    videoUrl={selectedVideo.uri}
                                />
                                <TouchableOpacity
                                    style={styles.removeIcon}
                                    onPress={() => {
                                        // Aquí actualizamos para remover el video seleccionado del array
                                        const newSelectedVideos = selectedVideos.filter((_, i) => i !== index);
                                        setSelectedVideos(newSelectedVideos);
                                    }}
                                >
                                    <Feather name="x" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {
                    selectedImages.length < 1 && selectedVideos.length < 1 && (

                        <View style={styles.noSelectionView}>

                            <TouchableOpacity style={styles.postType} onPress={() => {
                                setImageGridModalVisible(true)
                            }} >
                                <Octicons name="image" size={40} color={theme.colors.inverseSurface} />
                                <Text style={styles.noSelectionText}>{t("label.image")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setVideoGridModalVisible(true)
                                setMedia(localVideos)
                            }} >
                                <Octicons name="video" size={40} color={theme.colors.inverseSurface} />
                                <Text style={styles.noSelectionText}>{t("label.video")}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }


                <View style={styles.commentContainer}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <MediumText color={theme.colors.onSurface} text={t("label.description")} />
                        <MaterialCommunityIcons name="text-short" size={24} color={theme.colors.onSurface} />
                    </View>

                    <TextAreaInput

                        placeholderTextColor={COLORS.gray05}
                        textColor={theme.colors.onSurface}
                        textAreaColor={theme.colors.surface}

                        placeholder={t("label.add_description")}
                        onTextChange={handleTextChange}
                    />


                </View>


                <View style={styles.locationSearch}>
                    <LocationSearch onLocationSelect={handleLocationSelect} />
                </View>



                <View style={styles.continueButton}>
                    <CustomButton type='elevated' onPress={() => sendPost()} label={t('actions.post')} />
                </View>



                <View >
                    <CustomButton type='elevated' onPress={() => {
                        alarmError({
                            duration: 5000,
                            title: t("alert.ups_something_went_wrong"),
                            description: t("alert.your_post_could_not_be_shared")
                        })
                    }} label={"test"} />
                </View>



                {/* ---------------------------------------------------------- Image grid */}


                <Modal
                    animationType="slide"
                    transparent={true}

                    visible={imageGridModalVisible}
                    onRequestClose={() => setImageGridModalVisible(false)}
                >
                    {/* <SwipeGestureHandler onSwipeDown={() => {
                        console.log("eyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
                    }}>
                </SwipeGestureHandler> */}
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <SwipeGestureHandler swipeDistance={30} onSwipeDown={() => {

                            setImageGridModalVisible(false)
                        }}>
                            <View style={styles.localMediaModalContainer}>

                                <View style={styles.galleryContainer}>
                                    <TouchableOpacity onPress={() => setImageGridModalVisible(false)} style={{ backgroundColor: COLORS.gray02, width: "100%", alignItems: "center" }}>
                                        <FontAwesome name="angle-down" size={24} color="black" />
                                    </TouchableOpacity>

                                    {localImages.length > 0 ?


                                        <FlatList
                                            data={localImages}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity

                                                    onPress={() => selectImage(item)}
                                                    onLongPress={() => handlePress(item)}
                                                    style={styles.imageWrapper}
                                                >
                                                    <Image source={{ uri: item.uri }} style={styles.image} />
                                                    {selectedImages.some(selectedItem => selectedItem.uri === item.uri) && (
                                                        <View style={styles.checkIcon}>
                                                            <Feather name="check" size={24} color="white" />
                                                        </View>
                                                    )}
                                                </TouchableOpacity>
                                            )}

                                            keyExtractor={(_, index) => index.toString()}
                                            numColumns={3}

                                        /> :

                                        <ActivityIndicator style={{ marginTop: "50%" }} size="large" color={COLORS.gray05} />
                                    }
                                </View>
                            </View>
                        </SwipeGestureHandler>
                    </GestureHandlerRootView>
                </Modal>



                {/* ---------------------------------------------------------- Image grid */}



                <Modal
                    animationType="slide"
                    transparent={true}

                    visible={videoGridModalVisible}
                    onRequestClose={() => setVideoGridModalVisible(false)}
                >
                    <GestureHandlerRootView style={{ flex: 1 }}>


                        <SwipeGestureHandler onSwipeDown={() => { setVideoGridModalVisible(false) }}>
                            <View style={styles.localMediaModalContainer} >


                                <View style={styles.galleryContainer}>
                                    <TouchableOpacity onPress={() => setVideoGridModalVisible(false)} style={{ backgroundColor: COLORS.gray02, width: "100%", alignItems: "center" }}>
                                        <FontAwesome name="angle-down" size={24} color="black" />
                                    </TouchableOpacity>
                                    {localVideos.length > 0 ?

                                        <FlatList
                                            data={localVideos}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity

                                                    onPress={() => selectVideo(item)}
                                                    onLongPress={() => handlePress(item)}
                                                    style={styles.imageWrapper}
                                                >
                                                    <Image source={{ uri: item.uri }} style={styles.image} />
                                                    <Text style={{ position: "absolute", color: COLORS.white, bottom: 2, right: 4 }} > {formatDuration(item.duration)}</Text>

                                                </TouchableOpacity>
                                            )}

                                            keyExtractor={(_, index) => index.toString()}
                                            numColumns={3}
                                        /> :

                                        <ActivityIndicator style={{ marginTop: "50%" }} size="large" color={COLORS.gray05} />

                                    }
                                </View>
                            </View>
                        </SwipeGestureHandler>
                    </GestureHandlerRootView>
                </Modal>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isMediaModalVisible}
                    onRequestClose={() => setMediaModalVisible(false)}
                >
                    <View style={styles.centeredView}>

                        {currentMediaItem?.mediaType === "photo" && <Image source={{ uri: currentMediaItem?.uri }} style={styles.fullImage} />
                        }
                        {currentMediaItem?.mediaType === "video" &&
                            <View style={{
                                aspectRatio: currentMediaItem?.width / currentMediaItem?.height,

                                height: currentMediaItem?.height > currentMediaItem?.width ? '80%' : undefined,
                                width: currentMediaItem?.width > currentMediaItem?.height ? '100%' : undefined,
                                alignSelf: 'center',
                                maxHeight: '80%',
                            }}>

                                <LocalVideoPlayer videoUrl={currentMediaItem?.uri} videoTotalDuration={currentMediaItem?.duration * 1000} />
                            </View>
                        }
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setMediaModalVisible(false)}
                        >
                            <Feather name="x-circle" size={38} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    );
}

const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.onSecondary

    },
    noSelectionView: {
        flexDirection: "row",
        height: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.colors.surface

    },


    noSelectionText: {
        marginTop: 10,
        color: theme.colors.onSurface,
    },
    postType: { justifyContent: "center", alignItems: "center" },


    imageWrapper: {
        flex: 1 / 3,
        aspectRatio: 1,
        padding: 2,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        position: "relative"
    },
    selectedImagesContainer: {
        height: 'auto',
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: theme.colors.surface
    },
    scrollViewContainer: {
        alignItems: "center",
        justifyContent: 'center',

    },
    selectedImage: {
        width: 120,
        height: 120,
        margin: 5,
        borderRadius: 10,


    },
    locationSearch: {
        marginHorizontal: 10,
        marginVertical: 30
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
        bottom: 30,
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
        // margin: 5,
        backgroundColor: theme.colors.surface,

        marginBottom: 5,
        marginLeft: 5,
        marginTop: 5,
        marginRight: 5,
    },
    selectedVideoContainer: {
        height: '50%',
        justifyContent: "center",
        alignItems: "center",


        backgroundColor: theme.colors.surface
    },
    selectedVideoContent: {

        height: "100%",
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 5,
        marginRight: 5,
    },
    removeIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
        padding: 1,
    },
    continueButton: {
        position: 'absolute',

        right: 20,
        bottom: 30
    },
    galleryContainer: {
        paddingTop: 1,
        elevation: 50,
        height: '60%', // El modal solo cubrirá el 60% de la pantalla desde la parte inferior
        backgroundColor: theme.colors.surface, // Asumiendo que el fondo del modal es blanco
        // borderTopRightRadius: 20, // Para bordes redondeados en la parte superior
        // borderTopLeftRadius: 20, // Para bordes redondeados en la parte superior
    },
    localMediaModalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    addButton: {
        width: "20%", // O el tamaño que desees
        height: 30, // O el tamaño que desees
        backgroundColor: theme.colors.surface, // Un color de fondo que contraste con el signo de más
        alignItems: 'center', // Centra horizontalmente
        justifyContent: 'center', // Centra verticalmente
        borderWidth: 1,
        borderColor: COLORS.gray08, // Puede ser el color que prefieras
        borderStyle: 'solid',
        borderRadius: 30,
        margin: 10,
        elevation: 2
    },
    commentContainer: {

        marginTop: 40,


        marginHorizontal: 20
    },


});
