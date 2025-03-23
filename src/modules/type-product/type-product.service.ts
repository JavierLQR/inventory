import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTypeProductDto } from './dto/create-type-product.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TypeProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrUpdate(
    createTypeProductDto: CreateTypeProductDto,
    id_type_product?: string,
  ) {
    const { name } = createTypeProductDto
    await this.verifyTypeProduct(name, id_type_product)
    const typeProduct = await this.prismaService.typeProduct.upsert({
      create: { name },
      update: { name },
      where: {
        id: id_type_product ?? '',
      },
    })
    return {
      status: id_type_product ? HttpStatus.OK : HttpStatus.CREATED,
      message: id_type_product
        ? 'Tipo producto actualizado'
        : 'Tipo producto creado',
      typeProduct,
    }
  }

  async findAll() {
    return await this.prismaService.typeProduct.findMany()
  }

  private async verifyTypeProduct(name: string, id_type_product: string) {
    const typeProduct = await this.prismaService.typeProduct.findUnique({
      where: { name },
    })
    if (typeProduct && typeProduct.id !== id_type_product)
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `El tipo de producto (${name})  ya está en uso.`,
      })
  }

  async remove(id: string) {
    await this.prismaService.typeProduct.delete({
      where: {
        id,
      },
    })
    return {
      status: HttpStatus.OK,
      message: 'Tipo producto eliminado',
    }
  }
}
