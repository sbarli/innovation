import { FC } from 'react';

import { Heading } from '../../../../app-core/components/gluestack/heading';
import { VStack } from '../../../../app-core/components/gluestack/vstack';
import { Player } from '../../../../app-core/types/game.types';

import { Achievements } from './sections/Achievements';
import { Age } from './sections/Age';
import { Hand } from './sections/Hand';
import { Score } from './sections/Score';

export interface ISinglePlayerDetailsProps {
  numCardsInHand: number;
  playerData: Player;
}

export const SinglePlayerDetails: FC<ISinglePlayerDetailsProps> = ({
  numCardsInHand,
  playerData,
}) => {
  return (
    <VStack>
      <Heading size="md">{playerData.username}</Heading>
      <Score score={playerData.metadata.score} />
      <Achievements
        totalNumAchievements={
          playerData.metadata.numAchievements + playerData.metadata.numSpecialAchievements
        }
      />
      <Hand numCardsInHand={numCardsInHand} />
      <Age age={playerData.metadata.age.num} />
    </VStack>
  );
};
