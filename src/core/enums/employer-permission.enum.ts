enum EmployerPermission {
	MIJ = 'MIJ' /*Manage Internal Job Post*/,
	MEJ = 'MEJ' /*Manage External Job Post*/
}

class EmployerPermissionGroup {
	static readonly ALL_EMP_PERMISSION: EmployerPermission[] = [EmployerPermission.MIJ, EmployerPermission.MEJ];

	static readonly MIJ: EmployerPermission[] = [EmployerPermission.MIJ];

	static readonly MEJ: EmployerPermission[] = [EmployerPermission.MEJ];
}

export { EmployerPermission, EmployerPermissionGroup };
