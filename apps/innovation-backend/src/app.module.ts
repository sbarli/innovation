import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { GamesModule } from './games/games.module';
import { PlayerGameDetailsModule } from './player-game-details/player-game-details.module';
import { PlayersModule } from './players/players.module';
import { GameplayModule } from './gameplay/gameplay.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './graphql/gql-config-service';

const MONGO_URL = process.env.MONGO_URL || '';
console.log('MONGO_URL: ', MONGO_URL);

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    CardsModule,
    PlayersModule,
    GamesModule,
    PlayerGameDetailsModule,
    GameplayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
