import {
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
    const { name, password, id_role } = createUserDto
    this.logger.debug(id_user ? 'User actualizando' : 'User creando')
    await this.verifyUser(name, id_user)
    const passwordHash = await hashPassword(password)
    const user = await this.prismaService.user.upsert({
      create: {
        name,
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
        role: {
          connect: {
            id: id_role,
          },
        },
      },
      where: {
        name,
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
    }
  }

  async findAll() {
    const { count, data } = await this.prismaService.$transaction(
      async (prisma) => ({
        data: await prisma.user.findMany({
          include: { role: true },
          omit: { password: true, rolesId: true },
          orderBy: {
            createdAt: 'desc',
            updatedAt: 'desc',
          },
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
          include: { role: true },
          orderBy: {
            createdAt: 'desc',
          },
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

  private async verifyUser(name: string, id_user?: string) {
    const user = await this.prismaService.user.findUnique({
      where: { name },
    })

    if (user && user.id !== id_user)
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `El nombre  ${name}  ya está en uso.`,
      })
  }
}
