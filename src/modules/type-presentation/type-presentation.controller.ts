import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { TypePresentationService } from './type-presentation.service'
import { CreateTypePresentationDto } from './dto/create-type-presentation.dto'
import { UpdateTypePresentationDto } from './dto/update-type-presentation.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('type-presentation')
@UseGuards(AuthUserGuard)
export class TypePresentationController {
  constructor(
    private readonly typePresentationService: TypePresentationService,
  ) {}

  @Post()
  create(@Body() createTypePresentationDto: CreateTypePresentationDto) {
    return this.typePresentationService.createOrUpdate(
      createTypePresentationDto,
    )
  }

  @Get()
  findAll() {
    return this.typePresentationService.findAll()
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypePresentationDto: UpdateTypePresentationDto,
  ) {
    return this.typePresentationService.createOrUpdate(
      updateTypePresentationDto as CreateTypePresentationDto,
      id,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typePresentationService.remove(id)
  }
}
