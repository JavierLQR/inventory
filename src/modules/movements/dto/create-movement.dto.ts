import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateMovementDto {
  @IsOptional()
  @IsDate()
  date?: Date

  @IsOptional()
  @IsInt()
  entry?: number

  @IsOptional()
  @IsInt()
  exit?: number

  @IsOptional()
  @IsInt()
  balance: number

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  @IsNotEmpty()
  productId: string

  @IsString()
  @IsNotEmpty()
  movementTypeId: string

  @IsString()
  @IsNotEmpty()
  typePresentationId: string

  @IsNotEmpty()
  @IsString()
  categoryId: string

  @IsNotEmpty()
  @IsString()
  typeProductId: string
}
