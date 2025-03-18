import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto
    return await this.prismaService.roles.create({
      data: {
        name,
      },
    })
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
