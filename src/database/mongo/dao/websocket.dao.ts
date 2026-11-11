import AppLogger from '@app/core/logger/app-logger';
import { AbstractWebSocketDao } from '@app/database/mongo/abstract/websocket.abstract';
import { AtPayload } from '@app/modules/notification/models/jwt-payload.model';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { messages } from '@app/shared/messages.shared';
import { HttpStatus, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoConstants } from '../connection/constants.mongo';
import { NotificationConversationModel } from '../models/notification.conversation.model';

export class WebsocketDao implements AbstractWebSocketDao {
	constructor(
		readonly _loggerSvc: AppLogger,
		@Inject(MongoConstants.NOTIFICATION_CONVERSATION_SCHEMA) private readonly _notificationConversationsSchema: Model<any>
	) {}

	async logNotification(claims: AtPayload, notificationConversationModel: NotificationConversationModel): Promise<AppResponse> {
		try {
			const createRes = await this._notificationConversationsSchema.create({ ...notificationConversationModel });
			return createResponse(HttpStatus.OK, messages.S4, { id: createRes._id });
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR, claims?.sid);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
}
