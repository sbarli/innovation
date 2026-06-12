import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CardFront } from '../cards/CardFront';
import { surface, semantic } from '@inno/ui';
import { card as cardDim } from '@inno/ui';

interface CardData {
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

interface HandDisplayProps {
  hand: string[];
  selectedCard?: string | null;
  onCardSelect?: (cardId: string) => void;
  /** Full card data keyed by card ID — falls back to ID-only display if absent */
  cardDataMap?: Record<string, CardData>;
}

export function HandDisplay({ hand, selectedCard, onCardSelect, cardDataMap }: HandDisplayProps) {
  if (hand.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Empty hand</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hand · {hand.length}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hand.map((cardId) => {
          const data = cardDataMap?.[cardId];
          const isSelected = selectedCard === cardId;

          return (
            <TouchableOpacity
              key={cardId}
              onPress={() => onCardSelect?.(cardId)}
              activeOpacity={0.85}
              style={[styles.cardWrapper, isSelected && styles.cardWrapperSelected]}
            >
              {data ? (
                <CardFront
                  cardId={cardId}
                  name={data.name}
                  age={data.age}
                  color={data.color}
                  dogmaResource={data.dogmaResource}
                  resourceSpaces={data.resourceSpaces}
                  variant="full"
                  selected={isSelected}
                />
              ) : (
                // Fallback: no card data yet — show placeholder
                <View
                  style={[
                    styles.placeholder,
                    isSelected && styles.placeholderSelected,
                  ]}
                >
                  <Text style={styles.placeholderText} numberOfLines={3}>
                    {cardId}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: semantic.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  scrollContent: {
    gap: 10,
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  cardWrapper: {
    borderRadius: cardDim.radius + 1,
  },
  cardWrapperSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ translateY: -4 }],
  },
  // Placeholder for when card data is not available
  placeholder: {
    width: cardDim.handWidth,
    height: cardDim.handHeight,
    borderRadius: cardDim.radius,
    borderWidth: cardDim.borderWidth,
    borderColor: semantic.border,
    backgroundColor: surface.linenAlt,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  placeholderSelected: {
    borderColor: semantic.ink,
    backgroundColor: surface.linen,
  },
  placeholderText: {
    fontSize: 9,
    color: semantic.inkMuted,
    textAlign: 'center',
  },
  emptyContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: semantic.inkFaint,
    fontStyle: 'italic',
  },
});
