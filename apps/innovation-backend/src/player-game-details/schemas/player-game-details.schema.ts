import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Card } from 'src/shared/schemas/card.schema';
import { Game } from 'src/games/schemas/game.schema';
import { Player } from 'src/player/player.schema';
import { ResourceTotals } from 'src/shared/schemas/resource-totals.schema';

export type PlayerGameDetailsDocument = HydratedDocument<PlayerGameDetails>;

@Schema({ _id: false })
export class BoardPile extends Document {
  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  cardRefs: Card[];

  @Prop()
  splayed: 'LEFT' | 'RIGHT' | 'UP';
}

@Schema({ _id: false })
export class Board extends Document {
  @Prop({ required: true, type: BoardPile })
  blue: BoardPile;

  @Prop({ required: true, type: BoardPile })
  green: BoardPile;

  @Prop({ required: true, type: BoardPile })
  purple: BoardPile;

  @Prop({ required: true, type: BoardPile })
  red: BoardPile;

  @Prop({ required: true, type: BoardPile })
  yellow: BoardPile;
}

@Schema()
export class PlayerGameDetails {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  gameRef: Game;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  playerRef: Player;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true, type: ResourceTotals })
  resourceTotals: ResourceTotals;

  @Prop({ required: true, type: Board })
  board: Board;

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  achievements: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  hand: Card[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Card',
  })
  scoreCardRefs: Card[];

  // TODO: add once we have special achievement data
  // @Prop({
  //   required: true,
  //   type: [MongooseSchema.Types.ObjectId],
  //   ref: 'Card',
  // })
  // specialAchievements: Card[];
}

export const PlayerGameDetailsSchema =
  SchemaFactory.createForClass(PlayerGameDetails);
