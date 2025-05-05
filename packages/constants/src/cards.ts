import { Nullable } from './typeUtils';

export enum Age {
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

export enum AgeNum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
}

export enum AgeName {
  ONE = 'PREHISTORY',
  TWO = 'CLASSICAL',
  THREE = 'MEDIEVAL',
  FOUR = 'RENAISSANCE',
  FIVE = 'EXPLORATION',
  SIX = 'ENLIGHTENMENT',
  SEVEN = 'ROMANCE',
  EIGHT = 'MODERN',
  NINE = 'POSTMODERN',
  TEN = 'INFORMATION',
}

export enum AgeAchievementCost {
  ONE = 5,
  TWO = 10,
  THREE = 15,
  FOUR = 20,
  FIVE = 25,
  SIX = 30,
  SEVEN = 35,
  EIGHT = 40,
  NINE = 45,
}

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

export interface IAgeDataItem {
  num: AgeNum;
  str: Age;
  name: AgeName;
  costToAchieve: Nullable<number>;
}

export const AgeData: IAgeDataItem[] = [
  {
    num: AgeNum.ONE,
    str: Age.ONE,
    name: AgeName[Age.ONE],
    costToAchieve: AgeAchievementCost[Age.ONE],
  },
  {
    num: AgeNum.TWO,
    str: Age.TWO,
    name: AgeName[Age.TWO],
    costToAchieve: AgeAchievementCost[Age.TWO],
  },
  {
    num: AgeNum.THREE,
    str: Age.THREE,
    name: AgeName[Age.THREE],
    costToAchieve: AgeAchievementCost[Age.THREE],
  },
  {
    num: AgeNum.FOUR,
    str: Age.FOUR,
    name: AgeName[Age.FOUR],
    costToAchieve: AgeAchievementCost[Age.FOUR],
  },
  {
    num: AgeNum.FIVE,
    str: Age.FIVE,
    name: AgeName[Age.FIVE],
    costToAchieve: AgeAchievementCost[Age.FIVE],
  },
  {
    num: AgeNum.SIX,
    str: Age.SIX,
    name: AgeName[Age.SIX],
    costToAchieve: AgeAchievementCost[Age.SIX],
  },
  {
    num: AgeNum.SEVEN,
    str: Age.SEVEN,
    name: AgeName[Age.SEVEN],
    costToAchieve: AgeAchievementCost[Age.SEVEN],
  },
  {
    num: AgeNum.EIGHT,
    str: Age.EIGHT,
    name: AgeName[Age.EIGHT],
    costToAchieve: AgeAchievementCost[Age.EIGHT],
  },
  {
    num: AgeNum.NINE,
    str: Age.NINE,
    name: AgeName[Age.NINE],
    costToAchieve: AgeAchievementCost[Age.NINE],
  },
  {
    num: AgeNum.TEN,
    str: Age.TEN,
    name: AgeName[Age.TEN],
    costToAchieve: null,
  },
];

export type TAgeDataByAgeStr = { [key in Age]: IAgeDataItem };
export type TAgeDataByAgeNum = { [key in AgeNum]: IAgeDataItem };

export const AgeDataByAgeStr: TAgeDataByAgeStr = AgeData.reduce((acc, item) => {
  acc[item.str] = item;
  return acc;
}, {} as TAgeDataByAgeStr);

export const AgeDataByAgeNum: TAgeDataByAgeNum = AgeData.reduce((acc, item) => {
  acc[item.num] = item;
  return acc;
}, {} as TAgeDataByAgeNum);
