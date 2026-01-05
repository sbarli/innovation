import { FC } from 'react';

import { Box } from '../../../../app-core/components/gluestack/box';
import { HStack } from '../../../../app-core/components/gluestack/hstack';
import { useAuthContext } from '../../../../authentication/state/AuthProvider';
import { useGameContext } from '../../../state/GameProvider';

import { UserBoard } from './UserBoard';

export interface IBoardsProps {
  visible: boolean;
}

export const Boards: FC<IBoardsProps> = ({ visible }) => {
  const { user } = useAuthContext();
  const { players, boards } = useGameContext();

  if (!players || !boards || !visible) {
    return null;
  }

  // NOTE: pushes logged in player's board to top so logged in player always sees their board first
  const playerIds = Object.keys(players).reduce((acc, pid) => {
    if (pid === user?._id) {
      acc.unshift(pid);
    } else {
      acc.push(pid);
    }
    return acc;
  }, [] as string[]);
  const playerSet1 = playerIds.slice(0, 2);
  const playerSet2 = playerIds.slice(2);

  return (
    <Box>
      {playerSet1 ? (
        <HStack space="sm" className="justify-evenly">
          {playerSet1.map((pid) =>
            boards[pid] ? (
              <UserBoard
                key={`${pid}-board`}
                board={boards[pid]}
                username={players[pid].username}
              />
            ) : null
          )}
        </HStack>
      ) : null}
      {playerSet2 ? (
        <HStack space="sm">
          {playerSet2.map((pid) =>
            boards[pid] ? (
              <UserBoard
                key={`${pid}-board`}
                board={boards[pid]}
                username={players[pid].username}
              />
            ) : null
          )}
        </HStack>
      ) : null}
    </Box>
  );
};
