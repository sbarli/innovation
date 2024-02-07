import { Box, HStack, Heading } from '@gluestack-ui/themed';

import { Logout } from '../../../authentication/components/Logout';
import { IHeaderProps } from '../../types/header.types';

export const HeaderNoNav = ({ showLogout = true, title }: IHeaderProps) => {
  return (
    <HStack
      backgroundColor="$primary500"
      marginBottom="$5"
      paddingVertical="$2"
      paddingLeft="$10"
      paddingRight="$8"
      justifyContent="space-between"
    >
      <Box justifyContent="center">
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
      {!!showLogout && <Logout />}
    </HStack>
  );
};
