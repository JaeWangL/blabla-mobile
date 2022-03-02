export enum LocationSocketDestination {
  // Send
  UPDATE_LOCATION = '/app/location/update',

  // Receive
}

export type LocationSocketParamsList = {
  [LocationSocketDestination.UPDATE_LOCATION]: undefined;
};
