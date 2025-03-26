import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateExitDto } from './dto/create-exit.dto'
import { UpdateExitDto } from './dto/update-exit.dto'
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

  create(createExitDto: CreateExitDto) {
    return 'This action adds a new exit'
  }

  findOne(id: number) {
    return `This action returns a #${id} exit`
  }

  update(id: number, updateExitDto: UpdateExitDto) {
    return `This action updates a #${id} exit`
  }

  remove(id: number) {
    return `This action removes a #${id} exit`
  }
}
