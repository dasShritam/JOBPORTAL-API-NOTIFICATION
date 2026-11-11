import { Module } from '@nestjs/common';
import { AuthGateWay } from './gateways/auth.gateway';
import { PrivateGateWay } from './gateways/private.gateway';
import { RoomService } from './services/room.service';

@Module({
	providers: [RoomService, AuthGateWay, PrivateGateWay]
})
export class SocketModule {}
