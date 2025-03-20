import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  id_role: string

  @IsOptional()
  @IsString()
  updatedAt?: string | Date

  @IsOptional()
  @IsString()
  createdAt?: string | Date
}
