import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
  @IsOptional()
  @IsString()
  id?: string

  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsUUID()
  @IsString()
  categoryId: string

  @IsUUID()
  @IsString()
  typePresentationId: string

  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value === 'true' ? true : false,
  )
  @IsBoolean()
  is_active: boolean

  @IsUUID()
  @IsString()
  typeProductId: string

  @IsOptional()
  @IsString()
  updatedAt: string

  @IsOptional()
  @IsString()
  createdAt: string
}
