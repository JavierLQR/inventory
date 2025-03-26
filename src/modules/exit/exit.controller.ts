import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ExitService } from './exit.service'
import { CreateExitDto } from './dto/create-exit.dto'
import { UpdateExitDto } from './dto/update-exit.dto'
import { ListExitDto } from './dto/list.exit.dto'

@Controller('exit')
export class ExitController {
  constructor(private readonly exitService: ExitService) {}

  @Post()
  create(@Body() createExitDto: CreateExitDto) {
    return this.exitService.create(createExitDto)
  }

  @Get()
  findAll(@Query() listExitDto: ListExitDto) {
    return this.exitService.findAll(listExitDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exitService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExitDto: UpdateExitDto) {
    return this.exitService.update(+id, updateExitDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exitService.remove(+id)
  }
}
