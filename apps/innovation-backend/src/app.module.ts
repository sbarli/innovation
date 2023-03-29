import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { PlayerModule } from './player/player.module';

const MONGO_URL = process.env.MONGO_URL || '';
console.log('MONGO_URL: ', MONGO_URL);

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), PlayerModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
