import { CreatePlayerDto } from '../dto/create-player.dto';
import { GetPlayerDto, GetPlayerFieldOptions } from '../dto/get-player.dto';
import { Player } from '../schemas/player.schema';

export const MOCK_ID = 'mock_id';
export const MOCK_PLAYER_ID = 'mockplayer';
export const MOCK_PLAYER_NAME = 'Mock Player';

export const MOCK_PLAYER_INPUT: CreatePlayerDto = {
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

export const MOCK_PLAYER_REF_1 = 'mock-player-ref-1';
export const MOCK_PLAYER_REF_2 = 'mock-player-ref-2';

export const MOCK_PLAYER_1 = Object.assign({}, { ...MOCK_PLAYER, _id: MOCK_PLAYER_REF_1 });
export const MOCK_PLAYER_2 = Object.assign({}, { ...MOCK_PLAYER, _id: MOCK_PLAYER_REF_2 });
export const MOCK_PLAYERS = [MOCK_PLAYER_1, MOCK_PLAYER_2];
