declare module '*.svg' {
  import { SFC } from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: SFC<SvgProps>;
  export default content;
}

declare module '*.json' {
  const content;
  export default content;
}

declare module '*.png' {
  const content;
  export default content;
}
