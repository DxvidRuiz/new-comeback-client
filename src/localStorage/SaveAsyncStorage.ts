import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptObject, encryptString } from '../services/security/EncryptService';

export const saveAsyncStorage = async (key: string, data: string | {}, encryptSecretKey: string): Promise<void> => {

  try {
    if (typeof data === 'string') {


      // Si es una cadena, cifrar la cadena y almacenarla
      const encryptedString = await encryptString(data, encryptSecretKey);

      await AsyncStorage.setItem(key, encryptedString);
    } else {
      // Si es un objeto, cifrar el objeto, convertirlo a JSON y almacenarlo
      const encryptedObject = encryptObject(data, encryptSecretKey);
      const jsonValue = JSON.stringify(encryptedObject);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (error) {
    console.error(`Unable to save AsyncStorage (${key}):`, error);
  }
};
