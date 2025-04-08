import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

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
      className={` ${badgeType === BadgeType.WARNING ? WARNING_BADGE_COLOR : DEFAULT_BADGE_COLOR} h-5 w-5 absolute bottom-0 border-1 border-black justify-center items-center `}
    >
      <Text size="xs" className="font-bold">
        {count}
      </Text>
    </Box>
  );
};
