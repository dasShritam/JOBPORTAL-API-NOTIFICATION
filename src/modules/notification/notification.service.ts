import AppLogger from '@app/core/logger/app-logger';
import { DatabaseService } from '@app/database/database.service';
import { AbstractNotificationDao } from '@app/database/mongo/abstract/manage-notification.abstract';
import { AppResponse } from '@app/shared/appresponse.shared';
import { Injectable } from '@nestjs/common';
import { PageDetailsDto, UpdateDetails } from './dto/notification.dto';
import { AtPayload } from './models/jwt-payload.model';
import { AbstractNotificationSvc } from './notification.abstract';

@Injectable()
export class NotificationService implements AbstractNotificationSvc {
	private readonly _notificationTxn: AbstractNotificationDao;
	constructor(readonly _dbSvc: DatabaseService, readonly _loggerSvc: AppLogger) {
		this._notificationTxn = _dbSvc.notificationTxn;
	}

	async getNotification(claims: AtPayload, pageDetails: PageDetailsDto): Promise<AppResponse> {
		return this._notificationTxn.getNotification(claims, pageDetails);
	}
	async updateNotification(claims: AtPayload, options: UpdateDetails): Promise<AppResponse> {
		return this._notificationTxn.updateNotification(claims, options);
	}
}
