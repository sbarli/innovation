import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Player } from 'src/players/schemas/player.schema';
import { Deck } from './deck.schema';
import { Achievements } from './achievements.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop({ required: true })
  currentActionNumber: number;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  currentPlayerRef: Player;

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Player',
  })
  playerRefs: Player[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Player',
  })
  winnerRef: Player;

  @Prop({ required: true, type: Deck })
  deck: Deck;

  @Prop({ required: true, type: Achievements })
  achievements: Achievements;

  // TODO: add once we have spec achieve data
  // @Prop({ required: true, type: SpecialAchievements })
  // specialAchievements: SpecialAchievements;
}

export const GameSchema = SchemaFactory.createForClass(Game);
