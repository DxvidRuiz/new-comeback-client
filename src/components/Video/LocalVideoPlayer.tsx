import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import VideoControls from "./VideoControls";
type VideoPlayerProps = {
  videoUrl?: string,
  videoTotalDuration?: number,
  ThumbnailImageUrl?: string,
};

const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

const VideoPlayerTest = (props: VideoPlayerProps) => {
  const videoRef = useRef(null);
  const [orientation, setOrientation] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      const touchX = event.absoluteX;
      let mid = Dimensions.get("screen").width / 2;

      if (touchX < mid) {
        videoRef?.current.getStatusAsync().then((status) => {
          const newPosition = Math.max(status.positionMillis - 10000, 0);
          videoRef?.current.setPositionAsync(newPosition);
        });
      } else {
        videoRef?.current.getStatusAsync().then((status) => {
          const newPosition = Math.min(
            status.positionMillis + 10000,
            status.durationMillis
          );
          videoRef?.current.setPositionAsync(newPosition);
        });
      }
    });





  const singleTap = Gesture.Tap().onStart(() => {
    setShowControls(!showControls);
  });

  const handlePlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) {
      // Manejo del estado cuando el video no está cargado.
    } else {
      // El video está cargado, aquí puedes trabajar con la duración y otros aspectos del estado del playback.
      if (status.durationMillis) {
        // Actualiza el estado de la duración del video aquí.
        setVideoDuration(status.durationMillis);
      }
      setCurrentTime(status.positionMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setIsVideoFinished(true);
      }
    }
  };

  const togglePlayPause = () => {
    if (isVideoFinished) {
      videoRef?.current.replayAsync();
      setIsVideoFinished(false);
    } else {
      if (isPlaying) {
        videoRef?.current.pauseAsync();
      } else {
        videoRef?.current.playAsync();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const togglePlaybackSpeed = () => {
    const nextSpeedIndex = playbackSpeedOptions.indexOf(playbackSpeed) + 1;
    if (nextSpeedIndex < playbackSpeedOptions.length) {
      videoRef?.current.setRateAsync(playbackSpeedOptions[nextSpeedIndex], true);
      setPlaybackSpeed(playbackSpeedOptions[nextSpeedIndex]);
    } else {
      videoRef?.current.setRateAsync(playbackSpeedOptions[0], true);
      setPlaybackSpeed(playbackSpeedOptions[0]);
    }
  };

  const toggleMute = () => {
    videoRef?.current.setIsMutedAsync(isMuted);
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setIsFullscreen(true);
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsFullscreen(false);
    }
    setOrientation(await ScreenOrientation.getOrientationAsync());
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}

      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <View style={{ flex: 1 }}>
          {props.ThumbnailImageUrl && !isPlaying && (
            <Image source={{ uri: props.ThumbnailImageUrl }} style={styles.thumbnail} />
          )}
          <Video
            ref={videoRef}
            source={{
              uri: props.videoUrl,
            }}
            rate={playbackSpeed}
            isMuted={isMuted}
            shouldPlay={isPlaying}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            style={{ flex: 1 }}
          />
          {showControls && (
            <VideoControls
              onTogglePlayPause={togglePlayPause}
              onToggleMute={toggleMute}
              onTogglePlaybackSpeed={togglePlaybackSpeed}
              onSeek={(value) => {
                videoRef?.current.setPositionAsync(+value);
                setCurrentTime(+value);
              }}
              onToggleFullscreen={toggleFullscreen}
              duration={props.videoTotalDuration || videoDuration} // Prefiere usar la prop si está disponible, si no, usa el estado local.
              currentTime={currentTime}
              rate={playbackSpeed}
              isMuted={isMuted}
              shouldPlay={isPlaying}
              fullScreenValue={isFullscreen}
              ThumbnailImageUrl={props.ThumbnailImageUrl}
            />
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});

export default VideoPlayerTest;