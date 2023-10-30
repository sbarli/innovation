import { CreatePlayerInput } from '../dto/create-player.dto';
import { GetPlayerDto } from '../dto/get-player.dto';
import { GetPlayersInput } from '../dto/get-players.dto';
import { GetPlayerFieldOptions } from '../players.types';
import { Player } from '../schemas/player.schema';

export const MOCK_ID = 'mock_id';
export const MOCK_PLAYER_ID = 'mockplayer';
export const MOCK_PLAYER_NAME = 'Mock Player';

export const MOCK_PLAYER_INPUT: CreatePlayerInput = {
  playerId: 'mockplayer',
  name: 'Mock Player',
};

export const MOCK_PLAYER: Player = { _id: MOCK_ID, ...MOCK_PLAYER_INPUT };

export const MOCK_GET_PLAYER_BY_PLAYER_ID_INPUT: GetPlayerDto = {
  searchField: 'playerId',
  searchValue: MOCK_PLAYER_ID,
};

export const MOCK_GET_PLAYER_BY_REF_INPUT: GetPlayerDto = {
  searchField: 'ref',
  searchValue: MOCK_ID,
};

export const MOCK_GET_PLAYER_BY_INVALID_INPUT: GetPlayerDto = {
  searchField: 'invalid' as GetPlayerFieldOptions,
  searchValue: MOCK_ID,
};

export const MOCK_GET_PLAYERS_BY_PLAYER_ID_INPUT: GetPlayersInput = {
  searchField: 'playerId',
  searchValues: [MOCK_PLAYER_ID],
};

export const MOCK_GET_PLAYERS_BY_REF_INPUT: GetPlayersInput = {
  searchField: 'ref',
  searchValues: [MOCK_ID],
};

export const MOCK_GET_PLAYERS_BY_INVALID_INPUT: GetPlayersInput = {
  searchField: 'invalid' as GetPlayerFieldOptions,
  searchValues: [MOCK_ID],
};

export const MOCK_PLAYER_REF_1 = 'mock-player-ref-1';
export const MOCK_PLAYER_REF_2 = 'mock-player-ref-2';

export const MOCK_PLAYER_1 = Object.assign({}, { ...MOCK_PLAYER, _id: MOCK_PLAYER_REF_1 });
export const MOCK_PLAYER_2 = Object.assign({}, { ...MOCK_PLAYER, _id: MOCK_PLAYER_REF_2 });
export const MOCK_PLAYERS = [MOCK_PLAYER_1, MOCK_PLAYER_2];
