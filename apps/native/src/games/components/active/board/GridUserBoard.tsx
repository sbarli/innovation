import { FC } from 'react';

import { Color } from '@inno/constants';

import { Grid, GridItem } from '../../../../app-core/components/gluestack/grid';
import { Heading } from '../../../../app-core/components/gluestack/heading';
import { Board } from '../../../../app-core/types/game.types';

import { BoardPile } from './BoardPile';

export interface IUserBoardProps {
  board: Board;
  username: string;
}
/**
 * NOTE: this is the ideal solution, but GlueStack's GRID component is ultra buggy still
 * TODO: replace UserBoard with this version once GRID is out of Alpha
 */
export const GridUserBoard: FC<IUserBoardProps> = ({ board, username }) => {
  return (
    <>
      <Heading size="xl">{username}</Heading>
      <Grid
        className="gap-3 w-[100%] margin-left-50 margin-right-50"
        _extra={{
          className: 'grid-cols-12',
        }}
      >
        {Object.values(Color).map((color) => (
          <GridItem
            key={`${username}-board-pile-${color}`}
            _extra={{
              className: 'col-span-6',
            }}
          >
            <BoardPile color={color} pile={board[color]} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
