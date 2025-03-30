import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { ListMovemtsDto } from './dto/list-movemt.dto'
import { CreateMovementDto } from './dto/create-movement.dto'

@Injectable()
export class MovementsService {
  private readonly logger: Logger = new Logger(MovementsService.name)
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(listMovemtsDto: ListMovemtsDto) {
    const { page = 1, size = 25 } = listMovemtsDto
    const [count, data, _totalBalance, totalEntries, totalExits] =
      await this.prismaService.$transaction([
        this.prismaService.movement.count(),
        this.prismaService.movement.findMany({
          skip: (page - 1) * size,
          take: size,
          where: {
            product: {
              is_active: true,
            },
          },
          orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
          include: {
            product: {
              include: {
                category: true,
                TypePresentation: true,
                typeProduct: true,
              },
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
        }),
        this.prismaService.movement.aggregate({
          _sum: { balance: true },
        }),
        this.prismaService.movement.aggregate({
          _sum: { entry: true },
        }),
        this.prismaService.movement.aggregate({
          _sum: { exit: true },
        }),
      ])
    if (!data || data.length === 0)
      return {
        status: HttpStatus.OK,
        count: 0,
        total_balance: 0,
        total_entry: 0,
        total_exit: 0,
        remaining_balance: 0,
        data,
      }

    const total_balance = _totalBalance._sum.balance || 0
    const total_entry = totalEntries._sum.entry || 0
    const total_exit = totalExits._sum.exit || 0
    const remaining_balance = total_entry - total_exit

    return {
      status: HttpStatus.OK,
      total_balance,
      remaining_balance,
      total_entry,
      total_exit,
      count,
      data,
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
  async upsertMovement(
    createMovementDto: CreateMovementDto,
    productMovementId?: string,
  ) {
    const { date, entry, exit, movementTypeId, description, productId } =
      createMovementDto

    const lastMovement = await this.prismaService.movement.findFirst({
      where: { productId },
      orderBy: { date: 'desc' },
    })
    const lastBalance = lastMovement ? lastMovement.balance : 0
    const newBalance = lastBalance + (entry || 0) - (exit || 0)

    this.logger.debug(productMovementId ? 'Update Movement' : 'Create Movement')
    if (newBalance < 0) {
      throw new HttpException(
        'No se puede registrar una salida mayor al stock disponible del producto.',
        HttpStatus.BAD_REQUEST,
      )
    }
    this.logger.debug(
      productMovementId
        ? `Updated MovementProduct ${productMovementId} `
        : `Created MovementProduct `,
    )
    const movement = await this.prismaService.movement.upsert({
      where: { id: productMovementId || '' },
      update: {
        date: date || new Date(),
        entry,
        exit,
        balance: newBalance,
        moventType: { connect: { id: movementTypeId } },
        description,
        product: { connect: { id: productId } },
      },
      create: {
        date: date || new Date(),
        entry,
        exit,
        balance: newBalance,
        moventType: { connect: { id: movementTypeId } },
        description,
        product: { connect: { id: productId } },
      },
      include: {
        moventType: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      omit: {
        movementTypeId: true,
      },
    })

    return {
      status: HttpStatus.OK,
      message: `${productMovementId ? 'Movimiento actualizado' : 'Movimiento Creado'} exitosamente`,
      data: movement,
    }
  }

  async remove(id: string) {
    this.prismaService.movement.delete({ where: { id } })
    return {
      status: HttpStatus.OK,
      message: 'Movimiento eliminado exitosamente',
    }
  }
}
