import React, { forwardRef } from 'react';

import type { VariantProps } from '@gluestack-ui/nativewind-utils';

import { vstackStyle } from './styles';

type IVStackProps = React.ComponentProps<'div'> & VariantProps<typeof vstackStyle>;

const VStack = forwardRef<React.ComponentRef<'div'>, IVStackProps>(function VStack(
  { className, space, reversed, ...props },
  ref
) {
  return (
    <div className={vstackStyle({ space, reversed, class: className })} {...props} ref={ref} />
  );
});

VStack.displayName = 'VStack';

export { VStack };
