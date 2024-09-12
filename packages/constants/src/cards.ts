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

export enum AgeName {
  PREHISTORY = 'PREHISTORY',
  CLASSICAL = 'CLASSICAL',
  MEDIEVAL = 'MEDIEVAL',
  RENAISSANCE = 'RENAISSANCE',
  EXPLORATION = 'EXPLORATION',
  ENLIGHTENMENT = 'ENLIGHTENMENT',
  ROMANCE = 'ROMANCE',
  MODERN = 'MODERN',
  POSTMODERN = 'POSTMODERN',
  INFORMATION = 'INFORMATION',
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

export const ageStringToAgeNumberMap: { [key in AgeString]: number } = {
  [AgeString.ONE]: 1,
  [AgeString.TWO]: 2,
  [AgeString.THREE]: 3,
  [AgeString.FOUR]: 4,
  [AgeString.FIVE]: 5,
  [AgeString.SIX]: 6,
  [AgeString.SEVEN]: 7,
  [AgeString.EIGHT]: 8,
  [AgeString.NINE]: 9,
  [AgeString.TEN]: 10,
};

export const ageStringToAgeNameMap: { [key in AgeString]: AgeName } = {
  [AgeString.ONE]: AgeName.PREHISTORY,
  [AgeString.TWO]: AgeName.CLASSICAL,
  [AgeString.THREE]: AgeName.MEDIEVAL,
  [AgeString.FOUR]: AgeName.RENAISSANCE,
  [AgeString.FIVE]: AgeName.EXPLORATION,
  [AgeString.SIX]: AgeName.ENLIGHTENMENT,
  [AgeString.SEVEN]: AgeName.ROMANCE,
  [AgeString.EIGHT]: AgeName.MODERN,
  [AgeString.NINE]: AgeName.POSTMODERN,
  [AgeString.TEN]: AgeName.INFORMATION,
};

export const ageCostToAchieveMap: { [key in AgeString]?: number } = {
  [AgeString.ONE]: 5,
  [AgeString.TWO]: 10,
  [AgeString.THREE]: 15,
  [AgeString.FOUR]: 20,
  [AgeString.FIVE]: 25,
  [AgeString.SIX]: 30,
  [AgeString.SEVEN]: 35,
  [AgeString.EIGHT]: 40,
  [AgeString.NINE]: 45,
};
