import { AtomEffect } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function persistAtom<T>(key: string, initialValue: T): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    setSelf(
      AsyncStorage.getItem(key).then((savedValue) => (savedValue != null ? JSON.parse(savedValue) : initialValue)),
    );

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      if (isReset) {
        AsyncStorage.removeItem(key);
        return;
      }

      AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}
