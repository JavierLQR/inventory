import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
export class CreateProviderDto {
  @IsOptional()
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  phone: string

  @IsString()
  @IsNotEmpty()
  ruc: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  corporate_reason: string

  @IsOptional()
  @IsString()
  logo: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  businessName: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  legalRepresentative: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  address: string

  @IsOptional()
  @IsString()
  updatedAt?: string | Date

  @IsOptional()
  @IsString()
  createdAt?: string | Date
}
