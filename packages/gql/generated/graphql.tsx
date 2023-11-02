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

export type Achievements = {
  __typename?: 'Achievements';
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

export type AchievementsInput = {
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
  age: Scalars['String']['output'];
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

export type CreateNewGameInput = {
  playerRefs: Array<Scalars['String']['input']>;
};

export type CreateNewGameResponse = {
  __typename?: 'CreateNewGameResponse';
  game: Game;
  playerGameDetails: Array<PlayerGameDetails>;
};

export type CreatePlayerGameDetailsInput = {
  achievements: Array<Scalars['ID']['input']>;
  age: Scalars['Float']['input'];
  board: BoardInput;
  gameRef: Scalars['ID']['input'];
  hand: Array<Scalars['ID']['input']>;
  playerRef: Scalars['ID']['input'];
  resourceTotals: ResourceTotalsInput;
  score: Scalars['Float']['input'];
  scoreCardRefs: Array<Scalars['ID']['input']>;
};

export type CreatePlayerInput = {
  name: Scalars['String']['input'];
};

export type CreatePlayersInput = {
  names: Array<Scalars['String']['input']>;
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
  achievements: Achievements;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currentActionNumber: Scalars['Float']['output'];
  currentPlayerRef: Scalars['ID']['output'];
  deck: Deck;
  playerRefs: Array<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  winnerRef?: Maybe<Scalars['ID']['output']>;
};

export type GetPlayerDto = {
  searchField: Scalars['String']['input'];
  searchValue: Scalars['String']['input'];
};

export type GetPlayersInput = {
  searchField: Scalars['String']['input'];
  searchValues: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewGame: CreateNewGameResponse;
  createPlayer: Player;
  createPlayerGameDetails: PlayerGameDetails;
  createPlayers: Array<Player>;
  updateGame?: Maybe<Game>;
  updatePlayerGameDetails?: Maybe<PlayerGameDetails>;
};


export type MutationCreateNewGameArgs = {
  newGameDto: CreateNewGameInput;
};


export type MutationCreatePlayerArgs = {
  newPlayerData: CreatePlayerInput;
};


export type MutationCreatePlayerGameDetailsArgs = {
  createData: CreatePlayerGameDetailsInput;
};


export type MutationCreatePlayersArgs = {
  newPlayersData: CreatePlayersInput;
};


export type MutationUpdateGameArgs = {
  id: Scalars['String']['input'];
  updates: UpdateGameInput;
};


export type MutationUpdatePlayerGameDetailsArgs = {
  id: Scalars['ID']['input'];
  updates: UpdatePlayerGameDetailsInput;
};

export type Player = {
  __typename?: 'Player';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  playerId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PlayerGameDetails = {
  __typename?: 'PlayerGameDetails';
  _id: Scalars['ID']['output'];
  achievements: Array<Scalars['ID']['output']>;
  age: Scalars['Float']['output'];
  board: Board;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gameRef: Scalars['ID']['output'];
  hand: Array<Scalars['ID']['output']>;
  playerRef: Scalars['ID']['output'];
  resourceTotals: ResourceTotals;
  score: Scalars['Float']['output'];
  scoreCardRefs: Array<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllCards: Array<Card>;
  getCardIdAndRefByAge: CardIdAndRefByAge;
  getCardRefsByAge: CardRefsByAge;
  getGame?: Maybe<Game>;
  getOneCard?: Maybe<Card>;
  getPlayer?: Maybe<Player>;
  getPlayerGameDetails?: Maybe<PlayerGameDetails>;
  getPlayerGameDetailsById?: Maybe<PlayerGameDetails>;
  getPlayers: Array<Player>;
};


export type QueryGetGameArgs = {
  gameRef: Scalars['String']['input'];
};


export type QueryGetOneCardArgs = {
  options: FindOneOptionsInput;
};


export type QueryGetPlayerArgs = {
  getPlayerDto: GetPlayerDto;
};


export type QueryGetPlayerGameDetailsArgs = {
  gameRef: Scalars['ID']['input'];
  playerRef: Scalars['ID']['input'];
};


export type QueryGetPlayerGameDetailsByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPlayersArgs = {
  searchData: GetPlayersInput;
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

export enum SplayOption {
  Left = 'LEFT',
  Right = 'RIGHT',
  Up = 'UP'
}

export type UpdateGameInput = {
  achievements?: InputMaybe<AchievementsInput>;
  currentActionNumber?: InputMaybe<Scalars['Float']['input']>;
  currentPlayerRef?: InputMaybe<Scalars['String']['input']>;
  deck?: InputMaybe<DeckInput>;
  winnerRef?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlayerGameDetailsInput = {
  achievements?: InputMaybe<Array<Scalars['ID']['input']>>;
  age?: InputMaybe<Scalars['Float']['input']>;
  board?: InputMaybe<BoardInput>;
  hand?: InputMaybe<Array<Scalars['ID']['input']>>;
  resourceTotals?: InputMaybe<ResourceTotalsInput>;
  score?: InputMaybe<Scalars['Float']['input']>;
  scoreCardRefs?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type BaseCardFragmentFragment = { __typename?: 'Card', _id: string, cardId: string, name: string, age: string, color: string, dogmaResource: string };

export type DogmaEffectsFragment = { __typename?: 'Card', dogmaEffects: Array<{ __typename?: 'DogmaEffect', description: string, effectTypes: Array<string>, isDemand: boolean, isOptional: boolean, repeat: boolean, specialAchievement?: string | null }> };

export type ResourceSpacesFragment = { __typename?: 'Card', resourceSpaces: { __typename?: 'ResourceSpaces', resourceSpace1?: string | null, resourceSpace2?: string | null, resourceSpace3?: string | null, resourceSpace4?: string | null } };

export type ResourceTotalsFragment = { __typename?: 'Card', resourceTotals: { __typename?: 'ResourceTotals', castles: number, crowns: number, leaves: number, lightbulbs: number, factories: number, timepieces: number } };

export type GetAllCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCardsQuery = { __typename?: 'Query', getAllCards: Array<{ __typename?: 'Card', _id: string, cardId: string, name: string, age: string, color: string, dogmaResource: string, resourceSpaces: { __typename?: 'ResourceSpaces', resourceSpace1?: string | null, resourceSpace2?: string | null, resourceSpace3?: string | null, resourceSpace4?: string | null }, resourceTotals: { __typename?: 'ResourceTotals', castles: number, crowns: number, leaves: number, lightbulbs: number, factories: number, timepieces: number }, dogmaEffects: Array<{ __typename?: 'DogmaEffect', description: string, effectTypes: Array<string>, isDemand: boolean, isOptional: boolean, repeat: boolean, specialAchievement?: string | null }> }> };

export type CreatePlayersMutationVariables = Exact<{
  newPlayersData: CreatePlayersInput;
}>;


export type CreatePlayersMutation = { __typename?: 'Mutation', createPlayers: Array<{ __typename?: 'Player', _id: string, playerId: string, name: string }> };

export type PlayerFragmentFragment = { __typename?: 'Player', _id: string, playerId: string, name: string };

export type GetPlayerQueryVariables = Exact<{
  input: GetPlayerDto;
}>;


export type GetPlayerQuery = { __typename?: 'Query', getPlayer?: { __typename?: 'Player', _id: string, playerId: string, name: string } | null };

export type GetPlayersQueryVariables = Exact<{
  searchData: GetPlayersInput;
}>;


export type GetPlayersQuery = { __typename?: 'Query', getPlayers: Array<{ __typename?: 'Player', _id: string, playerId: string, name: string }> };

export const BaseCardFragmentFragmentDoc = gql`
    fragment BaseCardFragment on Card {
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
    fragment ResourceTotals on Card {
  resourceTotals {
    castles
    crowns
    leaves
    lightbulbs
    factories
    timepieces
  }
}
    `;
export const PlayerFragmentFragmentDoc = gql`
    fragment PlayerFragment on Player {
  _id
  playerId
  name
}
    `;
export const GetAllCardsDocument = gql`
    query GetAllCards {
  getAllCards {
    ...BaseCardFragment
    ...ResourceSpaces
    ...ResourceTotals
    ...DogmaEffects
  }
}
    ${BaseCardFragmentFragmentDoc}
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
export function useGetAllCardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCardsQuery, GetAllCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCardsQuery, GetAllCardsQueryVariables>(GetAllCardsDocument, options);
        }
export type GetAllCardsQueryHookResult = ReturnType<typeof useGetAllCardsQuery>;
export type GetAllCardsLazyQueryHookResult = ReturnType<typeof useGetAllCardsLazyQuery>;
export type GetAllCardsSuspenseQueryHookResult = ReturnType<typeof useGetAllCardsSuspenseQuery>;
export type GetAllCardsQueryResult = Apollo.QueryResult<GetAllCardsQuery, GetAllCardsQueryVariables>;
export const CreatePlayersDocument = gql`
    mutation CreatePlayers($newPlayersData: CreatePlayersInput!) {
  createPlayers(newPlayersData: $newPlayersData) {
    ...PlayerFragment
  }
}
    ${PlayerFragmentFragmentDoc}`;
export type CreatePlayersMutationFn = Apollo.MutationFunction<CreatePlayersMutation, CreatePlayersMutationVariables>;

/**
 * __useCreatePlayersMutation__
 *
 * To run a mutation, you first call `useCreatePlayersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayersMutation, { data, loading, error }] = useCreatePlayersMutation({
 *   variables: {
 *      newPlayersData: // value for 'newPlayersData'
 *   },
 * });
 */
export function useCreatePlayersMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayersMutation, CreatePlayersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayersMutation, CreatePlayersMutationVariables>(CreatePlayersDocument, options);
      }
export type CreatePlayersMutationHookResult = ReturnType<typeof useCreatePlayersMutation>;
export type CreatePlayersMutationResult = Apollo.MutationResult<CreatePlayersMutation>;
export type CreatePlayersMutationOptions = Apollo.BaseMutationOptions<CreatePlayersMutation, CreatePlayersMutationVariables>;
export const GetPlayerDocument = gql`
    query GetPlayer($input: GetPlayerDto!) {
  getPlayer(getPlayerDto: $input) {
    ...PlayerFragment
  }
}
    ${PlayerFragmentFragmentDoc}`;

/**
 * __useGetPlayerQuery__
 *
 * To run a query within a React component, call `useGetPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPlayerQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
      }
export function useGetPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export function useGetPlayerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export type GetPlayerQueryHookResult = ReturnType<typeof useGetPlayerQuery>;
export type GetPlayerLazyQueryHookResult = ReturnType<typeof useGetPlayerLazyQuery>;
export type GetPlayerSuspenseQueryHookResult = ReturnType<typeof useGetPlayerSuspenseQuery>;
export type GetPlayerQueryResult = Apollo.QueryResult<GetPlayerQuery, GetPlayerQueryVariables>;
export const GetPlayersDocument = gql`
    query GetPlayers($searchData: GetPlayersInput!) {
  getPlayers(searchData: $searchData) {
    ...PlayerFragment
  }
}
    ${PlayerFragmentFragmentDoc}`;

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *      searchData: // value for 'searchData'
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions: Apollo.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
      }
export function useGetPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
        }
export function useGetPlayersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersSuspenseQueryHookResult = ReturnType<typeof useGetPlayersSuspenseQuery>;
export type GetPlayersQueryResult = Apollo.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;