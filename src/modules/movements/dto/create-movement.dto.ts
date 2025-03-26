import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'

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
  productId: string

  @IsString()
  movementTypeId: string

  @IsString()
  typePresentationId: string

  @IsString()
  categoryId: string

  @IsString()
  typeProductId: string
}
