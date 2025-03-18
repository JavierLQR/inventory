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
import { ProviderService } from './provider.service'
import { CreateProviderDto } from './dto/create-provider.dto'
import { UpdateProviderDto } from './dto/update-provider.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('provider')
@UseGuards(AuthUserGuard)
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  find() {
    return this.providerService.find()
  }

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.createOrUpdate(createProviderDto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.createOrUpdate(
      updateProviderDto as CreateProviderDto,
      id,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(id)
  }
}
