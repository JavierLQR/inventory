import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
export class CreateTypeProductDto {
  @IsOptional()
  @IsString()
  id: string
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string
}
