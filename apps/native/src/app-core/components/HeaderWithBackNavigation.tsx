import { ArrowLeftIcon, Box, Button, ButtonIcon, HStack, Heading } from '@gluestack-ui/themed';

import { useNavigateBack } from '../hooks/navigation/useNavigateBack';

export interface INavigationHeaderProps {
  title: string;
}

export const HeaderWithBackNavigation = ({ title }: INavigationHeaderProps) => {
  const { navigateBack } = useNavigateBack();
  return (
    <HStack backgroundColor="$primary500" marginBottom="$5" paddingVertical="$2">
      <Box paddingHorizontal="$5">
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
      </Box>
      <Box w="$full" justifyContent="center">
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
