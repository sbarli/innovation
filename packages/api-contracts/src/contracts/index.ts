import { initContract } from '@ts-rest/core';
import { cardsContract } from './cards.contract';
import { gameplayContract } from './gameplay.contract';
import { roomsContract } from './rooms.contract';
import { usersContract } from './users.contract';

const c = initContract();

export const contract = c.router({
  users: usersContract,
  rooms: roomsContract,
  cards: cardsContract,
  gameplay: gameplayContract,
});
