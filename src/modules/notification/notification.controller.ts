import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractNotificationSvc } from './notification.abstract';
import { AppResponse } from '@app/shared/appresponse.shared';
import { Authorize } from '@app/core/decorators/authorization.decorator';
import { PageDetailsDto, UpdateDetails } from './dto/notification.dto';

@ApiTags('Manage Notifcation')
@Controller('notification')
export class NotificationController {
	constructor(private readonly _notificationSvc: AbstractNotificationSvc) {}

	@Authorize()
	@Post('fetch-notification')
	async getNotification(@Req() req: any, @Body() pageDetails: PageDetailsDto): Promise<AppResponse> {
		return this._notificationSvc.getNotification(req.claims, pageDetails);
	}
	@Authorize()
	@Patch('update-notification')
	async updateNotification(@Req() req: any, @Body() options: UpdateDetails): Promise<AppResponse> {
		return this._notificationSvc.updateNotification(req.claims, options);
	}
}
