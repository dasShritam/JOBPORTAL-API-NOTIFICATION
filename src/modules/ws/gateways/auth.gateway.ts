import AppLogger from '@app/core/logger/app-logger';
import { AtPayload } from '@app/modules/notification/models';
import { HttpStatus } from '@nestjs/common';
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NAMESPACE } from '../services/ns.service';
import { RoomService } from '../services/room.service';

/*Authenticated gateway*/
@WebSocketGateway({ namespace: NAMESPACE.AUTH, path: '/websocket/connect', transports: ['websocket'] })
export class AuthGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(readonly _loggerSvc: AppLogger, private readonly roomService: RoomService) {}

	afterInit() {
		this.roomService.setSocketServer(this.server);
		this._loggerSvc.log('Authenticated socket gateway is initialized', HttpStatus.OK);
	}

	/*Called upon client successful connection*/
	handleConnection(@ConnectedSocket() client: Socket) {
		const { sub }: AtPayload = client['claims'] ? client['claims'] : {};
		if (sub) this.roomService.joinRoom(client, sub);
		this._loggerSvc.log(`User with id:${sub} connected to auth namespace`, HttpStatus.OK);
	}

	/*Called upon client disconnection*/
	handleDisconnect(client: Socket) {
		const { sub }: AtPayload = client['claims'] ? client['claims'] : {};
		if (sub) this.roomService.leaveRoom(client, sub);
	}
}
