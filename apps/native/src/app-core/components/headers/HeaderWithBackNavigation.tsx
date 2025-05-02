import { Logout } from '../../../authentication/components/Logout';
import { Username } from '../../../authentication/components/Username';
import { useNavigateBack } from '../../hooks/navigation/useNavigateBack';
import { IHeaderProps } from '../../types/header.types';
import { Box } from '../gluestack/box';
import { Button, ButtonIcon } from '../gluestack/button';
import { Heading } from '../gluestack/heading';
import { HStack } from '../gluestack/hstack';
import { ArrowLeftIcon } from '../gluestack/icon';

export const HeaderWithBackNavigation = ({ showLogout = true, title }: IHeaderProps) => {
  const { navigateBack } = useNavigateBack();
  return (
    <HStack className="bg-primary-500 mb-5 py-2 pl-8 pr-6 justify-between items-center">
      <HStack space="sm" className="items-center">
        <Button onPress={navigateBack} variant="link" size="xl">
          <ButtonIcon as={ArrowLeftIcon} className="text-textLight-100 dark:text-textDark-300" />
        </Button>
        <Heading size="xl" className="m-[0px] text-textLight-100 dark:text-textDark-300">
          {title}
        </Heading>
      </HStack>
      <Box className="justify-center align-center">
        <Username />
        {!!showLogout && <Logout />}
      </Box>
    </HStack>
  );
};
