import { SetMetadata } from '@nestjs/common';
import { DecoratorConstant } from '../constants/decorator.constant';
import { AdminPermission } from '../enums/admin-permission.enum';
import { RoleType } from '../enums/app-role.enum';
import { EmployerPermission } from '../enums/employer-permission.enum';

export const HasRoles = (roles: RoleType[], permissions?: AdminPermission[] | EmployerPermission[]) =>
	SetMetadata(DecoratorConstant.HAS_ROLES, { roles, permissions });
