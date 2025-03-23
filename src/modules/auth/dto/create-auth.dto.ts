import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
