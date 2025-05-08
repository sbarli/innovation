import { FC } from 'react';

import { Box } from '../gluestack/box';
import { Text } from '../gluestack/text';

export const HeaderCenterText: FC<{ displayText: string }> = ({ displayText }) => {
  return (
    <Box className="justify-center align-center">
      <Text size="lg" className="font-bold text-textLight-100 dark:text-textDark-300">
        {displayText}
      </Text>
    </Box>
  );
};
