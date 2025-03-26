import { Controller, Get, Query } from '@nestjs/common'
import { MovementsService } from './movements.service'
import { ListMovemtsDto } from './dto/list-movemt.dto'

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  findAll(@Query() listMovemtsDto: ListMovemtsDto) {
    return this.movementsService.findAll(listMovemtsDto)
  }
}
