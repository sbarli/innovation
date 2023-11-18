import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { DEFAULT_CACHE_TTL } from './constants/cache.constants';
import { GameplayModule } from './gameplay/gameplay.module';
import { GamesModule } from './games/games.module';
import { GqlConfigService } from './graphql/gql-config.service';
import { PlayerGameDetailsModule } from './player-game-details/player-game-details.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: DEFAULT_CACHE_TTL,
    }),
    AuthModule,
    UsersModule,
    SocketModule,
    CardsModule,
    GamesModule,
    PlayerGameDetailsModule,
    GameplayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
