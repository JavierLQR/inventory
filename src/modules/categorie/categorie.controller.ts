import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CategorieService } from './categorie.service'
import { CreateCategorieDto } from './dto/create-categorie.dto'
import { UpdateCategorieDto } from './dto/update-categorie.dto'
import { ListCategorieDto } from './dto/list-categorie.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('categorie')
@UseGuards(AuthUserGuard)
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post('create')
  createOrUpdate(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categorieService.createOrUpdate(createCategorieDto)
  }

  @Get('list')
  findAll(@Query() listCategorieDto: ListCategorieDto) {
    return this.categorieService.findAll(listCategorieDto)
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ) {
    return this.categorieService.createOrUpdate(
      updateCategorieDto as CreateCategorieDto,
      id,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(id)
  }
}
