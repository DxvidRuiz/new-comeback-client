import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteAsyncStorage = async (clave: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(clave);
  } catch (error) {
    console.error(`Unable to delete AsyncStorage (${clave}):`, error);
  }
};