import { useCallback, useMemo, useState } from 'react';

import { Box } from '../../../../app-core/components/gluestack/box';
import { Button, ButtonText } from '../../../../app-core/components/gluestack/button';
import { Heading } from '../../../../app-core/components/gluestack/heading';
import { HStack } from '../../../../app-core/components/gluestack/hstack';
import { disabledSolidButtonClassnames } from '../../../../app-core/constants/button.constants';
import { text } from '../../../../app-core/intl/en';
import { useCardsContext } from '../../../../cards/state/CardsProvider';
import { useUserPlayerGameData } from '../../../hooks/useUserPlayerGameData';
import { useGameContext } from '../../../state/GameProvider';

import { GameActionSheet } from './GameActionSheet';

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

  if (!gameMetadata || gameMetadata.currentPlayerId !== playerId || !possibleActions) {
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

  const isDrawDisabled = !possibleActions.draw;
  const isMeldDisabled = !possibleActions.meld.length;
  const isDogmaDisabled = !possibleActions.dogma.length;
  const isAchieveDisabled = !possibleActions.achieve.length;

  return (
    <>
      <HStack className="items-center justify-between">
        <Heading size="md">{`${text.availableActions.ACTION_NUMBER}: ${gameMetadata?.currentActionNumber}`}</Heading>
        <HStack space="sm" className="items-center">
          <Box>
            <Heading size="md">{text.availableActions.CHOOSE_AN_ACTION}</Heading>
          </Box>
          <Button
            className={isDrawDisabled ? disabledSolidButtonClassnames.button : ''}
            disabled={isDrawDisabled}
            onPress={handleDraw}
          >
            <ButtonText className={isDrawDisabled ? disabledSolidButtonClassnames.buttonText : ''}>
              {text.availableActions.DRAW_CTA}
            </ButtonText>
          </Button>
          <Button
            className={isMeldDisabled ? disabledSolidButtonClassnames.button : ''}
            disabled={isMeldDisabled}
            onPress={() => setShowMeldOptions(true)}
          >
            <ButtonText className={isMeldDisabled ? disabledSolidButtonClassnames.buttonText : ''}>
              {text.availableActions.MELD_CTA}
            </ButtonText>
          </Button>
          <Button
            className={isDogmaDisabled ? disabledSolidButtonClassnames.button : ''}
            disabled={isDogmaDisabled}
            onPress={() => setShowDogmaOptions(true)}
          >
            <ButtonText className={isDogmaDisabled ? disabledSolidButtonClassnames.buttonText : ''}>
              {text.availableActions.DOGMA_CTA}
            </ButtonText>
          </Button>
          <Button
            className={isAchieveDisabled ? disabledSolidButtonClassnames.button : ''}
            disabled={isAchieveDisabled}
            onPress={() => setShowAchieveOptions(true)}
          >
            <ButtonText
              className={isAchieveDisabled ? disabledSolidButtonClassnames.buttonText : ''}
            >
              {text.availableActions.ACHIEVE_CTA}
            </ButtonText>
          </Button>
        </HStack>
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
