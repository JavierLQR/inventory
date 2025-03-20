import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTypeMovementDto {
  @IsOptional()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toUpperCase().trim())
  name: TypesMovements
}

export type TypesMovements = 'SALIDA' | 'ENTRADA'
