import * as Device from 'expo-device';
import { Platform } from 'react-native';

export interface DeviceInfo {
  /**
   * 1: Android
   * 2: iOS
   */
  deviceType: 1 | 2;
  deviceId: string;
}

export function getDeviceInfo(): DeviceInfo {
  return {
    deviceType: Platform.OS === 'android' ? 1 : 2,
    deviceId: Platform.OS === 'android' ? Device.productName : Device.modelId,
  };
}
