import { Nullable } from '@inno/constants';
import { AgeAchievements, PlayerGameDetailsFragment } from '@inno/gql';

import {
  AgeAchievementKey,
  AgeAchievements as FormattedAgeAchievements,
} from '../../app-core/types/game.types';

const getAchievementClaimedBy = ({
  achievementCardRef,
  playersGameData,
}: {
  achievementCardRef: string;
  playersGameData: PlayerGameDetailsFragment[];
}): Nullable<string> => {
  return (
    playersGameData.find((item) => item.ageAchievements.includes(achievementCardRef))?.playerRef ??
    null
  );
};

export interface IFormatAgeAchievementsMetadataProps {
  gameAgeAchievemnts: AgeAchievements;
  playersGameData: PlayerGameDetailsFragment[];
}

export const formatAgeAchievementsMetadata = ({
  gameAgeAchievemnts,
  playersGameData,
}: IFormatAgeAchievementsMetadataProps): FormattedAgeAchievements => {
  return Object.entries(gameAgeAchievemnts).reduce((formattedData, [key, cardRef]) => {
    if (key in AgeAchievementKey) {
      formattedData[key as AgeAchievementKey] = {
        card: cardRef,
        claimedBy: getAchievementClaimedBy({
          achievementCardRef: cardRef,
          playersGameData,
        }),
      };
    }
    return formattedData;
  }, {} as FormattedAgeAchievements);
};
