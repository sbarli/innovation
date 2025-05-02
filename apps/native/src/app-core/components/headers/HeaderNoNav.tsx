import { Logout } from '../../../authentication/components/Logout';
import { Username } from '../../../authentication/components/Username';
import { IHeaderProps } from '../../types/header.types';
import { Box } from '../gluestack/box';
import { Heading } from '../gluestack/heading';
import { HStack } from '../gluestack/hstack';

export const HeaderNoNav = ({ showLogout = true, title }: IHeaderProps) => {
  return (
    <HStack className="bg-primary-500 mb-5 py-2 pl-10 pr-8 justify-between">
      <Box className="justify-center">
        <Heading size="xl" className="m-[0px] text-textLight-100 dark:text-textDark-300">
          {title}
        </Heading>
      </Box>
      <Box className="justify-center align-center">
        <Username />
        {!!showLogout && <Logout />}
      </Box>
    </HStack>
  );
};
