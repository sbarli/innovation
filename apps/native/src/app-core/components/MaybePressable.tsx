import { PropsWithChildren } from 'react';

import { Pressable } from './gluestack/pressable';

interface IMaybePressableProps extends PropsWithChildren {
  handlePress?(): void;
}

export const MaybePressable = ({ children, handlePress }: IMaybePressableProps) => {
  if (!handlePress) {
    return children;
  }
  return <Pressable onPress={handlePress}>{children}</Pressable>;
};
