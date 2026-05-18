import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

interface Card {
  cardId: string;
  name: string;
  age: number;
  color: string;
  dogmaResource: string;
  resourceSpaces: {
    resourceSpace1: string | null;
    resourceSpace2: string | null;
    resourceSpace3: string | null;
    resourceSpace4: string | null;
  };
}

interface CardSlotProps {
  cardId: string;
  cardData?: Card;
  faceDown?: boolean;
  compact?: boolean;
}

export function CardSlot({ cardData, faceDown, compact }: CardSlotProps) {
  if (faceDown || !cardData) {
    const age = cardData?.age ?? 1;
    return <CardBack age={age} compact={compact} />;
  }
  return (
    <CardFront
      cardId={cardData.cardId}
      name={cardData.name}
      age={cardData.age}
      color={cardData.color}
      dogmaResource={cardData.dogmaResource}
      resourceSpaces={cardData.resourceSpaces}
      compact={compact}
    />
  );
}
