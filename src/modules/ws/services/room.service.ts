import AppLogger from '@app/core/logger/app-logger';
import { unix_ts_now } from '@app/core/utils/timestamp.utils';
import { DatabaseService } from '@app/database/database.service';
import { AbstractWebSocketDao } from '@app/database/mongo/abstract/websocket.abstract';
import { NotificationConversationModel } from '@app/database/mongo/models/notification.conversation.model';
import { AtPayload } from '@app/modules/notification/models';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationPayload } from '../models';

@Injectable()
export class RoomService {
	private readonly _wsTxn: AbstractWebSocketDao;
	constructor(readonly _dbSvc: DatabaseService, readonly _loggerSvc: AppLogger) {
		this._wsTxn = _dbSvc.wsTxn;
	}

	private server: Server;

	setSocketServer(server: Server) {
		this.server = server;
	}

	joinRoom(client: Socket, roomName: string) {
		client.join(roomName);
	}

	leaveRoom(client: Socket, roomName: string) {
		client.leave(roomName);
	}

	async sendToRoom(roomName: string | string[], event: string, data: any, claims?: AtPayload) {
		const notificationData = await this.logNotification(data, claims);
		if (notificationData) this.server.to(roomName).emit(event, notificationData);
	}

	/*Log notification to db*/
	async logNotification(data: NotificationPayload, claims: AtPayload): Promise<NotificationPayload> {
		const notificationMdl: NotificationConversationModel = {
			title: data.title,
			cont: JSON.stringify(data.content),
			sndr: data.sender ? data.sender : null,
			rcpt: data.recipient,
			role: data.role ? data.role : []
		};

		const logRes = await this._wsTxn.logNotification(claims, notificationMdl);
		if (logRes.code === 200) {
			let { sender, recipient, ...payload } = data;
			payload = { ...payload, id: logRes.data?.id?.toString(), created_at: unix_ts_now() };

			return payload;
		}
		return null;
	}
}
