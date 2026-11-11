enum AdminPermission {
	JSM = 'JSM' /*Jobseeker management*/,
	ERM = 'ERM' /*Employer management*/,
	DA = 'DA' /*Dashboard Access*/,
	FAQM = 'FAQM' /*Frequently asked question*/,
	CSM = 'CSM' /*Customer support management*/
}

class AdminPermissionGroup {
	static readonly ALL_EMP_PERMISSION: AdminPermission[] = [
		AdminPermission.JSM,
		AdminPermission.ERM,
		AdminPermission.DA,
		AdminPermission.FAQM,
		AdminPermission.CSM
	];
	static readonly JSM: AdminPermission[] = [AdminPermission.JSM];
	static readonly ERM: AdminPermission[] = [AdminPermission.ERM];
	static readonly DA: AdminPermission[] = [AdminPermission.DA];
	static readonly FAQM: AdminPermission[] = [AdminPermission.FAQM];
	static readonly CSM: AdminPermission[] = [AdminPermission.CSM];
	static readonly JSM_ERM: AdminPermission[] = [AdminPermission.JSM, AdminPermission.ERM];
}

export { AdminPermission, AdminPermissionGroup };
