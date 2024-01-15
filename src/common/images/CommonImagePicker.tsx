import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import ImagePickerModalOptios from '../../components/Modals/ImagePickerModalOptions';

export interface ImageInfo {
    uri: string;
    file: {
        uri: string;
        base64: string;
    };
}

interface CommonImagePickerProps {
    onImageSelected: (info: ImageInfo) => void;
    containerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

const CommonImagePicker: React.FC<CommonImagePickerProps> = ({ onImageSelected, containerStyle, children }) => {
    const [image, setImage] = useState<string | null>(null);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const pickImage = async (source: 'gallery' | 'camera') => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Insufficient Permissions', 'Permission is required to access the image gallery.');
                return;
            }
            setVisibleOptions(false)

            let result;

            if (source === 'gallery') {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else if (source === 'camera') {
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }

            if (!result.canceled) {
                const selectedImageUri = result.assets[0].uri;
                setImage(selectedImageUri);

                const file = await FileSystem.getInfoAsync(selectedImageUri);
                const fileUri = file.uri;
                const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                onImageSelected({ uri: selectedImageUri, file: { uri: fileUri, base64: fileBase64 } });
            }
        } catch (error) {
            console.error('Error picking an image:', error);
            Alert.alert('Error', 'An error occurred while selecting the image. Please try again.');
        }
    };

    return (
        <View style={[{ alignItems: 'center', justifyContent: 'center' }, containerStyle]}>
            <TouchableOpacity onPress={() => setVisibleOptions(true)}>
                {children}
            </TouchableOpacity>
            <ImagePickerModalOptios
                isVisible={visibleOptions}
                onClose={() => setVisibleOptions(false)}
                onGalleryPress={() => pickImage('gallery')}
                onCameraPress={() => pickImage('camera')} />
        </View>
    );
};

export default CommonImagePicker;
