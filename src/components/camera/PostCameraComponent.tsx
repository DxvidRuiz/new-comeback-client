import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Video } from 'expo-av';
import { Camera, CameraType, requestCameraPermissionsAsync, requestMicrophonePermissionsAsync } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { formatTime } from '../../services/format/formatTimemmss';
import { COLORS } from '../../styles/colors';
import { NewPostNavigationProps, NewPostParams } from '../../types/NavigationParams/newPostParams';
import VideoPlayerTest from '../Video/LocalVideoPlayer';
type routes = RouteProp<NewPostNavigationProps, 'sendNewPost'>;

type postNavigaton = NativeStackNavigationProp<NewPostParams, 'newPost'>;

export type CapturedMediaItem = {
    // id: string; // Un identificador único para el elemento de media
    uri: string; // El URI de la imagen o video
    mediaType: string;
    ratio: { height: number, width: number } // Tipo de media, puede ser imagen o video
    // Agrega aquí cualquier otro campo relevante
};


export default function PostCameraComponent() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const [mode, setMode] = useState('photo'); // 'photo' o 'video'
    const [isRecording, setIsRecording] = useState(false);
    const [mediaUri, setMediaUri] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const [videoInfo, setVideoInfo] = useState(null);
    const navigation = useNavigation<postNavigaton>()
    const [recordingTime, setRecordingTime] = useState(0);
    const theme = useTheme();
    const { t } = useTranslation()

    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await requestCameraPermissionsAsync();
            const { status: microphoneStatus } = await requestMicrophonePermissionsAsync();
            setHasPermission(cameraStatus === 'granted' && microphoneStatus === 'granted');
        })();
    }, []);

    const flipCamera = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

    const toggleMode = () => {
        setMode(mode === 'photo' ? 'video' : 'photo');
    };

    const takePicture = async () => {
        if (cameraRef?.current) {
            try {
                let photo = await cameraRef?.current?.takePictureAsync();
                // Verifica si la foto fue tomada con la cámara frontal
                if (type === CameraType.front) {
                    // Aplica la transformación de espejo a la foto
                    const mirroredPhoto = await ImageManipulator.manipulateAsync(
                        photo.uri,
                        [{ flip: ImageManipulator.FlipType.Horizontal }], // Voltea la imagen horizontalmente
                        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                    );
                    setMediaUri({ uri: mirroredPhoto.uri, isFrontCamera: true });
                } else {
                    // Para la cámara trasera, simplemente usa la foto como está
                    setMediaUri({ uri: photo.uri, isFrontCamera: false });
                }
                console.log(photo.uri);
            } catch (error) {
                console.error("Error taking picture:", error);
                Alert.alert("Error", "Unable to take picture.");
            }
        }
    }
    const getVideoInfo = async (uri) => {

        try {


            const video = new Video(undefined); // Nota: Esta línea no es necesaria; se muestra aquí por contexto.
            const status = await video.loadAsync({ uri }, {}, true);
            setVideoInfo(status);




        } catch (error) {

        }


        // status.durationMillis 

    };

    // Suponiendo que mediaUri es el URI del video que has grabado
    const startRecording = async () => {
        if (cameraRef?.current && !isRecording) {
            let timer = null; // Inicializa la variable del temporizador fuera del bloque try-catch.
            try {
                setIsRecording(true);
                // Asegúrate de que el estado inicial de recordingTime sea 0 antes de iniciar la grabación.
                setRecordingTime(0);

                const videoPromise = cameraRef?.current.recordAsync({
                    quality: Camera.Constants.VideoQuality['4:3'],
                });

                // Usa setTimeout para retrasar el inicio del temporizador por un segundo.
                setTimeout(() => {
                    // Inicia el temporizador aquí, después de iniciar la grabación pero antes de que la grabación se complete.
                    // Esto garantiza que el temporizador se inicie inmediatamente después del retraso.
                    timer = setInterval(() => {
                        setRecordingTime(prevTime => prevTime + 1); // Incrementa el tiempo cada segundo.
                    }, 1000);
                }, 1000); // Retraso de 1000 milisegundos (1 segundo).

                // Espera a que la grabación se complete.
                const video = await videoPromise;
                setMediaUri(video.uri);
            } catch (error) {
                console.error("Error during video recording:", error);
                Alert.alert("Error", "No se pudo grabar el video.");
            } finally {
                setIsRecording(false);
                if (timer !== null) {
                    clearInterval(timer); // Asegúrate de limpiar el temporizador cuando la grabación se detenga.
                }
            }
        }
    };



    const stopRecording = () => {
        if (cameraRef?.current && isRecording) {
            cameraRef?.current.stopRecording();
            setIsRecording(false);
        }
    };
    const startStopRecording = () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    };

    const resetCamera = () => {
        setMediaUri(null);
        setIsRecording(false);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const cancelMedia = () => {
        setMediaUri(null); // Resetear el estado para permitir una nueva captura
    };


    console.log("data de video grabado", mediaUri);



    // Asumiendo que `mediaUri` y `mode` contienen la información relevante
    const continueToNewPost = () => {


        if (mediaUri) {
            const mediaItem: CapturedMediaItem = {
                uri: mode === "photo" ? mediaUri.uri : mediaUri, // Suponiendo que mediaUri es un objeto con una propiedad uri
                mediaType: mode,

                ratio: { height: 4, width: 3 }
                // 'photo' o 'video', basado en el estado 'mode'
            };
            // Navega a la pantalla newPost con los parámetros

            navigation.navigate('newPost', { mediaCaptured: mediaItem });
        }
    };



    const styles = style(theme)

    return (
        <View style={styles.container}>
            {!mediaUri ?
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color={theme.colors.onPrimary} />
                    </TouchableOpacity>
                    <View >
                        {/* Otros elementos de tu topBar */}
                        {isRecording && (
                            <Text style={styles.text}>{formatTime(recordingTime)}</Text>
                        )}
                    </View>
                    <View>
                        <FontAwesome name={mode === 'video' ? 'video-camera' : 'camera'} size={20} color={theme.colors.onPrimary} />
                    </View>
                </View> :
                <View style={[styles.topBar, {}]}>
                    <TouchableOpacity onPress={resetCamera}>
                        <Feather name="arrow-left" size={24} color={theme.colors.onPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => continueToNewPost()}>
                        <Text style={{ fontWeight: "600", color: theme.colors.onPrimary }} >{t("action.next")}</Text>
                    </TouchableOpacity>
                </View>


            }




            <View style={{ aspectRatio: 3 / 4 }}>

                {
                    mediaUri ? (

                        <View style={styles.previewContainer}>
                            {mode === 'photo' ? (
                                <Image source={{ uri: mediaUri.uri }} style={styles.preview} />
                            ) : (

                                <View style={styles.preview}>
                                    <VideoPlayerTest videoUrl={mediaUri} />
                                </View>
                            )}

                        </View>
                    ) : (

                        <Camera ratio='4:3' style={[styles.camera,]} type={type} ref={cameraRef}>
                            {/* Optional UI for showing recording time */}
                        </Camera>
                    )


                }


            </View>

            <View style={styles.controlsContainer}>
                {!mediaUri ? (
                    <>
                        {/* Spacer, shown only when not recording, to keep alignment */}
                        {!isRecording && <View style={styles.iconButtonPlaceholder} />}

                        {/* Flip camera button, shown only when not recording */}
                        {!isRecording && (
                            <TouchableOpacity onPress={flipCamera} style={styles.iconButton}>
                                <FontAwesome name="refresh" size={24} color="white" />
                            </TouchableOpacity>
                        )}

                        {/* Capture/record button, always visible in the center */}
                        <TouchableOpacity onPress={mode === 'photo' ? takePicture : startStopRecording} style={styles.captureButton}>

                            {mode === 'video' ?
                                <View style={styles.recordingButton} >
                                    <Entypo name="controller-record" size={35} color="red" />

                                </View>
                                :
                                <View style={styles.takePhotoButton} >

                                </View>
                            }
                        </TouchableOpacity>

                        {/* Mode change button, shown only when not recording */}
                        {!isRecording && (
                            <TouchableOpacity onPress={toggleMode} style={styles.iconButton}>
                                <FontAwesome name={mode === 'photo' ? 'video-camera' : 'camera'} size={24} color="white" />
                            </TouchableOpacity>
                        )}

                        {/* Another spacer, shown only when not recording, to keep alignment */}
                        {!isRecording && <View style={styles.iconButtonPlaceholder} />}
                    </>
                ) : (
                    <>{

                        mode === 'photo' ?
                            // <FilterPreviewListHorizontal filters={{}} onFilterSelect={{}} originalImageUri={mediaUri.uri} key={0} /> 

                            <View></View>
                            :
                            <View></View>
                    }


                        {/* <TouchableOpacity onPress={resetCamera} style={styles.iconButton}>
                            <FontAwesome name="times" size={24} color="red" />
                        </TouchableOpacity>
                        <View style={styles.iconButtonPlaceholder} />
                        <TouchableOpacity onPress={() => Alert.alert('Next Step')} style={styles.iconButton}>
                            <FontAwesome name="check" size={24} color="white" />
                        </TouchableOpacity> */}
                    </>
                )}
            </View>


        </View>
    );
}

const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    topBar: {

        padding: 10,
        backgroundColor: theme.colors.onSecondary,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomColor: COLORS.gray02,
        borderBottomWidth: 1

    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: '100%',
    },
    camera: {
        flex: 1,
    },
    controlsContainer: {

        flex: 1,

        // height: "20%",

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    captureButton: {
        padding: 5,
        // backgroundColor: 'darkgray',
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 1
        // marginHorizontal: 30,
    },

    recordingButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 50,
        width: 70,
        height: 70,
    },
    takePhotoButton: {

        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 70,
        height: 70,
        backgroundColor: 'white',
    },
    iconButton: {
        height: 70,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        // padding: 20,
    },
    text: {
        fontSize: 18,
        color: 'red',
    },
    iconButtonPlaceholder: {

        justifyContent: "space-between",

        backgroundColor: "green",
        height: 70, // Asume que este es el alto de tus iconButtons
    },
});
