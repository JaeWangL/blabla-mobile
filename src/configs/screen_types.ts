export enum ScreenTypes {
  STACK_UN_PERMISSIONED = 'StackUnPermissioned',
  ON_BOARDING = 'Onboarding',

  STACK_PERMISSIONED = 'StackPermissioned',
  ARCHIVES = 'Archives',
  HOME = 'Home',
  SETTINGS = 'Settings',
}

export type UnPermissionedParamsList = {
  [ScreenTypes.ON_BOARDING]: undefined;
};

export type PermissionedParamsList = {
  [ScreenTypes.ARCHIVES]: undefined;
  [ScreenTypes.HOME]: undefined;
  [ScreenTypes.SETTINGS]: undefined;
};

export type RootStackParamList = {
  [ScreenTypes.STACK_UN_PERMISSIONED]: undefined;
  [ScreenTypes.STACK_PERMISSIONED]: undefined;
} & UnPermissionedParamsList &
  PermissionedParamsList;
