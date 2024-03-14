import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

export const useLocalVideos = () => {
    const [images, setImages] = useState([]);
    const [status, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        (async () => {
            if (!status || status.status !== 'granted') {
                const { status } = await requestPermission();
                if (status !== 'granted') {
                    alert('Permission to access media library is required!');
                    return;
                }
            }
            loadImages();
        })();
    }, [status]);

    const loadImages = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            first: 15, // Considera reducir este número para mejorar el rendimiento
            mediaType: MediaLibrary.MediaType.video,

            sortBy: [MediaLibrary.SortBy.creationTime], // Ordena las imágenes por fecha de creación
        });

        // Si deseas cargar más imágenes más allá del primer lote
        while (media.hasNextPage) {
            const moreMedia = await MediaLibrary.getAssetsAsync({
                first: 100,
                mediaType: MediaLibrary.MediaType.video,
                after: media.endCursor,
                sortBy: [MediaLibrary.SortBy.creationTime], // Asegúrate de mantener el orden aquí también
            });
            media = {
                ...moreMedia,
                assets: [...media.assets, ...moreMedia.assets],
            };
        }

        setImages(media.assets);
    };


    return images;
};


export type mediaAsset = {
    id: string;
    uri: string;
    mediaType: 'photo' | 'video';
    width: number;
    height: number;
    creationTime: number;
    modificationTime: number;
    duration?: number; // Presente si mediaType es 'video'
    albumId?: string;
    filename?: string; // No siempre disponible en Android
};
