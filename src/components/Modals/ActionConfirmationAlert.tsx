import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, MD3Theme, useTheme } from 'react-native-paper';
import { COLORS } from '../../styles/colors';

interface ActionChangeConfirmationModalProps {
  isVisible: boolean;
  title?: string;
  loadingTitle?: string;
  message?: string;
  loadingMessage?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ActionConfirmationAlert: React.FC<ActionChangeConfirmationModalProps> = ({
  isVisible = false,
  message,
  title,
  loading,
  loadingMessage,
  loadingTitle,
  onCancel,
  onConfirm,
}) => {

  const { t } = useTranslation();
  const theme = useTheme();

  const styles = style(theme);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          {loading ? <View style={{ justifyContent: "center", alignItems: "center" }}>
            {loadingTitle && <Text style={styles.titleText}>{loadingTitle}</Text>}
            {loadingMessage && <Text style={styles.text}>{loadingMessage}</Text>}
            <ActivityIndicator size="large" animating={true} color={COLORS.gray02} />
          </View> :
            <View >
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.text}>{message}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onCancel}>
                  <Text style={styles.buttonText}>{t('actions.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onConfirm}>
                  <Text style={styles.buttonText}>{t('actions.confirm')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      </View>
    </Modal>
  );
};

const style = (theme: MD3Theme) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  innerContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '900',

  },
  titleText: {
    fontWeight: '800',
    marginBottom: 22,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 40,
    backgroundColor: COLORS.gray01
  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around', // Cambia de 'space-around' a 'center'

  },
});

export default ActionConfirmationAlert;
