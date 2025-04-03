import { Nullable } from '@inno/constants';
import { PlayerGameDetailsFragment } from '@inno/gql';

import { SpecialAchievementName, SpecialAchievements } from '../../app-core/types/game.types';

const getAchievementClaimedBy = ({
  achivementName,
  playersGameData,
}: {
  achivementName: SpecialAchievementName;
  playersGameData: PlayerGameDetailsFragment[];
}): Nullable<string> => {
  return (
    playersGameData.find((item) => item.specialAchievements.includes(achivementName))?.playerRef ??
    null
  );
};

export const formatSpecialAchievementsMetadata = (
  playersGameData: PlayerGameDetailsFragment[]
): SpecialAchievements => {
  return Object.values(SpecialAchievementName).reduce((formatted, name) => {
    formatted[name] = {
      name,
      claimedBy: getAchievementClaimedBy({
        achivementName: name,
        playersGameData,
      }),
    };
    return formatted;
  }, {} as SpecialAchievements);
};
