import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { ListMovemtsDto } from './dto/list-movemt.dto'

@Injectable()
export class MovementsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(listMovemtsDto: ListMovemtsDto) {
    const { page = 1, size = 25 } = listMovemtsDto

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.movement.count(),
      this.prismaService.movement.findMany({
        skip: (page - 1) * size,
        take: size,
        orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
        include: {
          product: {
            omit: {
              categoryId: true,
              typeProductId: true,
              typePresentationId: true,
              updatedAt: true,
              createdAt: true,
            },
          },
          category: {
            select: {
              name: true,
              id: true,
            },
          },
          moventType: {
            select: {
              name: true,
              id: true,
            },
          },
          TypePresentation: {
            select: { id: true, name: true },
          },
          typeProduct: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        omit: {
          productId: true,
          categoryId: true,
          movementTypeId: true,
          typePresentationId: true,
          typeProductId: true,
        },
      }),
    ])
    if (!data || data.length === 0)
      return {
        data,
        status: HttpStatus.OK,
        count: 0,
      }
    return {
      status: HttpStatus.OK,
      count,
      data,
    }
  }
}
