import { ActionNumber, Age, GameStage, IAgeDataItem, Nullable } from '@inno/constants';
import { BoardPile as GQLBoardPile, Board as GQLBoard, Deck as GQLDeck, Card } from '@inno/gql';

export enum AgeAchievementKey {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
}

// export enum Card {
//   WRITING = 'Writing',
//   CLOTHING = 'Clothing',
//   MASONRY = 'Masonry',
//   METALWORKING = 'Metalworking',
//   CODE_OF_LAWS = 'Code of Laws',
//   SAILING = 'Sailing',
//   POTTERY = 'Pottery',
//   OARS = 'Oars',
//   ARCHERY = 'Archery',
//   AGRICULTURE = 'Agriculture',
//   MYSTICISM = 'Mysticism',
//   CITY_STATES = 'City States',
//   DOMESTICATION = 'Domestication',
//   TOOLS = 'Tools',
//   THE_WHEEL = 'The Wheel',
//   CURRENCY = 'Currency',
//   CANAL_BUILDING = 'Canal Building',
//   MONOTHEISM = 'Monotheism',
//   ROAD_BUILDING = 'Road Building',
//   CONSTRUCTION = 'Construction',
//   FERMENTING = 'Fermenting',
//   CALENDAR = 'Calendar',
//   PHILOSOPHY = 'Philosophy',
//   MATHEMATICS = 'Mathematics',
//   MAPMAKING = 'Mapmaking',
//   PAPER = 'Paper',
//   ENGINEERING = 'Engineering',
//   TRANSLATION = 'Translation',
//   FEUDALISM = 'Feudalism',
//   MACHINERY = 'Machinery',
//   MEDICINE = 'Medicine',
//   OPTICS = 'Optics',
//   COMPASS = 'Compass',
//   EDUCATION = 'Education',
//   ALCHEMY = 'Alchemy',
//   GUNPOWDER = 'Gunpowder',
//   INVENTION = 'Invention',
//   COLONIALISM = 'Colonialism',
//   REFORMATION = 'Reformation',
//   ANATOMY = 'Anatomy',
//   ENTERPRISE = 'Enterprise',
//   PERSPECTIVE = 'Perspective',
//   NAVIGATION = 'Navigation',
//   PRINTING_PRESS = 'Printing Press',
//   EXPERIMENTATION = 'Experimentation',
//   ASTRONOMY = 'Astronomy',
//   MEASUREMENT = 'Measurement',
//   STATISTICS = 'Statistics',
//   CHEMISTRY = 'Chemistry',
//   COAL = 'Coal',
//   THE_PIRATE_CODE = 'The Pirate Code',
//   STEAM_ENGINE = 'Steam Engine',
//   BANKING = 'Banking',
//   PHYSICS = 'Physics',
//   SOCIETIES = 'Societies',
//   ATOMIC_THEORY = 'Atomic Theory',
//   EMANCIPATION = 'Emancipation',
//   VACCINATION = 'Vaccination',
//   CLASSIFICATION = 'Classification',
//   METRIC_SYSTEM = 'Metric System',
//   ENCYCLOPEDIA = 'Encyclopedia',
//   MACHINE_TOOLS = 'Machine Tools',
//   INDUSTRIALIZATION = 'Industrialization',
//   DEMOCRACY = 'Democracy',
//   CANNING = 'Canning',
//   COMBUSTION = 'Combustion',
//   BICYCLE = 'Bicycle',
//   EVOLUTION = 'Evolution',
//   SANITATION = 'Sanitation',
//   EXPLOSIVES = 'Explosives',
//   ELECTRICITY = 'Electricity',
//   PUBLICATIONS = 'Publications',
//   LIGHTING = 'Lighting',
//   RAILROAD = 'Railroad',
//   REFRIGERATION = 'Refrigeration',
//   ANTIBIOTICS = 'Antibiotics',
//   MOBILITY = 'Mobility',
//   FLIGHT = 'Flight',
//   ROCKETRY = 'Rocketry',
//   SKYSCRAPERS = 'Skyscrapers',
//   SOCIALISM = 'Socialism',
//   CORPORATIONS = 'Corporations',
//   MASS_MEDIA = 'Mass Media',
//   EMPIRICISM = 'Empiricism',
//   QUANTUM_THEORY = 'Quantum Theory',
//   COMPUTERS = 'Computers',
//   COLLABORATION = 'Collaboration',
//   GENETICS = 'Genetics',
//   SERVICES = 'Services',
//   SPECIALIZATION = 'Specialization',
//   SUBURBIA = 'Suburbia',
//   ECOLOGY = 'Ecology',
//   FISSION = 'Fission',
//   SATELLITES = 'Satellites',
//   COMPOSITES = 'Composites',
//   ROBOTICS = 'Robotics',
//   BIOENGINEERING = 'Bioengineering',
//   DATABASES = 'Databases',
//   MINIATURIZATION = 'Miniaturization',
//   SOFTWARE = 'Software',
//   SELF_SERVICE = 'Self Service',
//   AI = 'A.I.',
//   STEM_CELLS = 'Stem Cells',
//   GLOBALIZATION = 'Globalization',
//   THE_INTERNET = 'The Internet',
// }

// export type CardId = keyof typeof Card;

export type Cards = Record<string, Card>;

export type AgeAchievement = {
  card: string;
  claimedBy: Nullable<string>;
};

export enum SpecialAchievementName {
  MONUMENT = 'Monument',
  EMPIRE = 'Empire',
  WORLD = 'World',
  WONDER = 'Wonder',
  UNIVERSE = 'Universe',
}

export type SpecialAchievement = {
  name: SpecialAchievementName;
  claimedBy: Nullable<string>;
};

export enum Resource {
  CASTLES = 'castles',
  CROWNS = 'crowns',
  LEAVES = 'leaves',
  LIGHTBULBS = 'lightbulbs',
  FACTORIES = 'factories',
  TIMEPIECES = 'timepieces',
}

export type ResourceTotals = Record<Resource, number>;

export type PossibleActions = {
  draw: Nullable<Age>;
  meld: string[];
  dogma: string[];
  achieve: string[];
};

export type PlayerMetadata = {
  age: IAgeDataItem;
  score: number;
  resourceTotals: ResourceTotals;
  possibleActions: PossibleActions;
  numAchievements: number;
  numSpecialAchievements: number;
};

export type BoardPile = Omit<GQLBoardPile, '__typename'>;

export type BoardKey = keyof Omit<GQLBoard, '__typename'>;

export type Board = Record<BoardKey, BoardPile>;

export type Boards = Record<string, Board>;

export type Hand = string[];

export type Hands = Record<string, Hand>;

export type Player = {
  detailsRecordRef: string;
  metadata: PlayerMetadata;
  playerId: string;
  username: string;
};

export type GameStatus = {
  currentActionNumber: ActionNumber;
  currentPlayerId: string;
  stage: GameStage;
  winnerId: Nullable<string>;
};

export type AgeAchievements = Record<AgeAchievementKey, AgeAchievement>;
export type Deck = Omit<GQLDeck, '__typename'>;
export type Players = Record<string, Player>;
export type SpecialAchievements = Record<SpecialAchievementName, SpecialAchievement>;

export type Game = {
  ageAchievements: AgeAchievements;
  deck: Deck;
  players: Players;
  specialAchievements: SpecialAchievements;
  status: GameStatus;
};
