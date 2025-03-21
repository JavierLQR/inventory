import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { PrismaService } from 'nestjs-prisma'
import { ListProductDto } from './dto/list-product.dto'

@Injectable()
export class ProductService {
  private readonly logger: Logger = new Logger(ProductService.name)
  constructor(private readonly prismaService: PrismaService) {}

  async createOrUpdate(
    createProductDto: CreateProductDto,
    id_product?: string,
  ) {
    const { categoryId, name, typePresentationId, typeProductId } =
      createProductDto
    this.logger.debug(
      `${id_product ? 'Updating product' : 'Creating product'} product ${name}`,
    )
    await this.verifyProduct(createProductDto.id)
    const product = await this.prismaService.product.upsert({
      create: {
        name,
        categoryId,
        typePresentationId,
        typeProductId,
      },
      update: {
        name,
        categoryId,
        typePresentationId,
        typeProductId,
      },
      where: {
        id: id_product ?? '',
      },
      include: {
        category: true,
        TypePresentation: true,
        typeProduct: true,
      },
    })
    return {
      product,
      status: HttpStatus.OK,
      message: 'Producto creado',
    }
  }

  async findAll(listProductDto: ListProductDto) {
    const { page, size } = listProductDto
    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.product.count(),
      this.prismaService.product.findMany({
        include: {
          category: {
            select: {
              id: true,
              name: true,
              is_active: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          TypePresentation: true,
          typeProduct: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip: (page - 1) * size,
        take: size,
        orderBy: { createdAt: 'desc' },
      }),
    ])
    if (!data || !data.length)
      return { data: [], count: 0, status: HttpStatus.OK }
    return {
      data,
      count,
      status: HttpStatus.OK,
    }
  }
  private async verifyProduct(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    })
    if (product)
      throw new ConflictException(`Product ${product.name}  already exists`)
  }

  async remove(id: string) {
    await this.prismaService.product.delete({
      where: {
        id,
      },
    })
    return {
      message: 'Producto eliminado',
      status: HttpStatus.OK,
    }
  }
}
