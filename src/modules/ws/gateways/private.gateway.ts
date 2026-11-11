import AppLogger from '@app/core/logger/app-logger';
import { HttpStatus } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { ManageJobEvents } from '../events/manage-job-service.event';
import { NotificationPayload } from '../models';
import { NAMESPACE } from '../services/ns.service';
import { RoomService } from '../services/room.service';

@WebSocketGateway({ namespace: NAMESPACE.PRIVATE, path: '/websocket/connect', transports: ['websocket'] })
export class PrivateGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(readonly _loggerSvc: AppLogger, private readonly roomService: RoomService) {}

	afterInit() {
		this._loggerSvc.log('Private socket gateway is initialized', HttpStatus.OK);
	}

	/*Called upon client successful connection*/
	handleConnection(@ConnectedSocket() client: Socket) {
		this._loggerSvc.log(`Manage job service connected to private namespace`, HttpStatus.OK);
	}

	/*Called upon client disconnection*/
	handleDisconnect(@ConnectedSocket() client: Socket) {}

	@SubscribeMessage(ManageJobEvents.FOLLOWING)
	onFollow(@MessageBody() data: NotificationPayload) {
		this._loggerSvc.log('Follow event triggered', HttpStatus.OK);
		this.roomService.sendToRoom(data.recipient, ManageJobEvents.FOLLOWING, data);
	}

	@SubscribeMessage(ManageJobEvents.JOB_APPLICATION_STATUS)
	onChangeJobAppStatus(@MessageBody() data: NotificationPayload) {
		this._loggerSvc.log('Job application status change event triggered', HttpStatus.OK);
		this.roomService.sendToRoom(data.recipient, ManageJobEvents.JOB_APPLICATION_STATUS, data);
	}

	@SubscribeMessage(ManageJobEvents.JOB_POST)
	onJobPost(@MessageBody() data: NotificationPayload) {
		this._loggerSvc.log('Job post change event triggered', HttpStatus.OK);
		this.roomService.sendToRoom(data.recipient, ManageJobEvents.JOB_POST, data);
	}

	@SubscribeMessage(ManageJobEvents.SUPPORT_REQUEST)
	onSupportRequest(@MessageBody() data: NotificationPayload) {
		this._loggerSvc.log('New support ticket event triggered', HttpStatus.OK);
		this.roomService.sendToRoom(data.recipient, ManageJobEvents.SUPPORT_REQUEST, data);
	}
}
