import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

export const SettingsStateStorage: StateStorage = {
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.error(error);
    }
  },

  getItem: async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value;
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  removeItem: async name => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error(error);
    }
  },
};
