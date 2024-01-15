import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Modal, StyleSheet, View } from 'react-native';
import CustomButton from '../../common/buttons/CustomButton';

interface ImageModalProps {
    isVisible: boolean;
    imageUri: string | null;
    onCancel: () => void;
    onAccept: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isVisible, imageUri, onCancel, onAccept }) => {


    const { t } = useTranslation()

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                <View style={styles.buttonContainer}>
                    <CustomButton label={t("actions.cancel")} onPress={onCancel} type='elevated' />
                    <CustomButton label={t("actions.confirm")} onPress={onAccept} type='elevated' />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    image: {
        width: "100%",
        height: "50%",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
});

export default ImageModal;
