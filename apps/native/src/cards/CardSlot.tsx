import { CardBack } from './CardBack';
import { CardFront, CardFrontProps } from './CardFront';

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
  variant?: CardFrontProps['variant'];
  selected?: boolean;
}

export function CardSlot({ cardData, faceDown, variant = 'full', selected }: CardSlotProps) {
  if (faceDown || !cardData) {
    const age = cardData?.age ?? 1;
    return <CardBack age={age} variant={variant === 'compact' ? 'compact' : 'full'} />;
  }
  return (
    <CardFront
      cardId={cardData.cardId}
      name={cardData.name}
      age={cardData.age}
      color={cardData.color}
      dogmaResource={cardData.dogmaResource}
      resourceSpaces={cardData.resourceSpaces}
      variant={variant}
      selected={selected}
    />
  );
}
