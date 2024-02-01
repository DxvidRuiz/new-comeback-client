import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { COLORS } from '../../styles/colors';

interface LoadingModalProps {
    isVisible: boolean;
    text: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible, text }) => {
    const theme = useTheme();
    const styles = style(theme);

    return (
        <Modal transparent={true} animationType="none" visible={isVisible} onRequestClose={() => null}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>{text}</Text>
                        <ActivityIndicator size="small" color={COLORS.white} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const style = (theme: MD3Theme) =>
    StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        modalContent: {
            padding: 20,
            borderRadius: 10,
        },
        loadingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        loadingText: {
            fontSize: 16,
            color: COLORS.white,
        },
    });

export default LoadingModal;
