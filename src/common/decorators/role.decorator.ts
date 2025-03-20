import { SetMetadata } from '@nestjs/common'

export const ROLES = 'roles'

export const RolesDefault = (roles: Array<keyof KeyRoles>) =>
  SetMetadata(ROLES, roles)

export type KeyRoles = {
  ADMIN: 'ADMIN'
  ALMACENERO: 'ALMACENERO'
}

const ROLESDEFAULT: KeyRoles = {
  ADMIN: 'ADMIN',
  ALMACENERO: 'ALMACENERO',
}

export const { ADMIN, ALMACENERO } = ROLESDEFAULT
