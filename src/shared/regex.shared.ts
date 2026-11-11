class CommonRegExp {
	public static readonly NAME_REGEXP = /^[A-Za-z]+[A-Za-z\s]{3,202}$/g;
	public static readonly EMAIL_REGEXP = /^(?=[^+\-*\/]*$)([A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}([.][a-zA-Z]{2,})?)$/g;
	public static readonly PHONE_REGEXP = /^[1-9][0-9]{5,11}$/g;
	public static readonly VIDEO_FILE_REGEXP = /^video\/(m4v|mkv|mp4)$/;
	public static readonly WALK_IN_TIME_REGEXP = /^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/g;
	public static readonly DATE_REGEXP = /^\d{4}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[1-2][0-9]|3[01])$/;
	public static readonly URL_REGEXP = /\b(https?:\/\/|www\.)[\w\-]+(\.[\w\-]+)+[\w\-\.\?=&%]*\b/g;
	public static readonly DAY_REGEXP = /^[0-6]$/;
}

export { CommonRegExp };
