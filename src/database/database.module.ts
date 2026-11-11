import { DatabaseService } from '@app/database/database.service';
import { AbstractWebSocketDao } from '@app/database/mongo/abstract/websocket.abstract';
import { mongoDbProvider } from '@app/database/mongo/connection/connection.mongo';
import { mongoDbModelsProvider } from '@app/database/mongo/connection/models.connection.mongo';
import { WebsocketDao } from '@app/database/mongo/dao/websocket.dao';
import { Module } from '@nestjs/common';
import { NotificationDao } from './mongo/dao/manage-notification.dao';
import { AbstractNotificationDao } from './mongo/abstract/manage-notification.abstract';

@Module({
	providers: [
		...mongoDbProvider,
		...mongoDbModelsProvider,
		DatabaseService,
		{
			provide: AbstractNotificationDao,
			useClass: NotificationDao
		},
		{
			provide: AbstractWebSocketDao,
			useClass: WebsocketDao
		}
	],
	exports: [DatabaseService]
})
export class DatabaseModule {}
