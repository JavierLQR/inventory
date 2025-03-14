import { SetMetadata } from '@nestjs/common'

export const ROLES = 'roles'

export const RolesDefault = (roles: Array<keyof KeyRoles>) =>
  SetMetadata(ROLES, roles)

type KeyRoles = {
  ADMIN: 'ADMIN'
  ALMACENERO: 'ALMANECERO'
}

const ROLESDEFAULT: KeyRoles = {
  ADMIN: 'ADMIN',
  ALMACENERO: 'ALMANECERO',
}

export const { ADMIN, ALMACENERO } = ROLESDEFAULT
