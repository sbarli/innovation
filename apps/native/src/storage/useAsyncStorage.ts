import AsyncStorage from '@react-native-async-storage/async-storage';

import { getCatchErrorMessage } from '@inno/utils';

import { StorageKeys } from './storage.constants';

interface ISetItemProps {
  key: StorageKeys;
  shouldStringify?: boolean;
  value: unknown;
}

export const getAsyncStorageItem = async (
  key: StorageKeys,
  shouldParse: boolean = false
): Promise<unknown> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value && shouldParse) {
      return JSON.parse(value);
    }
    return value;
  } catch (error) {
    console.error(
      getCatchErrorMessage(error, `useAsyncStorage.getItem -> Failed to get value for ${key}`)
    );
  }
};

export const setAsyncStorageItem = async ({ key, value }: ISetItemProps): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(
      getCatchErrorMessage(error, `useAsyncStorage.setItem -> Failed to set value for ${key}`)
    );
  }
};
