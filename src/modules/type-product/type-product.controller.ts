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
import { TypeProductService } from './type-product.service'
import { CreateTypeProductDto } from './dto/create-type-product.dto'
import { UpdateTypeProductDto } from './dto/update-type-product.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('type-product')
@UseGuards(AuthUserGuard)
export class TypeProductController {
  constructor(private readonly typeProductService: TypeProductService) {}

  @Post()
  create(@Body() createTypeProductDto: CreateTypeProductDto) {
    return this.typeProductService.createOrUpdate(createTypeProductDto)
  }

  @Get()
  findAll() {
    return this.typeProductService.findAll()
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeProductDto: UpdateTypeProductDto,
  ) {
    return this.typeProductService.createOrUpdate(
      updateTypeProductDto as CreateTypeProductDto,
      id,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeProductService.remove(id)
  }
}
