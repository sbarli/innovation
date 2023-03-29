export class CreateCardDto {
  readonly cardId: string;
  readonly name: string;
  readonly age: number;
  readonly color: string;
  readonly dogmaResource: string;
  readonly resourceTotals: {
    castles: number;
    crowns: number;
    leaves: number;
    lightbulbs: number;
    factories: number;
    timepieces: number;
  };
  readonly resourcesSpaces: {
    resourcesSpace1: string | null;
    resourcesSpace2: string | null;
    resourcesSpace3: string | null;
    resourcesSpace4: string | null;
  };
  readonly dogmaEffects: {
    description: string;
    effectTypes: string[];
    isDemand: boolean;
    isOptional: boolean;
    repeat: boolean;
    specialAchievement: string | null;
  }[];
}
