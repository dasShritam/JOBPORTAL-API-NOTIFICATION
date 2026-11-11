import { AppConfigService } from '@app/config/appconfig.service';
import AppLogger from '@app/core/logger/app-logger';
import { DatabaseModule } from '@app/database/database.module';
import { MailModule } from './mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/authorization.guard';

export const getProviders = (): any[] => {
	return [AppLogger, AppConfigService, { provide: APP_GUARD, useClass: AuthGuard }];
};

export const exportProvider = (): any[] => {
	return [AppLogger, AppConfigService, DatabaseModule, MailModule];
};
