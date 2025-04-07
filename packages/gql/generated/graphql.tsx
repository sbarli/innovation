import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

export type AccessTokenPayload = {
  __typename?: 'AccessTokenPayload';
  authToken: Scalars['String']['output'];
};

export type AgeAchievements = {
  __typename?: 'AgeAchievements';
  EIGHT: Scalars['ID']['output'];
  FIVE: Scalars['ID']['output'];
  FOUR: Scalars['ID']['output'];
  NINE: Scalars['ID']['output'];
  ONE: Scalars['ID']['output'];
  SEVEN: Scalars['ID']['output'];
  SIX: Scalars['ID']['output'];
  THREE: Scalars['ID']['output'];
  TWO: Scalars['ID']['output'];
};

export type AgeAchievementsInput = {
  EIGHT: Scalars['ID']['input'];
  FIVE: Scalars['ID']['input'];
  FOUR: Scalars['ID']['input'];
  NINE: Scalars['ID']['input'];
  ONE: Scalars['ID']['input'];
  SEVEN: Scalars['ID']['input'];
  SIX: Scalars['ID']['input'];
  THREE: Scalars['ID']['input'];
  TWO: Scalars['ID']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserWithoutPassword;
};

export type Board = {
  __typename?: 'Board';
  blue: BoardPile;
  green: BoardPile;
  purple: BoardPile;
  red: BoardPile;
  yellow: BoardPile;
};

export type BoardInput = {
  blue: BoardPileInput;
  green: BoardPileInput;
  purple: BoardPileInput;
  red: BoardPileInput;
  yellow: BoardPileInput;
};

export type BoardPile = {
  __typename?: 'BoardPile';
  cardRefs: Array<Scalars['ID']['output']>;
  splayed?: Maybe<SplayOption>;
};

export type BoardPileInput = {
  cardRefs: Array<Scalars['ID']['input']>;
  splayed?: InputMaybe<SplayOption>;
};

export type Card = {
  __typename?: 'Card';
  _id: Scalars['ID']['output'];
  age: Scalars['Int']['output'];
  cardId: Scalars['String']['output'];
  color: Scalars['String']['output'];
  dogmaEffects: Array<DogmaEffect>;
  dogmaResource: Scalars['String']['output'];
  name: Scalars['String']['output'];
  resourceSpaces: ResourceSpaces;
  resourceTotals: ResourceTotals;
};

export type CardIdAndRef = {
  __typename?: 'CardIdAndRef';
  cardId: Scalars['String']['output'];
  ref: Scalars['ID']['output'];
};

export type CardIdAndRefByAge = {
  __typename?: 'CardIdAndRefByAge';
  EIGHT: Array<CardIdAndRef>;
  FIVE: Array<CardIdAndRef>;
  FOUR: Array<CardIdAndRef>;
  NINE: Array<CardIdAndRef>;
  ONE: Array<CardIdAndRef>;
  SEVEN: Array<CardIdAndRef>;
  SIX: Array<CardIdAndRef>;
  TEN: Array<CardIdAndRef>;
  THREE: Array<CardIdAndRef>;
  TWO: Array<CardIdAndRef>;
};

export type CardRefsByAge = {
  __typename?: 'CardRefsByAge';
  EIGHT: Array<Scalars['String']['output']>;
  FIVE: Array<Scalars['String']['output']>;
  FOUR: Array<Scalars['String']['output']>;
  NINE: Array<Scalars['String']['output']>;
  ONE: Array<Scalars['String']['output']>;
  SEVEN: Array<Scalars['String']['output']>;
  SIX: Array<Scalars['String']['output']>;
  TEN: Array<Scalars['String']['output']>;
  THREE: Array<Scalars['String']['output']>;
  TWO: Array<Scalars['String']['output']>;
};

export type CloseRoomResponse = {
  __typename?: 'CloseRoomResponse';
  success: Scalars['Boolean']['output'];
};

export type CreateGameInput = {
  ageAchievements: AgeAchievementsInput;
  currentActionNumber: Scalars['Float']['input'];
  currentPlayerRef: Scalars['ID']['input'];
  deck: DeckInput;
  playerRefs: Array<Scalars['ID']['input']>;
  roomRef: Scalars['ID']['input'];
  stage: Scalars['String']['input'];
};

export type CreateNewGameInput = {
  playerRefs: Array<Scalars['String']['input']>;
  roomRef: Scalars['String']['input'];
};

export type CreateNewGameResponse = {
  __typename?: 'CreateNewGameResponse';
  gameId: Scalars['ID']['output'];
};

