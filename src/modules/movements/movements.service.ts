import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { ListMovemtsDto } from './dto/list-movemt.dto'
import { CreateMovementDto } from './dto/create-movement.dto'

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
  async create(createMovementDto: CreateMovementDto) {
    const {
      date,
      entry,
      exit,
      movementTypeId,
      description,
      categoryId,
      productId,
      typeProductId,
      typePresentationId,
    } = createMovementDto

    const lastMovement = await this.prismaService.movement.findFirst({
      where: {
        productId,
      },
      orderBy: { date: 'desc' },
    })

    const lastBalance = lastMovement ? lastMovement.balance : 0
    const newBalance = lastBalance + (entry || 0) - (exit || 0)

    if (newBalance < 0)
      throw new HttpException(
        'No se puede registrar una salida mayor al stock disponible del producto.',
        HttpStatus.BAD_REQUEST,
      )

    const movement = await this.prismaService.movement.create({
      data: {
        date: date || new Date(),
        entry,
        exit,
        balance: newBalance,
        moventType: { connect: { id: movementTypeId } },
        description,
        category: { connect: { id: categoryId } },
        product: { connect: { id: productId } },
        typeProduct: { connect: { id: typeProductId } },
        TypePresentation: { connect: { id: typePresentationId } },
      },
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
        movementTypeId: true,
        categoryId: true,
        productId: true,
        typeProductId: true,
        typePresentationId: true,
      },
    })

    return {
      status: HttpStatus.CREATED,
      message: 'Movimiento registrado exitosamente',
      data: movement,
    }
  }

  async getMovementsByDateRange(startDate: Date, endDate: Date) {
    return this.prismaService.movement.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'desc' },
    })
  }

  async getProductStock(productId: string) {
    const lastMovement = await this.prismaService.movement.findFirst({
      where: { productId },
      orderBy: { date: 'desc' },
    })
    return lastMovement ? lastMovement.balance : 0
  }
}
