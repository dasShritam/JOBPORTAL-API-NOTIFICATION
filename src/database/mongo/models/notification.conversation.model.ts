export interface NotificationConversationModel {
	title: string;
	/*Sample Content
		{msg:"Welcome",code:"001"} in string
	*/
	cont: string;
	/*Sender*/
	sndr: string | null;
	/*Recipients of notification*/
	rcpt?: string[];
	/*Role/User group who have access to posted notification*/
	role?: string[];
	/*Notification status*/
	sts?: string;
	/*Device Information*/
	device?: string;
}
