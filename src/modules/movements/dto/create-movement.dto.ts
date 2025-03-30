import { Transform } from 'class-transformer'
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
  @Transform(({ value }) => parseInt(value))
  entry?: number

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'La salida debe ser mayor a 0',
  })
  @Transform(({ value }) => parseInt(value))
  exit?: number

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
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
