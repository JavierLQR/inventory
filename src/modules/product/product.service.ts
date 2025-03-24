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
    const {
      categoryId,
      name,
      typePresentationId,
      typeProductId,
      is_active,
      description,
    } = createProductDto
    this.logger.debug(
      `${id_product ? 'Updating product' : 'Creating product'} product ${name}`,
    )
    await this.verifyProduct(name, id_product)
    const product = await this.prismaService.product.upsert({
      create: {
        name,
        categoryId,
        is_active,
        typePresentationId,
        typeProductId,
        description,
      },
      update: {
        name,
        categoryId,
        typePresentationId,
        is_active,
        typeProductId,
        description,
      },
      where: {
        id: id_product ?? '',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            is_active: true,
            description: true,
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
      omit: {
        categoryId: true,
        typePresentationId: true,
        typeProductId: true,
      },
    })
    return {
      product,
      status: HttpStatus.OK,
      message: id_product ? 'Producto actualizado' : 'Producto creado',
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
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        omit: {
          categoryId: true,
          typePresentationId: true,
          typeProductId: true,
        },
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
  private async verifyProduct(name: string, id_product: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        name,
      },
    })
    if (product && product.id !== id_product)
      throw new ConflictException(`Product '${product.name}' ya existe `)
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
