import { PostPreviewDTO } from '../dtos/post_dtos';

export enum ScreenTypes {
  // UnPermissioned
  STACK_UN_PERMISSIONED = 'StackUnPermissioned',
  ON_BOARDING = 'Onboarding',

  // Permissioned
  STACK_PERMISSIONED = 'StackPermissioned',

  STACK_ARCHIVES = 'StackArchives',
  ARCHIVES = 'Archives',

  STACK_HOME = 'StackHome',
  HOME = 'Home',

  STACK_SETTINGS = 'StackSettings',
  SETTINGS = 'Settings',
  INFO_DEVELOPERS = 'InfoDevelopers',

  // Shared by tabs
  SHARED_POST_DETAIL = 'SharedPostDetail',
  SHARED_POST_WRITE = 'SharedPostWrite',
  SHARED_POST_CHAT = 'SharedPostChat',
}

export type UnPermissionedParamsList = {
  [ScreenTypes.ON_BOARDING]: undefined;
};

export type PermissionedParamsList = {
  [ScreenTypes.STACK_ARCHIVES]: undefined;
  [ScreenTypes.STACK_HOME]: undefined;
  [ScreenTypes.STACK_SETTINGS]: undefined;
};

export type ArchivesParamsList = {
  [ScreenTypes.ARCHIVES]: undefined;
  [ScreenTypes.SHARED_POST_DETAIL]: { post: PostPreviewDTO };
  [ScreenTypes.SHARED_POST_WRITE]: undefined;
  [ScreenTypes.SHARED_POST_CHAT]: { post: PostPreviewDTO };
};

export type HomeParamsList = {
  [ScreenTypes.HOME]: undefined;
  [ScreenTypes.SHARED_POST_DETAIL]: { post: PostPreviewDTO };
  [ScreenTypes.SHARED_POST_WRITE]: undefined;
  [ScreenTypes.SHARED_POST_CHAT]: { post: PostPreviewDTO };
};

export type SettingsParamsList = {
  [ScreenTypes.SETTINGS]: undefined;
  [ScreenTypes.INFO_DEVELOPERS]: undefined;
};

export type RootStackParamList = {
  [ScreenTypes.STACK_UN_PERMISSIONED]: undefined;
  [ScreenTypes.STACK_PERMISSIONED]: undefined;
} & UnPermissionedParamsList &
  PermissionedParamsList;
