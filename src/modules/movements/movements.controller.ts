import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { MovementsService } from './movements.service'
import { ListMovemtsDto } from './dto/list-movemt.dto'
import { CreateMovementDto } from './dto/create-movement.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('movements')
@UseGuards(AuthUserGuard)
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  findAll(@Query() listMovemtsDto: ListMovemtsDto) {
    return this.movementsService.findAll(listMovemtsDto)
  }

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.upsertMovement(createMovementDto)
  }
  @Patch(':id')
  update(
    @Body() createMovementDto: CreateMovementDto,
    @Param('id') id: string,
  ) {
    return this.movementsService.upsertMovement(createMovementDto, id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementsService.remove(id)
  }
}
