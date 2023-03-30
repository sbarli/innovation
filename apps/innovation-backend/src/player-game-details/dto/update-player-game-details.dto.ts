class BoardPile {
  readonly cardRefs: string[];
  readonly splayed: 'LEFT' | 'RIGHT' | 'UP';
}

export class UpdatePlayerGameDetailsDto {
  readonly age: number;
  readonly score: number;
  readonly resourceTotals: {
    readonly castles: number;
    readonly crowns: number;
    readonly leaves: number;
    readonly lightbulbs: number;
    readonly factories: number;
    readonly timepieces: number;
  };
  readonly board: {
    blue: BoardPile;
    green: BoardPile;
    purple: BoardPile;
    red: BoardPile;
    yellow: BoardPile;
  };
  readonly achievements: string[];
  readonly hand: string[];
  readonly scoreCardRefs: string[];
  // TODO: add once we have spec achiev data
  // readonly specialAchievements: string[];
}
