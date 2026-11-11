import { AppConfigService } from '@app/config/appconfig.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppMailService } from './mail.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (configService: AppConfigService) => ({
				...configService.get('mailConfig')
			}),
			inject: [AppConfigService]
		})
	],
	providers: [AppMailService],
	exports: [AppMailService]
})
export class MailModule {}
