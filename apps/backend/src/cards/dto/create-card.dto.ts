import { DogmaEffect, ResourceSpaces } from 'src/shared/schemas/card.schema';
import { ResourceTotals } from 'src/shared/schemas/resource-totals.schema';

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
