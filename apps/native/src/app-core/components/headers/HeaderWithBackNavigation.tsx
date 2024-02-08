import { ArrowLeftIcon, Button, ButtonIcon, HStack, Heading } from '@gluestack-ui/themed';

import { Logout } from '../../../authentication/components/Logout';
import { useNavigateBack } from '../../hooks/navigation/useNavigateBack';
import { IHeaderProps } from '../../types/header.types';

export const HeaderWithBackNavigation = ({ showLogout = true, title }: IHeaderProps) => {
  const { navigateBack } = useNavigateBack();
  return (
    <HStack
      backgroundColor="$primary500"
      marginBottom="$5"
      paddingVertical="$2"
      paddingLeft="$8"
      paddingRight="$6"
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack alignItems="center" space="sm">
        <Button onPress={navigateBack} variant="link" size="xl">
          <ButtonIcon
            color="$textLight100"
            sx={{
              _dark: {
                color: '$textDark300',
              },
            }}
            as={ArrowLeftIcon}
          />
        </Button>
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
      </HStack>
      {!!showLogout && <Logout />}
    </HStack>
  );
};
