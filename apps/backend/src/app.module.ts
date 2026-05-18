import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { DbModule } from './db/db.module';
import { GameplayModule } from './gameplay/gameplay.module';
import { GamesModule } from './games/games.module';
import { RoomsModule } from './rooms/rooms.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    DbModule,
    AuthModule,
    UsersModule,
    CardsModule,
    RoomsModule,
    GamesModule,
    GameplayModule,
    SocketModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
