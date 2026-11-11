import { PageDetailsDto, UpdateDetails } from '@app/modules/notification/dto/notification.dto';
import { AtPayload } from '@app/modules/notification/models/jwt-payload.model';
import { AppResponse } from '@app/shared/appresponse.shared';

export abstract class AbstractNotificationDao {
	abstract getNotification(claims: AtPayload, pageDetails: PageDetailsDto): Promise<AppResponse>;
	abstract updateNotification(claims: AtPayload, options: UpdateDetails): Promise<AppResponse>;
}
