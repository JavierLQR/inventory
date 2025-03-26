import { Transform } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class ListMovemtsDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  page: number = 1
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  size: number = 25
}
