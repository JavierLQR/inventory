import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class MovementsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movement.create({
      data: {
        balance: 0,
        category: {
          connectOrCreate: {
            create: {
              name: 'Sin Categoria',
            },
            where: {
              name: 'Sin Categoria',
            },
          },
        },
        date: new Date(),
        moventType: {
          connectOrCreate: {
            create: {
              name: 'ENTRADA',
            },
            where: {
              name: 'ENTRADA',
            },
          },
        },
        product: {
          connect: {
            id: '1b8f64c1-2d31-4e04-9916-41018191fe6b',
          },
        },
        entry: 2,
        exit: 2,
        TypePresentation: {
          connectOrCreate: {
            create: {
              name: 'presentation',
            },
            where: {
              name: 'presentation',
            },
          },
        },
        typeProduct: {
          connectOrCreate: {
            create: {
              name: 'nohay',
            },
            where: {
              name: 'nohay',
            },
          },
        },
      },
    })
  }
}
