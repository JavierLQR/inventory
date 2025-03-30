import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ListProductDto } from './dto/list-product.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller('product')
@UseGuards(AuthUserGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createOrUpdate(createProductDto)
  }

  @Get()
  findAll(@Query() listProductDto: ListProductDto) {
    return this.productService.findAll(listProductDto)
  }
  @Get('actives/:id')
  findOneProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOneProduct(id)
  }

  @Get('actives')
  findAllActives() {
    return this.productService.findAllActives()
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.createOrUpdate(
      updateProductDto as CreateProductDto,
      id,
    )
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id)
  }
}
