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
import { EntryService } from './entry.service'
import { CreateEntryDto } from './dto/create-entry.dto'
import { UpdateEntryDto } from './dto/update-entry.dto'
import { ListEntryDto } from './dto/list-entry.dto'

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entryService.create(createEntryDto)
  }

  @Get()
  findAll(@Query() data: ListEntryDto) {
    return this.entryService.findAll(data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(+id, updateEntryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(+id)
  }
}
