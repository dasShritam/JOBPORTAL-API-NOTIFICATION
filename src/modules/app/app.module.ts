import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { SocketModule } from '../ws/socket.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [CoreModule, NotificationModule, SocketModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
