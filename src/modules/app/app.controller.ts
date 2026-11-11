import { AppService } from '@app/modules/app/app.service';
import { AppResponse } from '@app/shared/appresponse.shared';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('notification')
export class AppController {
	constructor(private readonly _appService: AppService) {}

	@Get('status')
	status(): Promise<AppResponse> {
		return this._appService.status();
	}
}
