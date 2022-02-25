export enum LocationSocketTypes {
  // Send
  UPDATE_LOCATION = 'updateLocation',

  // Receive
}

export type LocationSocketParamsList = {
  [LocationSocketTypes.UPDATE_LOCATION]: undefined;
};
