import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
  @IsOptional()
  @IsString()
  id?: string

  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @IsString()
  name: string

  // pushear esto importante para sincronizar la db
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
