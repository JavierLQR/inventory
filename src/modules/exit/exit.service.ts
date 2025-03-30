import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { ListExitDto } from './dto/list.exit.dto'

@Injectable()
export class ExitService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(ListExitDto: ListExitDto) {
    const { page = 1, size = 25 } = ListExitDto

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
          moventType: {
            select: {
              name: true,
              id: true,
            },
          },
        },
        omit: {
          productId: true,
          movementTypeId: true,
        },
        where: {
          moventType: {
            name: 'SALIDA',
          },
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
