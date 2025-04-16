import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardsController } from './cards.controller';
import { CardsResolver } from './cards.resolver';
import { Card, CardSchema } from './schemas/card.schema';
import { CardsSortingService } from './services/cards-sorting.service';
import { CardsService } from './services/cards.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])],
  controllers: [CardsController],
  providers: [CardsService, CardsSortingService, CardsResolver],
  exports: [CardsService, CardsSortingService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CardsModule {}
