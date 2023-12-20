import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorage = async <T>(clave: string): Promise<T | null> => {
  try {
    const datos = await AsyncStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.error(`Unable to get AsyncStorage (${clave}):`, error);
    return null;
  }
};
