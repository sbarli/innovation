import { FC } from 'react';

import { Grid, GridItem } from '../../../../app-core/components/gluestack/grid';
import { useGameContext } from '../../../state/GameProvider';

import { UserBoard } from './UserBoard';

export interface IBoardsProps {
  visible: boolean;
}

/**
 * NOTE: this is the ideal solution, but GlueStack's GRID component is ultra buggy still
 * TODO: replace Boards with this version once GRID is out of Alpha
 */
export const GridBoards: FC<IBoardsProps> = ({ visible }) => {
  const { players, boards } = useGameContext();

  if (!players || !boards || !visible) {
    return null;
  }

  return (
    <Grid
      className="gap-1"
      _extra={{
        className: 'grid-cols-12',
      }}
    >
      {Object.keys(players).map((pid) =>
        boards[pid] ? (
          <GridItem
            key={`${pid}-board`}
            _extra={{
              className: 'col-span-6',
            }}
          >
            <UserBoard board={boards[pid]} username={players[pid].username} />
          </GridItem>
        ) : null
      )}
    </Grid>
  );
};
