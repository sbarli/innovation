import { PlayerGameDetails } from '@inno/gql';

export const PLAYER_ONE: PlayerGameDetails = {
  _id: '65e658fc33ffd5bbab1988a2',
  playerRef: '65c2d400bc5e6a8a90e4fdf2',
  gameRef: '65e658fc33ffd5bbab1988a0',
  age: 1,
  score: 0,
  resourceTotals: {
    castles: 0,
    crowns: 0,
    leaves: 0,
    lightbulbs: 0,
    factories: 0,
    timepieces: 0,
  },
  board: {
    blue: {
      cardRefs: [],
      splayed: null,
    },
    green: {
      cardRefs: [],
      splayed: null,
    },
    purple: {
      cardRefs: [],
      splayed: null,
    },
    red: {
      cardRefs: [],
      splayed: null,
    },
    yellow: {
      cardRefs: [],
      splayed: null,
    },
  },
  achievements: [],
  hand: ['6539f5731bdd7029a5e66ac7', '6539f5731bdd7029a5e66ac5'],
  scoreCardRefs: [],
};

export const PLAYER_TWO: PlayerGameDetails = {
  _id: '65e658fc33ffd5bbab1988a3',
  playerRef: '65c3e516a7d52f65fa43c058',
  age: 1,
  score: 0,
  gameRef: '65e658fc33ffd5bbab1988a0',
  resourceTotals: {
    castles: 0,
    crowns: 0,
    leaves: 0,
    lightbulbs: 0,
    factories: 0,
    timepieces: 0,
  },
  board: {
    blue: {
      cardRefs: [],
      splayed: null,
    },
    green: {
      cardRefs: [],
      splayed: null,
    },
    purple: {
      cardRefs: [],
      splayed: null,
    },
    red: {
      cardRefs: [],
      splayed: null,
    },
    yellow: {
      cardRefs: [],
      splayed: null,
    },
  },
  achievements: [],
  hand: ['6539f5731bdd7029a5e66aca', '6539f5731bdd7029a5e66ac3'],
  scoreCardRefs: [],
};
