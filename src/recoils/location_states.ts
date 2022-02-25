import { atom } from 'recoil';

// ## -------- LocationStates -------- ##
export interface LocationStates {
  latitude: number;
  longitude: number;
}

export const defaultLocation: LocationStates = {
  latitude: 0,
  longitude: 0,
};

export const locationAtom = atom<LocationStates>({
  key: 'locationState',
  default: defaultLocation,
});
