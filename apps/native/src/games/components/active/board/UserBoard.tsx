import { FC } from 'react';

import { Color } from '@inno/constants';

import { Heading } from '../../../../app-core/components/gluestack/heading';
import { HStack } from '../../../../app-core/components/gluestack/hstack';
import { VStack } from '../../../../app-core/components/gluestack/vstack';
import { Board } from '../../../../app-core/types/game.types';

import { BoardPile } from './BoardPile';

export interface IUserBoardProps {
  board: Board;
  username: string;
}

export const UserBoard: FC<IUserBoardProps> = ({ board, username }) => {
  return (
    <VStack space="lg">
      <Heading size="xl">{`${username}'s Board`}</Heading>
      <HStack space="2xl">
        <BoardPile color={Color.BLUE} pile={board[Color.BLUE]} />
        <BoardPile color={Color.GREEN} pile={board[Color.GREEN]} />
      </HStack>
      <HStack space="2xl">
        <BoardPile color={Color.PURPLE} pile={board[Color.PURPLE]} />
        <BoardPile color={Color.RED} pile={board[Color.RED]} />
      </HStack>
      <HStack space="2xl">
        <BoardPile color={Color.YELLOW} pile={board[Color.YELLOW]} />
      </HStack>
    </VStack>
  );
};
