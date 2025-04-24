'use client';
import React, { forwardRef } from 'react';

import { Overlay } from '@gluestack-ui/overlay';
import { cssInterop } from 'nativewind';

cssInterop(Overlay, { className: 'style' });

const Portal = forwardRef<React.ComponentRef<typeof Overlay>, React.ComponentProps<typeof Overlay>>(
  function Portal({ ...props }, ref) {
    return <Overlay {...props} ref={ref} />;
  }
);

Portal.displayName = 'Portal';

export { Portal };
