import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateUserDto } from './dto/create-user.dto'
import { hashPassword } from 'src/common/encrypt/argon2'
import { ListUserDto } from './dto/list-user.dto'

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name)
  constructor(private readonly prismaService: PrismaService) {}

  async createOrUpdate(createUserDto: CreateUserDto, id_user?: string) {
    const { name, password, id_role, lastname, username } = createUserDto
    this.logger.debug(id_user ? 'User actualizando' : 'User creando')
    await this.verifyUser(name, id_user)
    const passwordHash = await hashPassword(password)
    const user = await this.prismaService.user.upsert({
      create: {
        name,
        lastname,
        username,
        password: passwordHash,
        role: {
          connect: {
            id: id_role,
          },
        },
      },
      update: {
        name,
        password: passwordHash,
        lastname,
        username,
        role: {
          connect: {
            id: id_role,
          },
        },
      },
      where: {
        id: id_user || '',
      },
      select: {
        id: true,
        name: true,
        role: true,
        password: false,
      },
    })
    return {
      user,
      status: id_user ? HttpStatus.OK : HttpStatus.CREATED,
      message: id_user ? 'User actualizado' : 'User creado',
    }
  }

  async findOne(user_id: string) {
    if (!user_id) throw new BadRequestException('User ID no proporcionado')
    return await this.prismaService.user.findUnique({
      where: { id: user_id },
      include: { role: true },
      omit: { password: true, rolesId: true },
    })
  }

  async findAll() {
    const { count, data } = await this.prismaService.$transaction(
      async (prisma) => ({
        data: await prisma.user.findMany({
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          omit: { password: true, rolesId: true },
          orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
        }),
        count: await prisma.user.count(),
      }),
    )

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
  async list(listUserDto: ListUserDto) {
    const { page, size } = listUserDto
    const { count, data } = await this.prismaService.$transaction(
      async (prisma) => ({
        data: await prisma.user.findMany({
          skip: (page - 1) * size,
          take: size,
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
          omit: {
            rolesId: true,
            password: true,
          },
        }),
        count: await prisma.user.count(),
      }),
    )

    if (!data || data.length === 0)
      return {
        status: HttpStatus.OK,
        count: 0,
        data,
      }
    return {
      status: HttpStatus.OK,
      count,
      data,
    }
  }

  private async verifyUser(username: string, id_user?: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    })

    if (user && user.id !== id_user)
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `El nombre  ${username}  ya está en uso.`,
      })
  }

  async remove(id: string) {
    await this.prismaService.user.delete({ where: { id } })
    return {
      status: HttpStatus.OK,
      message: 'Usuario eliminado',
    }
  }
}
