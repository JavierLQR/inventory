import { Transform } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'
export class CreateEntryDto {
  @IsOptional()
  @IsDate()
  date?: Date

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  entry: number
  
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  balance: number

  @IsString()
  movementTypeId: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  categoryId: string

  @IsString()
  productId: string

  @IsString()
  typeProductId: string

  @IsString()
  typePresentationId: string
}
