import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto
    this.invalidRole(name)
    await this.verifyRole(name)
    return await this.prismaService.roles.create({
      data: {
        name,
      },
    })
  }
  private async verifyRole(role_name: 'ADMIN' | 'ALMACENERO') {
    const role = await this.prismaService.roles.findFirst({
      where: { name: role_name },
    })
    if (role) throw new BadRequestException('El rol ya existe')
  }

  private invalidRole(role_name: 'ADMIN' | 'ALMACENERO') {
    if (role_name !== 'ADMIN' && role_name !== 'ALMACENERO')
      throw new BadRequestException(' El rol ${role_valid} no es válido')
  }

  async findAll() {
    const { count, roles: data } = await this.prismaService.$transaction(
      async (prisma) => ({
        roles: await prisma.roles.findMany(),
        count: await prisma.roles.count(),
      }),
    )

    if (!data || data.length === 0)
      return {
        data,
        status: HttpStatus.OK,
        count: 0,
      }
    return {
      data,
      status: HttpStatus.OK,
      count,
    }
  }
}
