import { DogmaEffect } from '../schemas/dogma-effect.schema';
import { ResourceSpaces } from '../schemas/resource-spaces.schema';
import { ResourceTotals } from '../schemas/resource-totals.schema';

export class CreateCardDto {
  readonly cardId!: string;
  readonly name!: string;
  readonly age!: number;
  readonly color!: string;
  readonly dogmaResource!: string;
  readonly resourceTotals!: ResourceTotals;
  readonly resourcesSpaces!: ResourceSpaces;
  readonly dogmaEffects!: DogmaEffect[];
}
