import { PartialType } from '@nestjs/mapped-types'
import { CreateTypePresentationDto } from './create-type-presentation.dto'

export class UpdateTypePresentationDto extends PartialType(
  CreateTypePresentationDto,
) {}
