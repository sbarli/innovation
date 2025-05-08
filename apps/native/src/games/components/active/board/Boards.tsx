import { FC } from 'react';

import { Box } from '../../../../app-core/components/gluestack/box';
import { HStack } from '../../../../app-core/components/gluestack/hstack';
import { useGameContext } from '../../../state/GameProvider';

import { UserBoard } from './UserBoard';

export interface IBoardsProps {
  visible: boolean;
}

export const Boards: FC<IBoardsProps> = ({ visible }) => {
  const { players, boards } = useGameContext();

  if (!players || !boards || !visible) {
    return null;
  }

  const playerIds = Object.keys(players);
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
