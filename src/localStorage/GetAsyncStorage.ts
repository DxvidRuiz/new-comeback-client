import AsyncStorage from "@react-native-async-storage/async-storage";
import { decryptObject, decryptString } from '../services/security/EncryptService';

export const getAsyncStorage = async <T>(clave: string, dataType: 'string' | 'object', encryptSecretKey: string): Promise<T | null> => {
  try {
    // Obtener la cadena cifrada almacenada en AsyncStorage
    const encryptedData = await AsyncStorage.getItem(clave);


    console.log(encryptedData);


    if (encryptedData) {
      // Intentar descifrar según el tipo de dato especificado
      try {
        if (dataType === 'string') {
          const decryptedString = await decryptString(encryptedData, encryptSecretKey);
          return decryptedString as T;
        } else if (dataType === 'object') {
          const decryptedObject = await decryptObject(encryptedData, encryptSecretKey);
          return decryptedObject as T;
        } else {
          console.error('Invalid dataType specified');
          return null;
        }
      } catch (error) {
        console.error(`Unable to decrypt AsyncStorage  cccc data (${clave}):`, error);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error(`Unable to get AsyncStorage (${clave}):`, error);
    return null;
  }
};