export type CreatePlayerGameDetailsInput = {
  ageAchievements: Array<Scalars['ID']['input']>;
  board: BoardInput;
  gameRef: Scalars['ID']['input'];
  hand: Array<Scalars['ID']['input']>;
  playerRef: Scalars['ID']['input'];
  scorePile: Array<Scalars['ID']['input']>;
  specialAchievements: Array<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoomInput = {
  roomName: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Deck = {
  __typename?: 'Deck';
  EIGHT: Array<Scalars['ID']['output']>;
  FIVE: Array<Scalars['ID']['output']>;
  FOUR: Array<Scalars['ID']['output']>;
  NINE: Array<Scalars['ID']['output']>;
  ONE: Array<Scalars['ID']['output']>;
  SEVEN: Array<Scalars['ID']['output']>;
  SIX: Array<Scalars['ID']['output']>;
  TEN: Array<Scalars['ID']['output']>;
  THREE: Array<Scalars['ID']['output']>;
  TWO: Array<Scalars['ID']['output']>;
};

export type DeckInput = {
  EIGHT: Array<Scalars['ID']['input']>;
  FIVE: Array<Scalars['ID']['input']>;
  FOUR: Array<Scalars['ID']['input']>;
  NINE: Array<Scalars['ID']['input']>;
  ONE: Array<Scalars['ID']['input']>;
  SEVEN: Array<Scalars['ID']['input']>;
  SIX: Array<Scalars['ID']['input']>;
  TEN: Array<Scalars['ID']['input']>;
  THREE: Array<Scalars['ID']['input']>;
  TWO: Array<Scalars['ID']['input']>;
};

export type DogmaEffect = {
  __typename?: 'DogmaEffect';
  description: Scalars['String']['output'];
  effectTypes: Array<Scalars['String']['output']>;
  isDemand: Scalars['Boolean']['output'];
  isOptional: Scalars['Boolean']['output'];
  repeat: Scalars['Boolean']['output'];
  specialAchievement?: Maybe<Scalars['String']['output']>;
};

export type FindOneOptionsInput = {
  searchField: Scalars['String']['input'];
  searchValue: Scalars['String']['input'];
};

export type Game = {
  __typename?: 'Game';
  _id: Scalars['ID']['output'];
  ageAchievements: AgeAchievements;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currentActionNumber: Scalars['Float']['output'];
  currentPlayerRef: Scalars['ID']['output'];
  deck: Deck;
  playerRefs: Array<Scalars['ID']['output']>;
  roomRef: Scalars['ID']['output'];
  stage: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  winnerRef?: Maybe<Scalars['ID']['output']>;
};

export type GetUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MeldInput = {
  cardRef: Scalars['ID']['input'];
  gameRef: Scalars['ID']['input'];
  meldType: Scalars['String']['input'];
  playerRef: Scalars['ID']['input'];
};

export type MeldResponse = {
  __typename?: 'MeldResponse';
  gameId: Scalars['ID']['output'];
  metadata: MeldResponseMetadata;
  playerId: Scalars['ID']['output'];
  updatedPlayerBoard: Board;
};

export type MeldResponseMetadata = {
  __typename?: 'MeldResponseMetadata';
  updatedDeck: Deck;
  updatedPlayerHand: Array<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlayerToRoom?: Maybe<Room>;
  closeRoom: CloseRoomResponse;
  createNewGame: Game;
  createPlayerGameDetails: PlayerGameDetails;
  createRoom: Room;
  meld: MeldResponse;
  newGame: CreateNewGameResponse;
  refreshToken: AccessTokenPayload;
  signup: AuthResponse;
  updateGame?: Maybe<Game>;
  updatePlayerGameDetails?: Maybe<PlayerGameDetails>;
  updateRoomAvailability?: Maybe<Room>;
};


export type MutationAddPlayerToRoomArgs = {
  roomId: Scalars['String']['input'];
};


export type MutationCloseRoomArgs = {
  roomId: Scalars['String']['input'];
};


export type MutationCreateNewGameArgs = {
  newGameData: CreateGameInput;
};


export type MutationCreatePlayerGameDetailsArgs = {
  createData: CreatePlayerGameDetailsInput;
};


export type MutationCreateRoomArgs = {
  newRoomData: CreateRoomInput;
};


export type MutationMeldArgs = {
  meldInput: MeldInput;
};


export type MutationNewGameArgs = {
  newGameDto: CreateNewGameInput;
};


export type MutationSignupArgs = {
  newUserData: CreateUserInput;
};


export type MutationUpdateGameArgs = {
  id: Scalars['ID']['input'];
  updates: UpdateGameInput;
};


export type MutationUpdatePlayerGameDetailsArgs = {
  id: Scalars['ID']['input'];
  updates: UpdatePlayerGameDetailsInput;
};


export type MutationUpdateRoomAvailabilityArgs = {
  data: UpdateRoomAvailabilityInput;
};

export type PlayerGameDetails = {
  __typename?: 'PlayerGameDetails';
  _id: Scalars['ID']['output'];
  ageAchievements: Array<Scalars['ID']['output']>;
  board: Board;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gameRef: Scalars['ID']['output'];
  hand: Array<Scalars['ID']['output']>;
  playerRef: Scalars['ID']['output'];
  scorePile: Array<Scalars['ID']['output']>;
  specialAchievements: Array<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllCards: Array<Card>;
  getCardIdAndRefByAge: CardIdAndRefByAge;
  getCardRefsByAge: CardRefsByAge;
  getDetailsByGame: Array<PlayerGameDetails>;
  getGame?: Maybe<Game>;
  getOneCard?: Maybe<Card>;
  getPlayerGameDetails?: Maybe<PlayerGameDetails>;
  getPlayerGameDetailsById?: Maybe<PlayerGameDetails>;
  getPlayerGameDetailsWithUser?: Maybe<PlayerGameDetails>;
  getRoom?: Maybe<Room>;
  getRoomsForPlayer?: Maybe<Array<Room>>;
  isAuthenticated: UserWithoutPassword;
  login: AuthResponse;
};


export type QueryGetDetailsByGameArgs = {
  gameRef: Scalars['ID']['input'];
};


export type QueryGetGameArgs = {
  gameId: Scalars['ID']['input'];
};


export type QueryGetOneCardArgs = {
  options: FindOneOptionsInput;
};


export type QueryGetPlayerGameDetailsArgs = {
  gameRef: Scalars['ID']['input'];
  playerRef: Scalars['ID']['input'];
};


export type QueryGetPlayerGameDetailsByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPlayerGameDetailsWithUserArgs = {
  gameRef: Scalars['ID']['input'];
  playerRef: Scalars['ID']['input'];
};


export type QueryGetRoomArgs = {
  roomId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  loginUserInput: GetUserInput;
};

export type ResourceSpaces = {
  __typename?: 'ResourceSpaces';
  resourceSpace1?: Maybe<Scalars['String']['output']>;
  resourceSpace2?: Maybe<Scalars['String']['output']>;
  resourceSpace3?: Maybe<Scalars['String']['output']>;
  resourceSpace4?: Maybe<Scalars['String']['output']>;
};

export type ResourceTotals = {
  __typename?: 'ResourceTotals';
  castles: Scalars['Float']['output'];
  crowns: Scalars['Float']['output'];
  factories: Scalars['Float']['output'];
  leaves: Scalars['Float']['output'];
  lightbulbs: Scalars['Float']['output'];
  timepieces: Scalars['Float']['output'];
};

export type ResourceTotalsInput = {
  castles: Scalars['Float']['input'];
  crowns: Scalars['Float']['input'];
  factories: Scalars['Float']['input'];
  leaves: Scalars['Float']['input'];
  lightbulbs: Scalars['Float']['input'];
  timepieces: Scalars['Float']['input'];
};

export type Room = {
  __typename?: 'Room';
  _id: Scalars['ID']['output'];
  availableToJoin: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  hostRef: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  playerRefs: Array<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum SplayOption {
  Left = 'LEFT',
  Right = 'RIGHT',
  Up = 'UP'
}

export type UpdateGameInput = {
  ageAchievements?: InputMaybe<AgeAchievementsInput>;
  currentActionNumber?: InputMaybe<Scalars['Float']['input']>;
  currentPlayerRef?: InputMaybe<Scalars['String']['input']>;
  deck?: InputMaybe<DeckInput>;
  stage?: InputMaybe<Scalars['String']['input']>;
  winnerRef?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlayerGameDetailsInput = {
  ageAchievements?: InputMaybe<Array<Scalars['ID']['input']>>;
  board?: InputMaybe<BoardInput>;
  hand?: InputMaybe<Array<Scalars['ID']['input']>>;
  scorePile?: InputMaybe<Array<Scalars['ID']['input']>>;
  specialAchievements?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateRoomAvailabilityInput = {
  availableToJoin: Scalars['Boolean']['input'];
  roomId: Scalars['String']['input'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type AuthResponseDataFragment = { __typename?: 'AuthResponse', authToken: string, refreshToken: string, user: { __typename?: 'UserWithoutPassword', _id: string, username: string, email: string } };

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: { __typename?: 'UserWithoutPassword', _id: string, username: string, email: string } };

export type LoginQueryVariables = Exact<{
  loginUserInput: GetUserInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'AuthResponse', authToken: string, refreshToken: string, user: { __typename?: 'UserWithoutPassword', _id: string, username: string, email: string } } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AccessTokenPayload', authToken: string } };

export type SignupMutationVariables = Exact<{
  newUserData: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthResponse', authToken: string, refreshToken: string, user: { __typename?: 'UserWithoutPassword', _id: string, username: string, email: string } } };

export type BaseCardFragment = { __typename?: 'Card', _id: string, cardId: string, name: string, age: number, color: string, dogmaResource: string };

export type DogmaEffectsFragment = { __typename?: 'Card', dogmaEffects: Array<{ __typename?: 'DogmaEffect', description: string, effectTypes: Array<string>, isDemand: boolean, isOptional: boolean, repeat: boolean, specialAchievement?: string | null }> };

export type ResourceSpacesFragment = { __typename?: 'Card', resourceSpaces: { __typename?: 'ResourceSpaces', resourceSpace1?: string | null, resourceSpace2?: string | null, resourceSpace3?: string | null, resourceSpace4?: string | null } };

export type ResourceTotalsFragment = { __typename?: 'ResourceTotals', castles: number, crowns: number, leaves: number, lightbulbs: number, factories: number, timepieces: number };

export type GetAllCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCardsQuery = { __typename?: 'Query', getAllCards: Array<{ __typename?: 'Card', _id: string, cardId: string, name: string, age: number, color: string, dogmaResource: string, resourceTotals: { __typename?: 'ResourceTotals', castles: number, crowns: number, leaves: number, lightbulbs: number, factories: number, timepieces: number }, resourceSpaces: { __typename?: 'ResourceSpaces', resourceSpace1?: string | null, resourceSpace2?: string | null, resourceSpace3?: string | null, resourceSpace4?: string | null }, dogmaEffects: Array<{ __typename?: 'DogmaEffect', description: string, effectTypes: Array<string>, isDemand: boolean, isOptional: boolean, repeat: boolean, specialAchievement?: string | null }> }> };

export type GetGameDataQueryVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type GetGameDataQuery = { __typename?: 'Query', getGame?: { __typename?: 'Game', _id: string, currentActionNumber: number, currentPlayerRef: string, playerRefs: Array<string>, stage: string, winnerRef?: string | null, deck: { __typename?: 'Deck', ONE: Array<string>, TWO: Array<string>, THREE: Array<string>, FOUR: Array<string>, FIVE: Array<string>, SIX: Array<string>, SEVEN: Array<string>, EIGHT: Array<string>, NINE: Array<string>, TEN: Array<string> }, ageAchievements: { __typename?: 'AgeAchievements', ONE: string, TWO: string, THREE: string, FOUR: string, FIVE: string, SIX: string, SEVEN: string, EIGHT: string, NINE: string } } | null, getDetailsByGame: Array<{ __typename?: 'PlayerGameDetails', _id: string, playerRef: string, username?: string | null, ageAchievements: Array<string>, hand: Array<string>, scorePile: Array<string>, specialAchievements: Array<string>, board: { __typename?: 'Board', blue: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, green: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, purple: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, red: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, yellow: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null } } }> };

export type MeldFromHandMutationVariables = Exact<{
  meldInput: MeldInput;
}>;


export type MeldFromHandMutation = { __typename?: 'Mutation', meld: { __typename?: 'MeldResponse', gameId: string, playerId: string, updatedPlayerBoard: { __typename?: 'Board', blue: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, green: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, purple: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, red: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, yellow: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null } }, metadata: { __typename?: 'MeldResponseMetadata', updatedPlayerHand: Array<string> } } };

export type NewGameMutationVariables = Exact<{
  newGameDto: CreateNewGameInput;
}>;


export type NewGameMutation = { __typename?: 'Mutation', newGame: { __typename?: 'CreateNewGameResponse', gameId: string } };

export type GameAgeAchievementsFragment = { __typename?: 'AgeAchievements', ONE: string, TWO: string, THREE: string, FOUR: string, FIVE: string, SIX: string, SEVEN: string, EIGHT: string, NINE: string };

export type DeckFragment = { __typename?: 'Deck', ONE: Array<string>, TWO: Array<string>, THREE: Array<string>, FOUR: Array<string>, FIVE: Array<string>, SIX: Array<string>, SEVEN: Array<string>, EIGHT: Array<string>, NINE: Array<string>, TEN: Array<string> };

export type GameFragment = { __typename?: 'Game', _id: string, currentActionNumber: number, currentPlayerRef: string, playerRefs: Array<string>, stage: string, winnerRef?: string | null, deck: { __typename?: 'Deck', ONE: Array<string>, TWO: Array<string>, THREE: Array<string>, FOUR: Array<string>, FIVE: Array<string>, SIX: Array<string>, SEVEN: Array<string>, EIGHT: Array<string>, NINE: Array<string>, TEN: Array<string> }, ageAchievements: { __typename?: 'AgeAchievements', ONE: string, TWO: string, THREE: string, FOUR: string, FIVE: string, SIX: string, SEVEN: string, EIGHT: string, NINE: string } };

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type GetGameQuery = { __typename?: 'Query', getGame?: { __typename?: 'Game', _id: string, currentActionNumber: number, currentPlayerRef: string, playerRefs: Array<string>, stage: string, winnerRef?: string | null, deck: { __typename?: 'Deck', ONE: Array<string>, TWO: Array<string>, THREE: Array<string>, FOUR: Array<string>, FIVE: Array<string>, SIX: Array<string>, SEVEN: Array<string>, EIGHT: Array<string>, NINE: Array<string>, TEN: Array<string> }, ageAchievements: { __typename?: 'AgeAchievements', ONE: string, TWO: string, THREE: string, FOUR: string, FIVE: string, SIX: string, SEVEN: string, EIGHT: string, NINE: string } } | null };

export type BoardPileFragment = { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null };

export type BoardFragment = { __typename?: 'Board', blue: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, green: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, purple: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, red: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, yellow: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null } };

export type PlayerGameDetailsFragment = { __typename?: 'PlayerGameDetails', _id: string, playerRef: string, username?: string | null, ageAchievements: Array<string>, hand: Array<string>, scorePile: Array<string>, specialAchievements: Array<string>, board: { __typename?: 'Board', blue: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, green: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, purple: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, red: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null }, yellow: { __typename?: 'BoardPile', cardRefs: Array<string>, splayed?: SplayOption | null } } };

export type AddPlayerToRoomMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type AddPlayerToRoomMutation = { __typename?: 'Mutation', addPlayerToRoom?: { __typename?: 'Room', _id: string, name: string, hostRef: string, playerRefs: Array<string>, availableToJoin: boolean } | null };

export type CloseRoomMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type CloseRoomMutation = { __typename?: 'Mutation', closeRoom: { __typename?: 'CloseRoomResponse', success: boolean } };

export type CreateRoomMutationVariables = Exact<{
  newRoomData: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', _id: string, name: string, hostRef: string, playerRefs: Array<string>, availableToJoin: boolean } };

export type RoomDataFragment = { __typename?: 'Room', _id: string, name: string, hostRef: string, playerRefs: Array<string>, availableToJoin: boolean };

export type GetRoomQueryVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type GetRoomQuery = { __typename?: 'Query', getRoom?: { __typename?: 'Room', _id: string, name: string, hostRef: string, playerRefs: Array<string>, availableToJoin: boolean } | null };

export type GetRoomsForPlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsForPlayerQuery = { __typename?: 'Query', getRoomsForPlayer?: Array<{ __typename?: 'Room', _id: string, name: string, hostRef: string, playerRefs: Array<string>, availableToJoin: boolean }> | null };

export type UpdateRoomAvailabilityMutationVariables = Exact<{
  data: UpdateRoomAvailabilityInput;
}>;


export type UpdateRoomAvailabilityMutation = { __typename?: 'Mutation', updateRoomAvailability?: { __typename?: 'Room', _id: string, name: string, hostRef: string, playerRefs: Array<string>, availableToJoin: boolean } | null };

export type UserDetailsFragment = { __typename?: 'UserWithoutPassword', _id: string, username: string, email: string };

export const UserDetailsFragmentDoc = gql`
    fragment UserDetails on UserWithoutPassword {
  _id
  username
  email
}
    `;
export const AuthResponseDataFragmentDoc = gql`
    fragment AuthResponseData on AuthResponse {
  authToken
  refreshToken
  user {
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;
export const BaseCardFragmentDoc = gql`
    fragment BaseCard on Card {
  _id
  cardId
  name
  age
  color
  dogmaResource
}
    `;
export const DogmaEffectsFragmentDoc = gql`
    fragment DogmaEffects on Card {
  dogmaEffects {
    description
    effectTypes
    isDemand
    isOptional
    repeat
    specialAchievement
  }
}
    `;
export const ResourceSpacesFragmentDoc = gql`
    fragment ResourceSpaces on Card {
  resourceSpaces {
    resourceSpace1
    resourceSpace2
    resourceSpace3
    resourceSpace4
  }
}
    `;
export const ResourceTotalsFragmentDoc = gql`
    fragment ResourceTotals on ResourceTotals {
  castles
  crowns
  leaves
  lightbulbs
  factories
  timepieces
}
    `;
export const DeckFragmentDoc = gql`
    fragment Deck on Deck {
  ONE
  TWO
  THREE
  FOUR
  FIVE
  SIX
  SEVEN
  EIGHT
  NINE
  TEN
}
    `;
export const GameAgeAchievementsFragmentDoc = gql`
    fragment GameAgeAchievements on AgeAchievements {
  ONE
  TWO
  THREE
  FOUR
  FIVE
  SIX
  SEVEN
  EIGHT
  NINE
}
    `;
export const GameFragmentDoc = gql`
    fragment Game on Game {
  _id
  currentActionNumber
  currentPlayerRef
  playerRefs
  stage
  winnerRef
  deck {
    ...Deck
  }
  ageAchievements {
    ...GameAgeAchievements
  }
}
    ${DeckFragmentDoc}
${GameAgeAchievementsFragmentDoc}`;
export const BoardPileFragmentDoc = gql`
    fragment BoardPile on BoardPile {
  cardRefs
  splayed
}
    `;
export const BoardFragmentDoc = gql`
    fragment Board on Board {
  blue {
    ...BoardPile
  }
  green {
    ...BoardPile
  }
  purple {
    ...BoardPile
  }
  red {
    ...BoardPile
  }
  yellow {
    ...BoardPile
  }
}
    ${BoardPileFragmentDoc}`;
export const PlayerGameDetailsFragmentDoc = gql`
    fragment PlayerGameDetails on PlayerGameDetails {
  _id
  playerRef
  username
  board {
    ...Board
  }
  ageAchievements
  hand
  scorePile
  specialAchievements
}
    ${BoardFragmentDoc}`;
export const RoomDataFragmentDoc = gql`
    fragment RoomData on Room {
  _id
  name
  hostRef
  playerRefs
  availableToJoin
}
    `;
export const IsAuthenticatedDocument = gql`
    query IsAuthenticated {
  isAuthenticated {
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useIsAuthenticatedQuery__
 *
 * To run a query within a React component, call `useIsAuthenticatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAuthenticatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAuthenticatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsAuthenticatedQuery(baseOptions?: Apollo.QueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
      }
export function useIsAuthenticatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
        }
export function useIsAuthenticatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
        }
export type IsAuthenticatedQueryHookResult = ReturnType<typeof useIsAuthenticatedQuery>;
export type IsAuthenticatedLazyQueryHookResult = ReturnType<typeof useIsAuthenticatedLazyQuery>;
export type IsAuthenticatedSuspenseQueryHookResult = ReturnType<typeof useIsAuthenticatedSuspenseQuery>;
export type IsAuthenticatedQueryResult = Apollo.QueryResult<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;
export const LoginDocument = gql`
    query Login($loginUserInput: GetUserInput!) {
  login(loginUserInput: $loginUserInput) {
    ...AuthResponseData
  }
}
    ${AuthResponseDataFragmentDoc}`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    authToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($newUserData: CreateUserInput!) {
  signup(newUserData: $newUserData) {
    ...AuthResponseData
  }
}
    ${AuthResponseDataFragmentDoc}`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      newUserData: // value for 'newUserData'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const GetAllCardsDocument = gql`
    query GetAllCards {
  getAllCards {
    ...BaseCard
    ...ResourceSpaces
    resourceTotals {
      ...ResourceTotals
    }
    ...DogmaEffects
  }
}
    ${BaseCardFragmentDoc}
${ResourceSpacesFragmentDoc}
${ResourceTotalsFragmentDoc}
${DogmaEffectsFragmentDoc}`;

/**
 * __useGetAllCardsQuery__
 *
 * To run a query within a React component, call `useGetAllCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCardsQuery, GetAllCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCardsQuery, GetAllCardsQueryVariables>(GetAllCardsDocument, options);
      }
export function useGetAllCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCardsQuery, GetAllCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCardsQuery, GetAllCardsQueryVariables>(GetAllCardsDocument, options);
        }
export function useGetAllCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCardsQuery, GetAllCardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCardsQuery, GetAllCardsQueryVariables>(GetAllCardsDocument, options);
        }
export type GetAllCardsQueryHookResult = ReturnType<typeof useGetAllCardsQuery>;
export type GetAllCardsLazyQueryHookResult = ReturnType<typeof useGetAllCardsLazyQuery>;
export type GetAllCardsSuspenseQueryHookResult = ReturnType<typeof useGetAllCardsSuspenseQuery>;
export type GetAllCardsQueryResult = Apollo.QueryResult<GetAllCardsQuery, GetAllCardsQueryVariables>;
export const GetGameDataDocument = gql`
    query GetGameData($gameId: ID!) {
  getGame(gameId: $gameId) {
    ...Game
  }
  getDetailsByGame(gameRef: $gameId) {
    ...PlayerGameDetails
  }
}
    ${GameFragmentDoc}
${PlayerGameDetailsFragmentDoc}`;

/**
 * __useGetGameDataQuery__
 *
 * To run a query within a React component, call `useGetGameDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameDataQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGetGameDataQuery(baseOptions: Apollo.QueryHookOptions<GetGameDataQuery, GetGameDataQueryVariables> & ({ variables: GetGameDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameDataQuery, GetGameDataQueryVariables>(GetGameDataDocument, options);
      }
export function useGetGameDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameDataQuery, GetGameDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameDataQuery, GetGameDataQueryVariables>(GetGameDataDocument, options);
        }
export function useGetGameDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameDataQuery, GetGameDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameDataQuery, GetGameDataQueryVariables>(GetGameDataDocument, options);
        }
export type GetGameDataQueryHookResult = ReturnType<typeof useGetGameDataQuery>;
export type GetGameDataLazyQueryHookResult = ReturnType<typeof useGetGameDataLazyQuery>;
export type GetGameDataSuspenseQueryHookResult = ReturnType<typeof useGetGameDataSuspenseQuery>;
export type GetGameDataQueryResult = Apollo.QueryResult<GetGameDataQuery, GetGameDataQueryVariables>;
export const MeldFromHandDocument = gql`
    mutation MeldFromHand($meldInput: MeldInput!) {
  meld(meldInput: $meldInput) {
    gameId
    playerId
    updatedPlayerBoard {
      ...Board
    }
    metadata {
      updatedPlayerHand
    }
  }
}
    ${BoardFragmentDoc}`;
export type MeldFromHandMutationFn = Apollo.MutationFunction<MeldFromHandMutation, MeldFromHandMutationVariables>;

/**
 * __useMeldFromHandMutation__
 *
 * To run a mutation, you first call `useMeldFromHandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMeldFromHandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [meldFromHandMutation, { data, loading, error }] = useMeldFromHandMutation({
 *   variables: {
 *      meldInput: // value for 'meldInput'
 *   },
 * });
 */
export function useMeldFromHandMutation(baseOptions?: Apollo.MutationHookOptions<MeldFromHandMutation, MeldFromHandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MeldFromHandMutation, MeldFromHandMutationVariables>(MeldFromHandDocument, options);
      }
export type MeldFromHandMutationHookResult = ReturnType<typeof useMeldFromHandMutation>;
export type MeldFromHandMutationResult = Apollo.MutationResult<MeldFromHandMutation>;
export type MeldFromHandMutationOptions = Apollo.BaseMutationOptions<MeldFromHandMutation, MeldFromHandMutationVariables>;
export const NewGameDocument = gql`
    mutation NewGame($newGameDto: CreateNewGameInput!) {
  newGame(newGameDto: $newGameDto) {
    gameId
  }
}
    `;
export type NewGameMutationFn = Apollo.MutationFunction<NewGameMutation, NewGameMutationVariables>;

/**
 * __useNewGameMutation__
 *
 * To run a mutation, you first call `useNewGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newGameMutation, { data, loading, error }] = useNewGameMutation({
 *   variables: {
 *      newGameDto: // value for 'newGameDto'
 *   },
 * });
 */
export function useNewGameMutation(baseOptions?: Apollo.MutationHookOptions<NewGameMutation, NewGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewGameMutation, NewGameMutationVariables>(NewGameDocument, options);
      }
export type NewGameMutationHookResult = ReturnType<typeof useNewGameMutation>;
export type NewGameMutationResult = Apollo.MutationResult<NewGameMutation>;
export type NewGameMutationOptions = Apollo.BaseMutationOptions<NewGameMutation, NewGameMutationVariables>;
export const GetGameDocument = gql`
    query GetGame($gameId: ID!) {
  getGame(gameId: $gameId) {
    ...Game
  }
}
    ${GameFragmentDoc}`;

/**
 * __useGetGameQuery__
 *
 * To run a query within a React component, call `useGetGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGetGameQuery(baseOptions: Apollo.QueryHookOptions<GetGameQuery, GetGameQueryVariables> & ({ variables: GetGameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
      }
export function useGetGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export function useGetGameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export type GetGameQueryHookResult = ReturnType<typeof useGetGameQuery>;
export type GetGameLazyQueryHookResult = ReturnType<typeof useGetGameLazyQuery>;
export type GetGameSuspenseQueryHookResult = ReturnType<typeof useGetGameSuspenseQuery>;
export type GetGameQueryResult = Apollo.QueryResult<GetGameQuery, GetGameQueryVariables>;
export const AddPlayerToRoomDocument = gql`
    mutation AddPlayerToRoom($roomId: String!) {
  addPlayerToRoom(roomId: $roomId) {
    ...RoomData
  }
}
    ${RoomDataFragmentDoc}`;
export type AddPlayerToRoomMutationFn = Apollo.MutationFunction<AddPlayerToRoomMutation, AddPlayerToRoomMutationVariables>;

/**
 * __useAddPlayerToRoomMutation__
 *
 * To run a mutation, you first call `useAddPlayerToRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPlayerToRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPlayerToRoomMutation, { data, loading, error }] = useAddPlayerToRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useAddPlayerToRoomMutation(baseOptions?: Apollo.MutationHookOptions<AddPlayerToRoomMutation, AddPlayerToRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPlayerToRoomMutation, AddPlayerToRoomMutationVariables>(AddPlayerToRoomDocument, options);
      }
export type AddPlayerToRoomMutationHookResult = ReturnType<typeof useAddPlayerToRoomMutation>;
export type AddPlayerToRoomMutationResult = Apollo.MutationResult<AddPlayerToRoomMutation>;
export type AddPlayerToRoomMutationOptions = Apollo.BaseMutationOptions<AddPlayerToRoomMutation, AddPlayerToRoomMutationVariables>;
export const CloseRoomDocument = gql`
    mutation CloseRoom($roomId: String!) {
  closeRoom(roomId: $roomId) {
    success
  }
}
    `;
export type CloseRoomMutationFn = Apollo.MutationFunction<CloseRoomMutation, CloseRoomMutationVariables>;

/**
 * __useCloseRoomMutation__
 *
 * To run a mutation, you first call `useCloseRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeRoomMutation, { data, loading, error }] = useCloseRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useCloseRoomMutation(baseOptions?: Apollo.MutationHookOptions<CloseRoomMutation, CloseRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseRoomMutation, CloseRoomMutationVariables>(CloseRoomDocument, options);
      }
export type CloseRoomMutationHookResult = ReturnType<typeof useCloseRoomMutation>;
export type CloseRoomMutationResult = Apollo.MutationResult<CloseRoomMutation>;
export type CloseRoomMutationOptions = Apollo.BaseMutationOptions<CloseRoomMutation, CloseRoomMutationVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($newRoomData: CreateRoomInput!) {
  createRoom(newRoomData: $newRoomData) {
    ...RoomData
  }
}
    ${RoomDataFragmentDoc}`;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      newRoomData: // value for 'newRoomData'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const GetRoomDocument = gql`
    query GetRoom($roomId: String!) {
  getRoom(roomId: $roomId) {
    ...RoomData
  }
}
    ${RoomDataFragmentDoc}`;

/**
 * __useGetRoomQuery__
 *
 * To run a query within a React component, call `useGetRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetRoomQuery(baseOptions: Apollo.QueryHookOptions<GetRoomQuery, GetRoomQueryVariables> & ({ variables: GetRoomQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
      }
export function useGetRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
        }
export function useGetRoomSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
        }
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomSuspenseQueryHookResult = ReturnType<typeof useGetRoomSuspenseQuery>;
export type GetRoomQueryResult = Apollo.QueryResult<GetRoomQuery, GetRoomQueryVariables>;
export const GetRoomsForPlayerDocument = gql`
    query GetRoomsForPlayer {
  getRoomsForPlayer {
    ...RoomData
  }
}
    ${RoomDataFragmentDoc}`;

/**
 * __useGetRoomsForPlayerQuery__
 *
 * To run a query within a React component, call `useGetRoomsForPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsForPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsForPlayerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomsForPlayerQuery(baseOptions?: Apollo.QueryHookOptions<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>(GetRoomsForPlayerDocument, options);
      }
export function useGetRoomsForPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>(GetRoomsForPlayerDocument, options);
        }
export function useGetRoomsForPlayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>(GetRoomsForPlayerDocument, options);
        }
export type GetRoomsForPlayerQueryHookResult = ReturnType<typeof useGetRoomsForPlayerQuery>;
export type GetRoomsForPlayerLazyQueryHookResult = ReturnType<typeof useGetRoomsForPlayerLazyQuery>;
export type GetRoomsForPlayerSuspenseQueryHookResult = ReturnType<typeof useGetRoomsForPlayerSuspenseQuery>;
export type GetRoomsForPlayerQueryResult = Apollo.QueryResult<GetRoomsForPlayerQuery, GetRoomsForPlayerQueryVariables>;
export const UpdateRoomAvailabilityDocument = gql`
    mutation UpdateRoomAvailability($data: UpdateRoomAvailabilityInput!) {
  updateRoomAvailability(data: $data) {
    ...RoomData
  }
}
    ${RoomDataFragmentDoc}`;
export type UpdateRoomAvailabilityMutationFn = Apollo.MutationFunction<UpdateRoomAvailabilityMutation, UpdateRoomAvailabilityMutationVariables>;

/**
 * __useUpdateRoomAvailabilityMutation__
 *
 * To run a mutation, you first call `useUpdateRoomAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoomAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoomAvailabilityMutation, { data, loading, error }] = useUpdateRoomAvailabilityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRoomAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoomAvailabilityMutation, UpdateRoomAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoomAvailabilityMutation, UpdateRoomAvailabilityMutationVariables>(UpdateRoomAvailabilityDocument, options);
      }
export type UpdateRoomAvailabilityMutationHookResult = ReturnType<typeof useUpdateRoomAvailabilityMutation>;
export type UpdateRoomAvailabilityMutationResult = Apollo.MutationResult<UpdateRoomAvailabilityMutation>;
export type UpdateRoomAvailabilityMutationOptions = Apollo.BaseMutationOptions<UpdateRoomAvailabilityMutation, UpdateRoomAvailabilityMutationVariables>;