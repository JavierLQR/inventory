import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
export class CreateTypePresentationDto {
  @IsOptional()
  @IsString()
  id: string
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string
}
