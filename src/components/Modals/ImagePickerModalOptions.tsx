import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

interface ImagePickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onCameraPress: () => void;
    onGalleryPress: () => void;
}





const ImagePickerModalOptios: React.FC<ImagePickerModalProps> = ({ isVisible, onClose, onCameraPress, onGalleryPress }) => {

    const theme = useTheme();
    const { t } = useTranslation()

    const styles = style(theme)

    return (
        <Modal transparent={true} animationType="slide" visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.option} onPress={onCameraPress}>
                        <Ionicons name="camera" size={24} color={theme.colors.onPrimary} />
                        <Text style={styles.optionText}>{t("actions.camera")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={onGalleryPress}>
                        <Ionicons name="images" size={24} color={theme.colors.onPrimary} />
                        <Text style={styles.optionText}>{t("actions.gallery")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={styles.cancelOption} >
                        <Text style={styles.cancelText}>{t("actions.cancel")}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const style = (theme: MD3Theme) => StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: theme.colors.inverseOnSurface,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.onPrimary,
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
        color: theme.colors.onPrimary
    },
    cancelOption: {
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 10,
        backgroundColor: theme.colors.inverseOnSurface,
        borderRadius: 10,
    },
    cancelText: {
        color: theme.colors.error,
        fontSize: 18,
    },
});

export default ImagePickerModalOptios;
