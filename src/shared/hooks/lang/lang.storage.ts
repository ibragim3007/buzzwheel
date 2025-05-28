import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

export const ZustandLanguageStorage: StateStorage = {
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      // errorLogger.logError('Error setting item in storage');
    }
  },

  getItem: async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value === undefined) {
        return null;
      }
      return value;
    } catch (error) {
      // errorLogger.logError('Error getting item from storage');
      return null;
    }
  },

  removeItem: async name => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      // errorLogger.logError('Error removing item from storage');
    }
  },
};
