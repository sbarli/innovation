'use client';
import React, { forwardRef } from 'react';

import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { withStyleContext } from '@gluestack-ui/nativewind-utils/withStyleContext';
import { createPressable } from '@gluestack-ui/pressable';
import { Pressable as RNPressable } from 'react-native';

const UIPressable = createPressable({
  Root: withStyleContext(RNPressable),
});

const pressableStyle = tva({
  base: 'data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40',
});

type IPressableProps = Omit<React.ComponentProps<typeof UIPressable>, 'context'> &
  VariantProps<typeof pressableStyle>;
const Pressable = forwardRef<React.ComponentRef<typeof UIPressable>, IPressableProps>(
  function Pressable({ className, ...props }, ref) {
    return (
      <UIPressable
        {...props}
        ref={ref}
        className={pressableStyle({
          class: className,
        })}
      />
    );
  }
);

Pressable.displayName = 'Pressable';
export { Pressable };
