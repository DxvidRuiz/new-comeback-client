

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncStorage = async <T>(key: string, data: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Unable to save AsyncStorage (${key}):`, error);
  }
};