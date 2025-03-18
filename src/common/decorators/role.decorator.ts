import { SetMetadata } from '@nestjs/common'

export const ROLES = 'roles'

export const RolesDefault = (roles: Array<keyof KeyRoles>) =>
  SetMetadata(ROLES, roles)

export type KeyRoles = {
  ADMIN: 'ADMIN'
  ALMACENERO: 'STOREKEEPER'
}

const ROLESDEFAULT: KeyRoles = {
  ADMIN: 'ADMIN',
  ALMACENERO: 'STOREKEEPER',
}

export const { ADMIN, ALMACENERO } = ROLESDEFAULT
