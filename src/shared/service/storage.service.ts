import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAvailableColor } from "../config/constants/settingsOptions";
import { StorageKeys } from "../config/constants/storageKeys";
import { sizeOf } from "../utils/sizeOf";

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

  async getTheme(): Promise<number | null> {
    const value = await AsyncStorage.getItem(StorageKeys.theme);
    return value ? JSON.parse(value) : null;
  }

  async setTheme(value: number) {
    await AsyncStorage.setItem(StorageKeys.theme, JSON.stringify(value));
  }

  async getRepetitions(): Promise<boolean | null> {
    const value = await AsyncStorage.getItem(StorageKeys.isRemoveRepetitions);
    return value ? JSON.parse(value) : null;
  }

  async setRepetitions(value: boolean) {
    await AsyncStorage.setItem(
      StorageKeys.isRemoveRepetitions,
      JSON.stringify(value)
    );
  }

  async getUnlockedRouletteColors(): Promise<number[]> {
    const value = await AsyncStorage.getItem(
      StorageKeys.unlockedRouletteColors
    );
    return value ? JSON.parse(value) : [];
  }

  async getUnlockedThemes(): Promise<number[]> {
    const value = await AsyncStorage.getItem(StorageKeys.unlockedThemes);
    return value ? JSON.parse(value) : [];
  }

  async setUnlockedRouletteColors(value: number[]) {
    await AsyncStorage.setItem(
      StorageKeys.unlockedRouletteColors,
      JSON.stringify(value)
    );
  }

  async setUnlockedThemes(value: number[]) {
    await AsyncStorage.setItem(
      StorageKeys.unlockedThemes,
      JSON.stringify(value)
    );
  }

  async getDayliTaskDatePressed(): Promise<string | null> {
    const value = await AsyncStorage.getItem(StorageKeys.dayliTaskDatePressed);
    return value ? JSON.parse(value) : null;
  }

  async setDayliTaskDatePressed(value: string) {
    await AsyncStorage.setItem(
      StorageKeys.dayliTaskDatePressed,
      JSON.stringify(value)
    );
  }

  async clearStorage(key: string) {
    if (key === "key") await AsyncStorage.clear();
  }

  async calculateSize() {
    const keys = await AsyncStorage.getAllKeys();

    let totalSizeInBytes = 0;

    for (const key of keys) {
      const item = await AsyncStorage.getItem(key);
      try {
        if (item) {
          const sizeInBytes = sizeOf(item);
          totalSizeInBytes += sizeInBytes;
        }
      } catch (e) {
        console.log(`Error to get item: ${key}`);
      }
    }

    return totalSizeInBytes;
  }
}

export const LocalStorage = new Storage();
