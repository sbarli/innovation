import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from 'src/shared/schemas/card.schema';

import { CardsSortingService } from './cards-sorting.service';
import { CardsController } from './cards.controller';
import { CardsResolver } from './cards.resolver';
import { CardsService } from './cards.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])],
  controllers: [CardsController],
  providers: [CardsService, CardsSortingService, CardsResolver],
  exports: [CardsService, CardsSortingService],
})
export class CardsModule {}
