import { Transform } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCategorieDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsOptional()
  @IsBoolean()
  is_active: boolean

  @IsOptional()
  @IsString()
  updatedAt?: string | Date

  @IsOptional()
  @IsString()
  createdAt?: string | Date
}
