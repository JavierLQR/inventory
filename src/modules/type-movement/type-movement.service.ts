import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateTypeMovementDto } from './dto/create-type-movement.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TypeMovementService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrUpdate(
    createTypeMovementDto: CreateTypeMovementDto,
    id_type_movementy?: string,
  ) {
    const { name } = createTypeMovementDto
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
