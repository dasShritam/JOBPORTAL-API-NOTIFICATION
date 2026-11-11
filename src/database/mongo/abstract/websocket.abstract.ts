import { AtPayload } from '@app/modules/notification/models/jwt-payload.model';
import { NotificationConversationModel } from '../models/notification.conversation.model';
import { AppResponse } from '@app/shared/appresponse.shared';

export abstract class AbstractWebSocketDao {
	abstract logNotification(claims: AtPayload, notificationConversationModel: NotificationConversationModel): Promise<AppResponse>;
}
