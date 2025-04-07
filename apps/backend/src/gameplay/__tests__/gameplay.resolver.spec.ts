import { Test } from '@nestjs/testing';
import { MOCK_CARD_REFS_BY_AGE } from 'src/cards/__mocks__/cards-sorting.mock';
import { MOCK_CARD } from 'src/cards/__mocks__/cards.mock';
import { CardsSortingService } from 'src/cards/services/cards-sorting.service';
import { CardsService } from 'src/cards/services/cards.service';
import { MOCK_STARTER_AGE_ACHIEVEMENTS } from 'src/games/__mocks__/age-achievements.mock';
import { MOCK_DECK } from 'src/games/__mocks__/deck.mock';

import {
  MOCK_MELD_FROM_HAND_INPUT,
  MOCK_MELD_FROM_HAND_RESPONSE,
  MOCK_NEW_GAME_INPUT,
  MOCK_NEW_GAME_RESPONSE,
} from '../__mocks__/gameplay.mock';
import { MOCK_NEW_GAME_SETUP, MOCK_PLAYER_STARTER_HANDS } from '../__mocks__/new-game.mock';
import { GameplayResolver } from '../gameplay.resolver';
import { NewGameService } from '../services/new-game.service';
import { PlayerActionsService } from '../services/player-actions.service';
import { VaildationService } from '../services/validation.service';

describe('GameplayResolver', () => {
  let cardsService: CardsService;
  let cardsSortingService: CardsSortingService;
  let newGameService: NewGameService;
  let validationService: VaildationService;
  let playerActionsService: PlayerActionsService;
  let gameplayResolver: GameplayResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: CardsSortingService,
          useValue: {
            refsByAge: jest.fn(),
          },
        },
        {
          provide: NewGameService,
          useValue: {
            getGameSetup: jest.fn(),
            newGame: jest.fn(),
          },
        },
        {
          provide: VaildationService,
          useValue: {
            validateRoomExists: jest.fn(),
            validatePlayersExist: jest.fn(),
          },
        },
        {
          provide: PlayerActionsService,
          useValue: {
            meldCardFromHand: jest.fn(),
          },
        },
        GameplayResolver,
      ],
    }).compile();

    cardsService = moduleRef.get<CardsService>(CardsService);
    cardsSortingService = moduleRef.get<CardsSortingService>(CardsSortingService);
    newGameService = moduleRef.get<NewGameService>(NewGameService);
    validationService = moduleRef.get<VaildationService>(VaildationService);
    playerActionsService = moduleRef.get<PlayerActionsService>(PlayerActionsService);
    gameplayResolver = moduleRef.get<GameplayResolver>(GameplayResolver);
  });

  it('should be defined', () => {
    expect(playerActionsService).toBeDefined();
    expect(gameplayResolver).toBeDefined();
  });

  describe('mutations', () => {
    describe('createNewGame', () => {
      it('should return output of creating a new game when all validations pass', async () => {
        const MOCK_FIND_ALL_CARDS_RESPONSE = [MOCK_CARD];
        const validateRoomSpy = jest
          .spyOn(validationService, 'validateRoomExists')
          .mockResolvedValueOnce(true);
        const validatePlayersSpy = jest
          .spyOn(validationService, 'validatePlayersExist')
          .mockResolvedValueOnce(true);
        const findCardsSpy = jest
          .spyOn(cardsService, 'findAll')
          .mockResolvedValueOnce(MOCK_FIND_ALL_CARDS_RESPONSE);
        const sortCardsSpy = jest
          .spyOn(cardsSortingService, 'refsByAge')
          .mockReturnValueOnce(MOCK_CARD_REFS_BY_AGE);
        const gameSetupSpy = jest
          .spyOn(newGameService, 'getGameSetup')
          .mockReturnValueOnce(MOCK_NEW_GAME_SETUP);
        const newGameSpy = jest
          .spyOn(newGameService, 'newGame')
          .mockResolvedValueOnce(MOCK_NEW_GAME_RESPONSE);

        const output = await gameplayResolver.newGame(MOCK_NEW_GAME_INPUT);

        expect(validateRoomSpy).toHaveBeenCalledWith(MOCK_NEW_GAME_INPUT.roomRef);
        expect(validatePlayersSpy).toHaveBeenCalledWith(MOCK_NEW_GAME_INPUT.playerRefs);
        expect(findCardsSpy).toHaveBeenCalledTimes(1);
        expect(sortCardsSpy).toHaveBeenCalledWith({ cards: MOCK_FIND_ALL_CARDS_RESPONSE });
        expect(gameSetupSpy).toHaveBeenCalledWith(
          MOCK_CARD_REFS_BY_AGE,
          MOCK_NEW_GAME_INPUT.playerRefs
        );
        expect(newGameSpy).toHaveBeenCalledWith({
          roomRef: MOCK_NEW_GAME_INPUT.roomRef,
          playerRefs: MOCK_NEW_GAME_INPUT.playerRefs,
          starterDeck: MOCK_DECK,
          ageAchievements: MOCK_STARTER_AGE_ACHIEVEMENTS,
          playerStarterHands: MOCK_PLAYER_STARTER_HANDS,
        });
        expect(output).toEqual(MOCK_NEW_GAME_RESPONSE);
      });
    });
    describe('meld', () => {
      it('should return output of running meldCardFromHand when meldType is "fromHand"', async () => {
        const playerActionsServiceSpy = jest
          .spyOn(playerActionsService, 'meldCardFromHand')
          .mockResolvedValueOnce(MOCK_MELD_FROM_HAND_RESPONSE);

        const output = await gameplayResolver.meld(MOCK_MELD_FROM_HAND_INPUT);

        expect(playerActionsServiceSpy).toHaveBeenCalledWith({
          cardId: MOCK_MELD_FROM_HAND_INPUT.cardRef,
          gameId: MOCK_MELD_FROM_HAND_INPUT.gameRef,
          playerId: MOCK_MELD_FROM_HAND_INPUT.playerRef,
        });
        expect(output).toEqual({
          gameId: MOCK_MELD_FROM_HAND_INPUT.gameRef,
          playerId: MOCK_MELD_FROM_HAND_INPUT.playerRef,
          updatedPlayerBoard: MOCK_MELD_FROM_HAND_RESPONSE.updatedPlayerBoard,
          metadata: {
            updatedPlayerHand: MOCK_MELD_FROM_HAND_RESPONSE.updatedPlayerHand,
          },
        });
      });
    });
  });
});
