export class AppConfigService {
	private readonly envConfig: { [key: string]: any } = {};
	constructor() {
		/*App configurations*/
		this.envConfig.app = {
			port: parseInt(process.env.NOTIFICATION_SVC_PORT, 10),
			environment: process.env.ENVIRONMENT
		};

		/*Database*/
		this.envConfig.db = {
			mongo: {
				uri: process.env.APP_CONNECTIONSTRING_MONGO
			}
		};

		/*blob configuration*/
		this.envConfig.blobStorage = {
			blobAccountName: process.env.BLOB_AC_NAME,
			blobAccountKey: process.env.BLOB_AC_KEY,
			blobAccountConnectionString: process.env.BLOB_CONNECTION_STRING,
			blobLoggerContainer: process.env.BLOB_LOGGER_CONTAINER
		};

		/*Logger*/
		this.envConfig.logger = {
			logLevel: process.env.LOG_LEVEL
		};

		/*Init mail credentials*/
		this.envConfig.mailConfig = {
			transport: {
				host: process.env.MAIL_SVC_HOST,
				port: 588,
				auth: {
					user: process.env.MAIL_SVC_USERNAME,
					pass: process.env.MAIL_SVC_PASSWORD
				},
				tls: {
					rejectUnauthorized: false
				}
			},
			defaults: {
				from: {
					name: process.env.MAIL_SVC_FROM_NAME,
					address: process.env.MAIL_SVC_FROM
				}
			}
		};
		/* Page Limit */
		this.envConfig.pageLimit = {
			pageLimit: process.env.PAGE_LIMIT
		};
	}

	get(key: string): any {
		return this.envConfig[key];
	}
}
