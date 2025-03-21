import { Transform } from 'class-transformer'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
  @IsOptional()
  id?: string

  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @IsString()
  name: string

  @IsUUID()
  @IsString()
  categoryId: string

  @IsUUID()
  @IsString()
  typePresentationId: string

  @IsUUID()
  @IsString()
  typeProductId: string
}
