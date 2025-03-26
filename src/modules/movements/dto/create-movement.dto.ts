import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateMovementDto {
  @IsOptional()
  @IsDate()
  date?: Date

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'La entrada debe ser mayor a 0',
  })
  entry?: number

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'La salida debe ser mayor a 0',
  })
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
