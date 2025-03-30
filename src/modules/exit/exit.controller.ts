import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthUserGuard } from '../auth/guards/auth.guard'
import { ListExitDto } from './dto/list.exit.dto'
import { ExitService } from './exit.service'

@Controller('exit')
@UseGuards(AuthUserGuard)
export class ExitController {
  constructor(private readonly exitService: ExitService) {}

  @Get()
  findAll(@Query() listExitDto: ListExitDto) {
    return this.exitService.findAll(listExitDto)
  }
}
