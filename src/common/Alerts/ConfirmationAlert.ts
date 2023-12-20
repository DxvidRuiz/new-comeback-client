import { Alert } from 'react-native';

const ConfirmationAlert = (title, message, onConfirm) => {
  Alert.alert(
    title,
    message,
    [
      { text: 'OK', onPress: onConfirm },
    ],
    { cancelable: false }
  );
};

export default ConfirmationAlert;
