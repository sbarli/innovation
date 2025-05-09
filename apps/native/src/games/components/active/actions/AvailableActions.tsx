import { useCallback, useMemo, useState } from 'react';

import { Button, ButtonText } from '../../../../app-core/components/gluestack/button';
import { HStack } from '../../../../app-core/components/gluestack/hstack';
import { text } from '../../../../app-core/intl/en';
import { useCardsContext } from '../../../../cards/state/CardsProvider';
import { useUserPlayerGameData } from '../../../hooks/useUserPlayerGameData';
import { useGameContext } from '../../../state/GameProvider';

import { GameActionSheet } from './GameActionSheet';

export enum TurnAction {
  ACHIEVE = 'ACHIEVE',
  DOGMA = 'DOGMA',
  DRAW = 'DRAW',
  MELD = 'MELD',
}

export const AvailableActions = () => {
  const { cards } = useCardsContext();
  const { metadata: gameMetadata } = useGameContext();
  const { metadata: playerMetadata, playerId } = useUserPlayerGameData() ?? {};
  const [showMeldOptions, setShowMeldOptions] = useState(false);
  const [showDogmaOptions, setShowDogmaOptions] = useState(false);
  const [showAchieveOptions, setShowAchieveOptions] = useState(false);

  const possibleActions = playerMetadata?.possibleActions;

  const closeMeldOptions = useCallback(() => {
    setShowMeldOptions(false);
  }, []);

  const closeDogmaOptions = useCallback(() => {
    setShowDogmaOptions(false);
  }, []);

  const closeAchieveOptions = useCallback(() => {
    setShowAchieveOptions(false);
  }, []);

  const handleDraw = useCallback(() => {
    if (!playerMetadata?.possibleActions.draw) {
      console.log('UNABLE TO DRAW: no valid draw action age set');
      return;
    }
    console.log('READY TO DRAW AGE: ', playerMetadata.possibleActions.draw);
    // TODO: add draw logic
  }, [playerMetadata?.possibleActions.draw]);

  const handleMeldSelection = useCallback((cardId: string) => {
    console.log('SELECTED CARD TO MELD: ', cardId);
    setShowMeldOptions(false);
    // TODO: add meld logic
  }, []);

  const handleDogmaSelection = useCallback((cardId: string) => {
    console.log('SELECTED CARD TO DOGMA: ', cardId);
    setShowDogmaOptions(false);
    // TODO: add dogma logic
  }, []);

  const handleAchieveSelection = useCallback((cardId: string) => {
    console.log('SELECTED CARD TO ACHIEVE: ', cardId);
    setShowAchieveOptions(false);
    // TODO: add achieve logic
  }, []);

  if (
    (gameMetadata?.currentPlayerId && gameMetadata.currentPlayerId !== playerId) ||
    !possibleActions
  ) {
    return null;
  }

  const possibleCardsToMeld = useMemo(() => {
    return playerMetadata.possibleActions.meld.map((cid) => cards[cid]);
  }, [cards, playerMetadata?.possibleActions?.meld]);

  const possibleCardsToDogma = useMemo(() => {
    return playerMetadata.possibleActions.dogma.map((cid) => cards[cid]);
  }, [cards, playerMetadata?.possibleActions?.dogma]);

  const possibleCardsToAchieve = useMemo(() => {
    return playerMetadata.possibleActions.achieve.map((cid) => cards[cid]);
  }, [cards, playerMetadata?.possibleActions?.achieve]);

  return (
    <>
      <HStack space="sm">
        <Button
          action={possibleActions.draw ? 'primary' : 'secondary'}
          disabled={!possibleActions.draw}
          onPress={handleDraw}
        >
          <ButtonText>{text.availableActions.DRAW_CTA}</ButtonText>
        </Button>
        <Button
          action={possibleActions.meld.length ? 'primary' : 'secondary'}
          disabled={!possibleActions.meld.length}
          onPress={() => setShowMeldOptions(true)}
        >
          <ButtonText>{text.availableActions.MELD_CTA}</ButtonText>
        </Button>
        <Button
          action={possibleActions.dogma.length ? 'primary' : 'secondary'}
          disabled={!possibleActions.dogma.length}
          onPress={() => setShowDogmaOptions(true)}
        >
          <ButtonText>{text.availableActions.DOGMA_CTA}</ButtonText>
        </Button>
        <Button
          action={possibleActions.achieve.length ? 'primary' : 'secondary'}
          disabled={!possibleActions.achieve.length}
          onPress={() => setShowAchieveOptions(true)}
        >
          <ButtonText>{text.availableActions.ACHIEVE_CTA}</ButtonText>
        </Button>
      </HStack>
      <GameActionSheet
        cards={possibleCardsToMeld}
        headerText={text.availableActions.CHOOSE_CARD_TO_MELD}
        onClose={closeMeldOptions}
        onSelect={handleMeldSelection}
        visible={showMeldOptions}
      />
      <GameActionSheet
        cards={possibleCardsToDogma}
        headerText={text.availableActions.CHOOSE_CARD_TO_DOGMA}
        onClose={closeDogmaOptions}
        onSelect={handleDogmaSelection}
        visible={showDogmaOptions}
      />
      <GameActionSheet
        cards={possibleCardsToAchieve}
        headerText={text.availableActions.CHOOSE_CARD_TO_ACHIEVE}
        onClose={closeAchieveOptions}
        onSelect={handleAchieveSelection}
        visible={showAchieveOptions}
      />
    </>
  );
};
