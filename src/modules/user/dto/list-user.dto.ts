import { Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator'

export class ListUserDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page: number = 1

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(50)
  size: number = 25
}
