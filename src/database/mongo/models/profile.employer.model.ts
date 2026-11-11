import { ObjectId } from 'mongoose';

export interface ProfileEmployerModel {
	user_id?: ObjectId;
	/*Organization profile information*/
	profile?: {
		name?: string;
		type?: string;
		ind?: string /*Type of Industry*/;
		alias?: string;
		/*Point of contact information*/
		poc?: {
			name?: string;
			role?: string /* Designation or role of contact person*/;
			ph?: {
				prim?: string /*Primary contact phone number*/;
				secd?: string /*Secondary contact phone number*/;
			};
		};
		web?: string /*Website URL*/;
		hvpf?: string /*Profile for Hot Vacancies*/;
		clpf?: string /*Profile for Classifieds*/;
		fax?: string;
		tan?: string;
	};

	tc?: boolean /*Terms and conditions are accepeted*/;
	created_at?: number;
	updated_at?: number;
}
