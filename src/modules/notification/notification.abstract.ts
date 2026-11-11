import { AppResponse } from '@app/shared/appresponse.shared';
import { AtPayload } from './models/jwt-payload.model';
import { PageDetailsDto, UpdateDetails } from './dto/notification.dto';

export abstract class AbstractNotificationSvc {
	abstract getNotification(claims: AtPayload, pageDetails: PageDetailsDto): Promise<AppResponse>;
	abstract updateNotification(claims: AtPayload, options: UpdateDetails): Promise<AppResponse>;
}
