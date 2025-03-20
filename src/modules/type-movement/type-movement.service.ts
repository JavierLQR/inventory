import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTypeMovementDto } from './dto/create-type-movement.dto'
import { PrismaService } from 'nestjs-prisma'
import { TypesMovements } from '@prisma/client'

@Injectable()
export class TypeMovementService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrUpdate(
    createTypeMovementDto: CreateTypeMovementDto,
    id_type_movementy?: string,
  ) {
    const { name } = createTypeMovementDto
    await this.verifyTypeMovement(name, id_type_movementy)
    const movement = await this.prismaService.movementType.upsert({
      create: { name },
      update: { name },
      where: {
        id: id_type_movementy ?? '',
      },
    })
    return {
      movement,
      status: id_type_movementy ? HttpStatus.OK : HttpStatus.CREATED,
      message: id_type_movementy
        ? 'Tipo moviento actualizado'
        : 'Tipo moviento creado',
    }
  }
  private async verifyTypeMovement(
    name: TypesMovements,
    id_type_movement: string,
  ) {
    const movement = await this.prismaService.movementType.findUnique({
      where: { name },
    })
    if (movement && movement.id !== id_type_movement)
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `El tipo de movimiento (${name})  ya está en uso.`,
      })
  }

  async findAll() {
    return await this.prismaService.movementType.findMany()
  }

  async remove(id: string) {
    await this.prismaService.movementType.delete({
      where: {
        id,
      },
    })
  }
}
