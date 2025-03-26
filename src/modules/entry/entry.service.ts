import { HttpStatus, Injectable, UseGuards } from '@nestjs/common'
import { CreateEntryDto } from './dto/create-entry.dto'
import { UpdateEntryDto } from './dto/update-entry.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'
import { PrismaService } from 'nestjs-prisma'
import { ListEntryDto } from './dto/list-entry.dto'

@Injectable()
@UseGuards(AuthUserGuard)
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

  create(createEntryDto: CreateEntryDto) {}

  findOne(id: number) {
    return `This action returns a #${id} entry`
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`
  }

  remove(id: number) {
    return `This action removes a #${id} entry`
  }
}
