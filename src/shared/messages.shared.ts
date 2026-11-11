export function messageFactory(message: string, msgParams?: string[]): string {
	if (msgParams) {
		msgParams.forEach((val, key) => {
			message = message.split(`ARG${key}`).join(val?.toString());
		});
	}
	return message;
}

export const enum messages {
	//ARG0,ARG1 ... ARGn should be in sequence.
	//Genaral messages : Start with Gn
	G1 = 'Techkri',
	G2 = 'Alchemy',
	G3 = 'NOTIFICATION SERVICE API DOCUMENTATION',

	//Success messages : Start with Sn
	S1 = `${G1} notification service is listening on ARG0`,
	S2 = `${G1} notification service is up and running`,
	S3 = 'Connected to mongo db!',
	S4 = 'Success',
	S5 = 'Notifications updated successfully',
	//Warning messages : Start with Wn
	W1 = 'Please provide a valid ARG0!',
	W2 = 'ARG0 should not be empty!',
	W3 = 'Out of all notification id some are invalid ids!',

	//Error messages : Start with En
	E1 = `${G1} notification service start failed! :: ARG0`,
	E2 = 'Oops! An error occurred while processing your request',
	E3 = 'Unauthorized request!',
	E4 = 'An error occurred while establishing connection to mongo db : ARG0',
	E5 = 'Mongo database connection disconnected!',
	E6 = 'Mongo database connection disconnected through app termination!',
	E7 = 'We are sorry, but you do not have access to this resource [ARG0]!',
	E8 = 'You do not have permission to access the feature you are requesting. Please contact the system administrator or customer support for further assistance!',
	E9 = 'Invalid authentication method. Only Bearer is supported!'
}
