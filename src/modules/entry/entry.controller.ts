import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthUserGuard } from '../auth/guards/auth.guard'
import { ListEntryDto } from './dto/list-entry.dto'
import { EntryService } from './entry.service'

@Controller('entry')
@UseGuards(AuthUserGuard)
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get()
  findAll(@Query() data: ListEntryDto) {
    return this.entryService.findAll(data)
  }
}
