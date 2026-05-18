export enum EffectType {
  ACHIEVE = 'achieve',
  DRAW = 'draw',
  END = 'end',
  EXCHANGE = 'exchange',
  EXECUTE = 'execute',
  MELD = 'meld',
  REARRANGE = 'rearrange',
  REMOVE = 'remove',
  RETURN = 'return',
  REVEAL = 'reveal',
  SCORE = 'score',
  SPLAY = 'splay',
  TRANSFER = 'transfer',
  TUCK = 'tuck',
  UNSPLAY = 'unsplay',
}

export enum SpecialAchievement {
  EMPIRE = 'Empire',
  MONUMENT = 'Monument',
  UNIVERSE = 'Universe',
  WONDER = 'Wonder',
  WORLD = 'World',
}

export type SplayDirection = 'left' | 'right' | 'up';

export interface DogmaEffect {
  description: string;
  effectTypes: EffectType[];
  isDemand: boolean;
  isOptional: boolean;
  repeat: boolean;
  specialAchievement: SpecialAchievement | null;
}
