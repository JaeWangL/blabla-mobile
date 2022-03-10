import { PostPreviewDTO } from '../dtos/post_dtos';

export enum ScreenTypes {
  // UnPermissioned
  STACK_UN_PERMISSIONED = 'StackUnPermissioned',
  ON_BOARDING = 'Onboarding',

  // Permissioned
  STACK_PERMISSIONED = 'StackPermissioned',

  STACK_ARCHIVES = 'StackArchives',
  ARCHIVES = 'Archives',
  ARCHIVES_POST_DETAIL = 'ArchivesPostDetail',
  ARCHIVES_POST_WRITE = 'ArchivesPostWrite',
  ARCHIVES_POST_CHAT = 'ArchivesPostChat',

  STACK_HOME = 'StackHome',
  HOME = 'Home',
  HOME_POST_DETAIL = 'HomePostDetail',
  HOME_POST_WRITE = 'HomePostWrite',
  HOME_POST_CHAT = 'HomePostChat',

  SETTINGS = 'Settings',
}

export type UnPermissionedParamsList = {
  [ScreenTypes.ON_BOARDING]: undefined;
};

export type PermissionedParamsList = {
  [ScreenTypes.STACK_ARCHIVES]: undefined;
  [ScreenTypes.STACK_HOME]: undefined;
  [ScreenTypes.SETTINGS]: undefined;
};

export type ArchivesParamsList = {
  [ScreenTypes.ARCHIVES]: undefined;
  [ScreenTypes.ARCHIVES_POST_DETAIL]: { post: PostPreviewDTO };
  [ScreenTypes.ARCHIVES_POST_WRITE]: undefined;
  [ScreenTypes.ARCHIVES_POST_CHAT]: { post: PostPreviewDTO };
};

export type HomeParamsList = {
  [ScreenTypes.HOME]: undefined;
  [ScreenTypes.HOME_POST_DETAIL]: { post: PostPreviewDTO };
  [ScreenTypes.HOME_POST_WRITE]: undefined;
  [ScreenTypes.HOME_POST_CHAT]: { post: PostPreviewDTO };
};

export type RootStackParamList = {
  [ScreenTypes.STACK_UN_PERMISSIONED]: undefined;
  [ScreenTypes.STACK_PERMISSIONED]: undefined;
} & UnPermissionedParamsList &
  PermissionedParamsList;
