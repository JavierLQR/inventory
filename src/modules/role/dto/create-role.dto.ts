import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRoleDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: 'ADMIN' | 'STOREKEEPER'
}
