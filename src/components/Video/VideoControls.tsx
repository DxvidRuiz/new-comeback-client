import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


type VideoControlsProps = {
    onTogglePlayPause: () => void;
    onToggleMute: () => void;
    onTogglePlaybackSpeed: () => void;
    onSeek: (value: number) => void;
    onToggleFullscreen: () => Promise<void>;
    duration: number;
    currentTime: number;
    rate: number;
    isMuted: boolean;
    isPlaying: boolean; // Asegúrate de que esta línea esté presente
    isFullscreen: boolean;
    ThumbnailImageUrl?: string; // Suponiendo que también quieras pasar una URL de imagen de miniatura
};


const VideoControls = ({
    onTogglePlayPause,
    onToggleMute,
    onTogglePlaybackSpeed,
    onSeek,
    onToggleFullscreen,
    duration,
    currentTime: time,
    rate,
    isMuted,
    shouldPlay,
    fullScreenValue,
    ThumbnailImageUrl,
}) => {
    const formatTime = (timeInMillis) => {
        if (!isNaN(timeInMillis)) {
            const totalSeconds = Math.floor(timeInMillis / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }

        return "00:00";
    };

    return (
        <>
            {ThumbnailImageUrl && !shouldPlay && (
                <View style={styles.thumbnailContainer}>
                    <Image source={{ uri: ThumbnailImageUrl }} style={styles.thumbnail} />
                </View>
            )}

            <View style={styles.controlsContainer}>
                <View style={styles.controls}>
                    <TouchableOpacity
                        onPress={() => {
                            onTogglePlayPause();
                        }}
                        style={styles.controlButton}
                    >
                        <Ionicons
                            name={shouldPlay ? "pause" : "play-sharp"}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.progressContainer}>
                    <Text style={styles.timeText}>{formatTime(time)}</Text>
                    <Slider
                        containerStyle={styles.slider}
                        minimumValue={0}
                        maximumValue={duration}
                        value={time}
                        onValueChange={(value) => {
                            onSeek(value);
                        }}
                        onSlidingComplete={(value) => {
                            onSeek(value);
                        }}
                        minimumTrackTintColor="#FFF"
                        maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                        thumbTintColor="#FFF"
                        thumbStyle={{ height: 10, width: 10 }}



                    />
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>

                    <View style={styles.rightControls}>
                        <TouchableOpacity
                            onPress={() => {
                                onToggleMute();
                            }}
                            style={styles.controlButton}
                        >
                            <MaterialCommunityIcons
                                name={isMuted ? "volume-mute" : "volume-high"}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                onToggleFullscreen();
                            }}
                            style={styles.controlButton}
                        >
                            <MaterialCommunityIcons
                                name={fullScreenValue ? "fullscreen-exit" : "fullscreen"}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    controlsContainer: {
        height: "100%",
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent", // Make the background transparent
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor: "green",
        padding: 25,
        borderRadius: 50


    },
    controlButton: {
        // marginHorizontal: 5,
        marginLeft: 3,
        // marginTop: 10,
    },
    playbackSpeedText: {
        color: "white",
        fontSize: 16,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        alignSelf: "center",
        paddingBottom: 5,
        paddingTop: 10,
        position: "absolute",
        bottom: 0,
        paddingLeft: 10,
    },
    rightControls: {
        marginVertical: 10,
        marginRight: 10,
        gap: 10

    },
    slider: {
        flex: 1,
        // paddingHorizontal: -3,
        marginHorizontal: 3,
        backgroundColor: "transparent"
    },
    timeText: {
        color: "white",
        fontSize: 12,
        marginVertical: 12
    },
    thumbnailContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",

    },
    thumbnail: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default VideoControls;