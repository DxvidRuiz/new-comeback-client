import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import CustomButton from '../../common/buttons/CustomButton';

interface actionChangeConfirmationModalProps {
  isVisible: boolean;
  title?: string
  message?: string
  onCancel: () => void;
  onConfirm: () => void;
}

const ActionConfirmationModal: React.FC<actionChangeConfirmationModalProps> = ({
  isVisible,
  message,
  title,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const styles = style(theme)

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            {title}
          </Text>
          <Text style={styles.text}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton label={t('actions.cancel')} color={"primary"} textColor={"#000000"} onPress={onCancel} type="elevated" />
            <CustomButton label={t('actions.confirm')} onPress={onConfirm} type="elevated" />
          </View>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  titleText: {
    fontWeight: "800",
    marginBottom: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default ActionConfirmationModal;
