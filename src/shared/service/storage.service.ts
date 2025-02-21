import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAvailableColor } from "../config/constants/settingsOptions";
import { StorageKeys } from "../config/constants/storageKeys";

class Storage {
  async getRouletteColor(): Promise<IAvailableColor | null> {
    const value = await AsyncStorage.getItem(StorageKeys.pickedRoulleteColors);
    return value ? JSON.parse(value) : null;
  }
  async setRouletteColor(value: IAvailableColor) {
    await AsyncStorage.setItem(
      StorageKeys.pickedRoulleteColors,
      JSON.stringify(value)
    );
  }
}

export const LocalStorage = new Storage();
