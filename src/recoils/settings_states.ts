import { atom } from 'recoil';
import { RecoilStorageKeys } from '@/configs/recoil_keys';
import { persistAtom } from '@/utils/recoil_utils';

export interface SettingsStates {
  hasPermissions: boolean;
}

export const defaultSettings: SettingsStates = {
  hasPermissions: false,
};

export const settingsAtom = atom<SettingsStates>({
  key: 'settingsState',
  default: defaultSettings,
  effects_UNSTABLE: [persistAtom<SettingsStates>(RecoilStorageKeys.SETTINGS, defaultSettings)],
});
