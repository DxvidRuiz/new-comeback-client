// PostCard.js
import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import VideoPlayer from '../../Video/VideoPlayer';
import PostIcon from './icons/PostIcon';

interface post_i {
    postType: "video" | "image"
}

type ProfilePostProps = {
    post: { id: string; nombre: string, postType: string, url: string };
    index: number;
};


const ProfilePost: React.FC<any> = ({ post, index }) => {
    const theme = useTheme();
    const styles = style(theme);

    const postMediaData = post.media?.length > 0 ? post.media[0] : null;
    const postData = post;

    // Asumimos valores predeterminados o nulos para manejar posts sin media
    const postMediaUrl = postMediaData ? postMediaData.url : null;
    const postMediaType = postMediaData ? postMediaData.type : null;
    const mediaHeight = postMediaData ? postMediaData.height : 1; // Evita división por cero
    const mediaWidth = postMediaData ? postMediaData.width : 1; // Mismo motivo
    const videoDuration = postMediaData ? parseInt(postMediaData.duration) * 1000 : 0;

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.header}>
                {/* Puedes agregar elementos a la cabecera si es necesario */}
            </View>




            <View style={[styles.media, { aspectRatio: mediaWidth / mediaHeight }]}  >
                {postMediaType === "image" && <Image style={{ flex: 1 }} source={{ uri: postMediaUrl }} />}

                {postMediaType === "video" && <VideoPlayer videoTotalDuration={videoDuration} videoUrl={postMediaUrl} />}
            </View>



            <View style={styles.messageContainer}>
                <Text>
                    {postData.message}
                </Text>
            </View>

            <View style={styles.details}>
                <View style={styles.buttonsContainer}>
                    <PostIcon number={43} iconName={<EvilIcons name="heart" size={28} color={theme.colors.onPrimary} />} />
                    <PostIcon number={44} iconName={<EvilIcons name="comment" size={24} color={theme.colors.onPrimary} />} />
                    <PostIcon iconName={<EvilIcons name="refresh" size={24} color={theme.colors.onPrimary} />} />
                    <PostIcon iconName={<EvilIcons name="share-google" size={24} color={theme.colors.onPrimary} />} />
                </View>
            </View>
        </View>
    );
};

const style = (theme: MD3Theme) => StyleSheet.create({
    container: {
        // overflow: 'hidden',

        borderBottomWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        backgroundColor: theme.colors.surface
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    media: {
        // height: 400,
        // width: "100%"

    },
    details: {
        padding: 10,
        backgroundColor: theme.colors.surface
    },
    messageContainer: {
        paddingHorizontal: "2%",
        padding: 5,
        borderBottomWidth: 1,
        borderColor: theme.colors.surfaceVariant,
    },
    message: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonsContainer: {
        backgroundColor: theme.colors.surface,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    button: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 5,
    },
    buttonText: {
        fontSize: 14,
    },
});

export default ProfilePost;
