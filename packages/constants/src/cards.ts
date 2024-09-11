export enum AgeString {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
}

export const ages = [
  AgeString.ONE,
  AgeString.TWO,
  AgeString.THREE,
  AgeString.FOUR,
  AgeString.FIVE,
  AgeString.SIX,
  AgeString.SEVEN,
  AgeString.EIGHT,
  AgeString.NINE,
  AgeString.TEN,
];

export const cardAgeToAgeStringMap: { [key: string]: AgeString } = {
  1: AgeString.ONE,
  2: AgeString.TWO,
  3: AgeString.THREE,
  4: AgeString.FOUR,
  5: AgeString.FIVE,
  6: AgeString.SIX,
  7: AgeString.SEVEN,
  8: AgeString.EIGHT,
  9: AgeString.NINE,
  10: AgeString.TEN,
};

export enum Resource {
  CASTLES = 'castles',
  CROWNS = 'crowns',
  LEAVES = 'leaves',
  LIGHTBULBS = 'lightbulbs',
  FACTORIES = 'factories',
  TIMEPIECES = 'timepieces',
}

export enum Color {
  BLUE = 'blue',
  GREEN = 'green',
  PURPLE = 'purple',
  RED = 'red',
  YELLOW = 'yellow',
}
