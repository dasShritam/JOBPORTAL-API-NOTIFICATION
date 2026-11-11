import { Notifications } from '@app/core/enums/notification.enum';
import { messageFactory, messages } from '@app/shared/messages.shared';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEnum, IsInt, IsMongoId, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class PageDetailsDto {
	@ApiProperty()
	@Min(1, { message: messageFactory(messages.W1, ['page id']) })
	@IsInt({ message: messageFactory(messages.W1, ['page id']) })
	@IsNotEmpty({ message: messageFactory(messages.W2, ['Page id']) })
	readonly pageId: number;
	@ApiProperty()
	@IsOptional()
	@IsInt({ message: messageFactory(messages.W1, ['page limit']) })
	@Min(1, { message: messageFactory(messages.W1, ['page limit']) })
	readonly pageLimit: number;
}

export class UpdateDetails {
	@ApiProperty()
	@IsMongoId({ each: true, message: messageFactory(messages.W1, ['notification id']) })
	readonly notificationId: string[];
	@ApiProperty()
	@IsNotEmpty({ message: messageFactory(messages.W2, ['Action']) })
	@IsEnum([...Notifications.ALL_ACTION], { each: true, message: messageFactory(messages.W1, ['action']) })
	readonly action: string;
}
