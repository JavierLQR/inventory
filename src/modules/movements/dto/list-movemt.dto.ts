import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator'

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
  size?: number = 25

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe ser en el formato YYYY-MM-DD',
  })
  startDate?: string

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe ser en el formato YYYY-MM-DD',
  })
  endDate?: string

  @IsOptional()
  @IsString()
  search?: string
}
