export interface NotificationPayload {
	id: string;
	title: string;
	/*Sample Content
				{msg:"Welcome",code:"001"} in string
		*/
	content: string;
	sender?: string;
	recipient?: string[];
	role?: string[];
	created_at: number;
}
