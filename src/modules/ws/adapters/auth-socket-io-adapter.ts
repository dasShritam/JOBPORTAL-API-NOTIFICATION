import { HttpException, HttpStatus, INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { NAMESPACE } from '../services/ns.service';
import { WsException } from '@nestjs/websockets';
import { messages } from '@app/shared/messages.shared';
import AppLogger from '@app/core/logger/app-logger';

export class AuthSocketAdapter extends IoAdapter {
	private readonly _loggerSvc: AppLogger;
	constructor(private app: INestApplicationContext) {
		super(app);
		this._loggerSvc = app.get(AppLogger);
	}

	createIOServer(port: number, options?: ServerOptions) {
		const server: Server = super.createIOServer(port, options),
			namespace = server.of(NAMESPACE.AUTH);
		namespace.use(async (socket: any, next) => {
			const tokenPayload: string = socket.handshake?.auth?.token || socket.handshake?.headers?.authorization;

			if (!tokenPayload) {
				this._loggerSvc.log('Called without token', HttpStatus.UNAUTHORIZED);
				return next(new HttpException(messages.E3, HttpStatus.UNAUTHORIZED));
			}

			const [method, token] = tokenPayload.split(' ');

			if (!method || method.toLowerCase() !== 'bearer') {
				return next(new HttpException(messages.E9, HttpStatus.UNAUTHORIZED));
			}

			/*Validate token*/
			if (!token) {
				return next(new HttpException(messages.E3, HttpStatus.UNAUTHORIZED));
			}

			/*Extract payload from jwt*/
			const tokenMeta = token.split('.');

			if (tokenMeta.length !== 3) {
				return next(new HttpException(messages.E3, HttpStatus.UNAUTHORIZED));
			}

			/*Decode jwt token using buffer constructor and append to request object*/
			socket.claims = JSON.parse(Buffer.from(tokenMeta[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8'));

			return next();
		});
		return server;
	}
}
