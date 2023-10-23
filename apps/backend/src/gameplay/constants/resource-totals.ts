import { Resource } from 'src/shared/constants/cards';
import { ResourceTotals } from 'src/shared/schemas/resource-totals.schema';

export const baseResourceTotals: ResourceTotals = Object.freeze({
  [Resource.CASTLES]: 0,
  [Resource.CROWNS]: 0,
  [Resource.LEAVES]: 0,
  [Resource.LIGHTBULBS]: 0,
  [Resource.FACTORIES]: 0,
  [Resource.TIMEPIECES]: 0,
});
