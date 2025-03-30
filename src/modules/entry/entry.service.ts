import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { ListEntryDto } from './dto/list-entry.dto'

@Injectable()
export class EntryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(ListEntryDto: ListEntryDto) {
    const { page = 1, size = 25 } = ListEntryDto

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
            name: 'ENTRADA',
          },
        },
      }),
    ])
    return {
      status: HttpStatus.OK,
      count,
      data,
    }
  }
}
