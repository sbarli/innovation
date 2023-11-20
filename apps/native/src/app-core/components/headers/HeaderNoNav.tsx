import { Box, HStack, Heading } from '@gluestack-ui/themed';

import { IHeaderProps } from '../../types/header.types';

export const HeaderNoNav = ({ title }: IHeaderProps) => {
  return (
    <HStack backgroundColor="$primary500" marginBottom="$5" paddingVertical="$2">
      <Box w="$full" justifyContent="center" paddingLeft="$10">
        <Heading
          margin={0}
          size="xl"
          color="$textLight100"
          sx={{
            _dark: {
              color: '$textDark300',
            },
          }}
        >
          {title}
        </Heading>
      </Box>
    </HStack>
  );
};
