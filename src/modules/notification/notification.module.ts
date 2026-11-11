import { Module } from '@nestjs/common';
import { AbstractNotificationSvc } from './notification.abstract';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
@Module({
	imports: [],
	controllers: [NotificationController],
	providers: [
		{
			provide: AbstractNotificationSvc,
			useClass: NotificationService
		}
	]
})
export class NotificationModule {}
