import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as schema from '@inno/db-schema';
import type { Room, User } from '@inno/db-schema';
import { MAX_USERS_PER_ROOM } from '@inno/constants';
import { eq } from 'drizzle-orm';
import { DbService } from '../db/db.service';

export interface RoomWithMembers extends Room {
  members: Pick<User, 'id' | 'username'>[];
}

@Injectable()
export class RoomsService {
  constructor(private readonly dbService: DbService) {}

  async create(hostId: string, name: string): Promise<RoomWithMembers> {
    return this.dbService.withInnoRole(async (tx) => {
      const [room] = await tx
        .insert(schema.rooms)
        .values({ name, hostId })
        .returning();

      await tx.insert(schema.roomMembers).values({ roomId: room.id, userId: hostId });

      const host = await tx
        .select({ id: schema.users.id, username: schema.users.username })
        .from(schema.users)
        .where(eq(schema.users.id, hostId))
        .limit(1);

      return { ...room, members: host };
    });
  }

  async findById(roomId: string): Promise<RoomWithMembers | null> {
    return this.dbService.withInnoRole(async (tx) => {
      const [room] = await tx
        .select()
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId))
        .limit(1);

      if (!room) return null;

      const members = await tx
        .select({ id: schema.users.id, username: schema.users.username })
        .from(schema.roomMembers)
        .innerJoin(schema.users, eq(schema.roomMembers.userId, schema.users.id))
        .where(eq(schema.roomMembers.roomId, roomId));

      return { ...room, members };
    });
  }

  async findByIdOrThrow(roomId: string): Promise<RoomWithMembers> {
    const room = await this.findById(roomId);
    if (!room) throw new NotFoundException(`Room ${roomId} not found`);
    return room;
  }

  async findForPlayer(playerId: string): Promise<RoomWithMembers[]> {
    return this.dbService.withInnoRole(async (tx) => {
      const playerRooms = await tx
        .select({ roomId: schema.roomMembers.roomId })
        .from(schema.roomMembers)
        .where(eq(schema.roomMembers.userId, playerId));

      const rooms: RoomWithMembers[] = [];
      for (const { roomId } of playerRooms) {
        const room = await this.findById(roomId);
        if (room) rooms.push(room);
      }
      return rooms;
    });
  }

  async addPlayer(roomId: string, userId: string): Promise<RoomWithMembers> {
    return this.dbService.withInnoRole(async (tx) => {
      const room = await this.findByIdOrThrow(roomId);

      if (room.members.length >= MAX_USERS_PER_ROOM) {
        throw new BadRequestException('Room is full');
      }

      if (!room.availableToJoin) {
        throw new BadRequestException('Room is not available to join');
      }

      const alreadyMember = room.members.some((m) => m.id === userId);
      if (!alreadyMember) {
        await tx.insert(schema.roomMembers).values({ roomId, userId });
      }

      return this.findByIdOrThrow(roomId);
    });
  }

  async updateAvailability(roomId: string, hostId: string, availableToJoin: boolean): Promise<Room> {
    return this.dbService.withInnoRole(async (tx) => {
      const [room] = await tx
        .select()
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId))
        .limit(1);

      if (!room) throw new NotFoundException(`Room ${roomId} not found`);
      if (room.hostId !== hostId) throw new ForbiddenException('Only the host can update room availability');

      const [updated] = await tx
        .update(schema.rooms)
        .set({ availableToJoin })
        .where(eq(schema.rooms.id, roomId))
        .returning();

      return updated;
    });
  }

  async close(roomId: string, hostId: string): Promise<void> {
    return this.dbService.withInnoRole(async (tx) => {
      const [room] = await tx
        .select()
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId))
        .limit(1);

      if (!room) throw new NotFoundException(`Room ${roomId} not found`);
      if (room.hostId !== hostId) throw new ForbiddenException('Only the host can close the room');

      await tx.delete(schema.rooms).where(eq(schema.rooms.id, roomId));
    });
  }
}
