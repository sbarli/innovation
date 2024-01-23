import { Box } from '@gluestack-ui/themed';

import { useSocketContext } from '../../websockets/SocketProvider';
import { NewRoomForm } from '../forms/NewRoomForm';

export const NewRoomScreen = () => {
  const { socket } = useSocketContext();
  return (
    <Box alignItems="center">
      <NewRoomForm socket={socket} />
    </Box>
  );
};
