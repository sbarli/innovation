import { Logout } from '../../../authentication/components/Logout';
import { IHeaderProps } from '../../types/header.types';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';

export const HeaderNoNav = ({ showLogout = true, title }: IHeaderProps) => {
  return (
    <HStack className="bg-primary-500 mb-5 py-2 pl-10 pr-8 justify-between">
      <Box className="justify-center">
        <Heading size="xl" className="m-[0px] text-textLight-100 dark:text-textDark-300">
          {title}
        </Heading>
      </Box>
      {!!showLogout && <Logout />}
    </HStack>
  );
};
