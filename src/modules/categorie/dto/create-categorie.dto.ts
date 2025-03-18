import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCategorieDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  is_active: boolean

  @IsOptional()
  @IsString()
  updatedAt?: string | Date

  @IsOptional()
  @IsString()
  createdAt?: string | Date
}
