import { Injectable } from '@nestjs/common';
import { AbstractNotificationDao } from './mongo/abstract/manage-notification.abstract';
import { AbstractWebSocketDao } from './mongo/abstract/websocket.abstract';

@Injectable()
export class DatabaseService {
	constructor(public notificationTxn: AbstractNotificationDao, public wsTxn: AbstractWebSocketDao) {}
}
