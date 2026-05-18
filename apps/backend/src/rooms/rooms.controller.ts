import { Controller, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@inno/api-contracts';
import { AuthUser, CurrentUser } from '../auth/decorators/current-user.decorator';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { RoomsService } from './rooms.service';
import type { RoomWithMembers } from './rooms.service';
import type { Room } from '@inno/db-schema';

function serializeRoom(room: RoomWithMembers) {
  return {
    id: room.id,
    name: room.name,
    hostId: room.hostId,
    availableToJoin: room.availableToJoin,
    createdAt: room.createdAt.toISOString(),
    members: room.members,
  };
}

function serializeRoomBase(room: Room) {
  return {
    id: room.id,
    name: room.name,
    hostId: room.hostId,
    availableToJoin: room.availableToJoin,
    createdAt: room.createdAt.toISOString(),
  };
}

@Controller()
@UseGuards(SupabaseAuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @TsRestHandler(contract.rooms.createRoom)
  async createRoom(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.rooms.createRoom, async ({ body }) => {
      const room = await this.roomsService.create(user.userId, body.name);
      return { status: 201 as const, body: serializeRoom(room) };
    });
  }

  @TsRestHandler(contract.rooms.getRoomsForPlayer)
  async getRoomsForPlayer(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.rooms.getRoomsForPlayer, async () => {
      const rooms = await this.roomsService.findForPlayer(user.userId);
      return { status: 200 as const, body: rooms.map(serializeRoom) };
    });
  }

  @TsRestHandler(contract.rooms.getRoom)
  async getRoom() {
    return tsRestHandler(contract.rooms.getRoom, async ({ params }) => {
      const room = await this.roomsService.findById(params.roomId);
      if (!room) return { status: 404 as const, body: { message: 'Room not found' } };
      return { status: 200 as const, body: serializeRoom(room) };
    });
  }

  @TsRestHandler(contract.rooms.joinRoom)
  async joinRoom(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.rooms.joinRoom, async ({ params }) => {
      const room = await this.roomsService.addPlayer(params.roomId, user.userId);
      return { status: 200 as const, body: serializeRoom(room) };
    });
  }

  @TsRestHandler(contract.rooms.updateRoomAvailability)
  async updateRoomAvailability(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.rooms.updateRoomAvailability, async ({ params, body }) => {
      const room = await this.roomsService.updateAvailability(params.roomId, user.userId, body.availableToJoin);
      return { status: 200 as const, body: serializeRoomBase(room) };
    });
  }

  @TsRestHandler(contract.rooms.closeRoom)
  async closeRoom(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.rooms.closeRoom, async ({ params }) => {
      await this.roomsService.close(params.roomId, user.userId);
      return { status: 204 as const, body: undefined };
    });
  }
}
