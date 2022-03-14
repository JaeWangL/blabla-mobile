export const colors = {
  primary: '#6C5CE7',
  secondary: '#A29BFE',
  black: '#2D3436',
  gray900: '#636E72',
  gray600: '#888888',
  gray500: '#B2BEC3',
  gray400: '#DFE6E9',
  gray300: '#EDF1F2',
};

export type Colors = typeof colors;

export const defaultTheme = {
  primary: colors.primary,
  secondary: colors.secondary,
  black: colors.black,
  tabInactive: colors.black,
  tabActive: colors.primary,
  backgroundDefault: '#F9F9F9',
  titleDefault: colors.black,
  descDefault: colors.gray500,
  descDark: colors.gray900,
  captionDefault: colors.gray600,
  disabled: colors.gray500,
};

export const zIndices = {
  appbar: 10,
};

export const APPBAR_HEIGHT = 60;
