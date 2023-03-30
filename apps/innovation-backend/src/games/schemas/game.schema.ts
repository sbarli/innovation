import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Player } from 'src/player/player.schema';

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
}

export const GameSchema = SchemaFactory.createForClass(Game);
