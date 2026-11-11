export enum Actions {
	READ = 'READ',
	DELETE = 'DELETE'
}
export class Notifications {
	static readonly ALL_ACTION: Actions[] = [Actions.READ, Actions.DELETE];
}
