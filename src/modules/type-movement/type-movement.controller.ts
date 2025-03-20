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
import { TypeMovementService } from './type-movement.service'
import { CreateTypeMovementDto } from './dto/create-type-movement.dto'
import { UpdateTypeMovementDto } from './dto/update-type-movement.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('type-movement')
export class TypeMovementController {
  constructor(private readonly typeMovementService: TypeMovementService) {}

  @Post()
  // @UseGuards(AuthUserGuard)
  create(@Body() createTypeMovementDto: CreateTypeMovementDto) {
    return this.typeMovementService.createOrUpdate(createTypeMovementDto)
  }

  @Get()
  @UseGuards(AuthUserGuard)
  findAll() {
    return this.typeMovementService.findAll()
  }

  @Patch(':id')
  @UseGuards(AuthUserGuard)
  update(
    @Param('id') id: string,
    @Body() updateTypeMovementDto: UpdateTypeMovementDto,
  ) {
    return this.typeMovementService.createOrUpdate(
      updateTypeMovementDto as CreateTypeMovementDto,
      id,
    )
  }

  @Delete(':id')
  @UseGuards(AuthUserGuard)
  remove(@Param('id') id: string) {
    return this.typeMovementService.remove(id)
  }
}
