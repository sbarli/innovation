import { Box, Text } from '@gluestack-ui/themed';

export enum BadgeType {
  DEFAULT = 'default',
  WARNING = 'warning',
}

export interface ICountBadgeProps {
  badgeType: BadgeType;
  count: number;
}

const DEFAULT_BADGE_COLOR = '$green100';
const WARNING_BADGE_COLOR = '$yellow300';

export const CountBadge = ({ badgeType = BadgeType.DEFAULT, count }: ICountBadgeProps) => {
  return (
    <Box
      h="$5"
      w="$5"
      position="absolute"
      bottom="$0"
      borderWidth="$1"
      borderColor="$black"
      justifyContent="center"
      alignItems="center"
      bg={badgeType === BadgeType.WARNING ? WARNING_BADGE_COLOR : DEFAULT_BADGE_COLOR}
    >
      <Text size="xs" fontWeight="$bold">
        {count}
      </Text>
    </Box>
  );
};
