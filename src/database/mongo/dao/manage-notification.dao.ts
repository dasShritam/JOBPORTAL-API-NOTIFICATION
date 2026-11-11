import { AppConfigService } from '@app/config/appconfig.service';
import AppLogger from '@app/core/logger/app-logger';
import { PageDetailsDto, UpdateDetails } from '@app/modules/notification/dto/notification.dto';
import { AtPayload } from '@app/modules/notification/models/jwt-payload.model';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { messages } from '@app/shared/messages.shared';
import { HttpStatus, Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AbstractNotificationDao } from '../abstract/manage-notification.abstract';
import { MongoConstants } from '../connection/constants.mongo';
import { Type } from 'class-transformer';
import { unix_ts_now } from '@app/core/utils/timestamp.utils';

export class NotificationDao implements AbstractNotificationDao {
	constructor(
		readonly _loggerSvc: AppLogger,
		private readonly _appConfigSvc: AppConfigService,
		@Inject(MongoConstants.NOTIFICATION_CONVERSATION_SCHEMA) private readonly _notificationConversationsSchema: Model<any>,
		@Inject(MongoConstants.NOTIFICATION_CONVERSATION_ACTION_SCHEMA) private readonly _notificationConversationActionsSchema: Model<any>
	) {}

	async getNotification(claims: AtPayload, pageDetails: PageDetailsDto): Promise<AppResponse> {
		try {
			let pageLimit: any;
			if (pageDetails?.pageLimit) {
				pageLimit = pageDetails.pageLimit;
			} else {
				const pageData = this._appConfigSvc.get('pageLimit');
				pageLimit = pageData?.pageLimit ? Number(pageData.pageLimit) : 10;
			}
			const notices = await this._notificationConversationsSchema
				.aggregate([
					{
						$match: { $or: [{ rcpt: { $in: [new Types.ObjectId(claims.sub)] } }, { role: claims.roles }] }
					},
					{ $sort: { _id: -1 } },
					{
						$project: {
							_id: 0,
							id: '$_id',
							title: '$title',
							content: '$cont',
							created_at: 1
						}
					}
				])
				.skip(pageLimit * (Number(pageDetails.pageId) - 1))
				.limit(pageLimit);
			const notifId = notices.map((e) => e.id);
			const actions = await this._notificationConversationActionsSchema.aggregate([
				{
					$match: {
						notif_id: { $in: [...notifId] },
						user_id: new Types.ObjectId(claims.sub)
					}
				},
				{
					$project: {
						_id: 0,
						user_id: 1,
						read: 1,
						notif_id: 1,
						del: 1
					}
				}
			]);

			const res: any = [];
			if (notices?.length > 0) {
				notices?.map((notif) => {
					const data = actions?.find((act) => act.notif_id.toString() == notif?.id?.toString());
					if (data) {
						res?.push({ ...notif, read: data.read });
					} else {
						res?.push({ ...notif, read: false });
					}
				});
			}

			const data: any = {
				notifications: res
			};

			if (pageDetails.pageId == 1) {
				const notices = await this._notificationConversationsSchema.aggregate([
					{
						$match: { $or: [{ rcpt: { $in: [new Types.ObjectId(claims.sub)] } }, { role: claims.roles }] }
					},
					{ $sort: { _id: -1 } },
					{
						$project: {
							_id: 0,
							id: '$_id'
						}
					}
				]);
				const notifId = notices.map((e) => e.id);
				const actions = await this._notificationConversationActionsSchema.aggregate([
					{
						$match: {
							notif_id: { $in: [...notifId] },
							user_id: new Types.ObjectId(claims.sub)
						}
					},
					{
						$project: {
							_id: 0,
							read: 1,
							notif_id: 1
						}
					}
				]);
				let totalCount: any = 0;
				if (notices?.length > 0) {
					notices?.map((notif) => {
						const data = actions?.find((act) => act.notif_id.toString() == notif?.id?.toString());
						if (data) {
							if (!data.read) {
								totalCount++;
							}
						} else {
							totalCount++;
						}
					});
				}

				data.count = totalCount;
			}

			return createResponse(HttpStatus.OK, messages.S4, data);
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR, claims.sid);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
	async updateNotification(claims: AtPayload, options: UpdateDetails): Promise<AppResponse> {
		try {
			if (options.notificationId.length) {
				const notificationIds = options.notificationId.map((id) => new Types.ObjectId(id));
				const res = await this._notificationConversationsSchema.find({
					_id: { $in: [...notificationIds] }
				});
				if (notificationIds.length !== res.length) {
					return createResponse(HttpStatus.BAD_REQUEST, messages.W3);
				}
				const bulkOps = notificationIds.map((notificationId) => {
					return {
						updateOne: {
							filter: {
								user_id: new Types.ObjectId(claims?.sub),
								notif_id: notificationId
							},
							update: {
								$set: options.action === 'READ' ? { read: true } : { del: true }
							},
							upsert: true
						}
					};
				});
				await this._notificationConversationActionsSchema.bulkWrite(bulkOps);
			} else {
				const unReadNotification = await this._notificationConversationsSchema.aggregate([
					{ $match: { $or: [{ rcpt: { $elemMatch: { $eq: new Types.ObjectId(claims.sub) } } }, { role: claims.roles }] } },
					{
						$lookup: {
							from: 'NotificationConversationActions',
							let: { notifId: '$_id' },
							pipeline: [
								{
									$match: {
										$expr: {
											$and: [{ $eq: ['$notif_id', '$$notifId'] }, { $eq: ['$user_id', new Types.ObjectId(claims.sub)] }]
										}
									}
								},
								{
									$project: {
										_id: 1
									}
								}
							],
							as: 'notificationInfo'
						}
					},
					{
						$match: {
							notificationInfo: { $eq: [] } // Filter out matching documents
						}
					},
					{
						$project: {
							_id: 1
						}
					}
				]);
				const notifRes = unReadNotification?.map((notification: any) => {
					return {
						notif_id: notification._id,
						user_id: claims.sub,
						created_at: unix_ts_now(),
						del: false,
						read: true
					};
				});
				await this._notificationConversationActionsSchema.insertMany(notifRes);
			}

			return createResponse(HttpStatus.OK, messages.S5);
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR, claims.sid);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
}
