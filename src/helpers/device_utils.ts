import * as Application from 'expo-application';
import { Platform } from 'react-native';

export interface DeviceInfo {
  /**
   * 1: Android
   * 2: iOS
   */
  deviceType: 1 | 2;
  deviceId: string;
}

export async function getDeviceInfo(): Promise<DeviceInfo | undefined> {
  let deviceId: string | null;
  if (Platform.OS === 'android') {
    deviceId = Application.androidId;
  } else {
    deviceId = await Application.getIosIdForVendorAsync();
  }
  if (!deviceId) {
    return undefined;
  }

  return {
    deviceType: Platform.OS === 'android' ? 1 : 2,
    deviceId,
  };
}
