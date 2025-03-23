import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common'
import { CreateCategorieDto } from './dto/create-categorie.dto'
import { PrismaService } from 'nestjs-prisma'
import { ListCategorieDto } from './dto/list-categorie.dto'

@Injectable()
export class CategorieService {
  private readonly logger: Logger = new Logger(CategorieService.name)
  constructor(private readonly prismaService: PrismaService) {}

  async createOrUpdate(
    createCategorieDto: CreateCategorieDto,
    id_category?: string,
  ) {
    this.logger.debug(
      id_category ? 'Category actualizando' : 'Category creando',
    )
    const { name, description, is_active } = createCategorieDto
    console.log({
      id_category,
    })

    await this.verifyCategory(name, id_category)
    const data = await this.prismaService.category.upsert({
      where: { id: id_category || '' },
      update: { description, is_active, name },
      create: { name, description },
    })
    return {
      data,
      status: id_category ? HttpStatus.OK : HttpStatus.CREATED,
      message: id_category ? 'Categoria actualizada' : 'Categoria creada',
    }
  }

  private async verifyCategory(name: string, category_id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { name },
    })
    if (category && category.id !== category_id)
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: `La categoria  ${name}  ya está en uso.`,
      })
  }

  async findAll(listCategorieDto: ListCategorieDto) {
    const { page, size } = listCategorieDto
    const { count, data } = await this.prismaService.$transaction(
      async (prisma) => ({
        data: await prisma.category.findMany({
          skip: (page - 1) * size,
          take: size,
          orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
        }),
        count: await prisma.category.count(),
      }),
    )
    return {
      status: HttpStatus.OK,
      count,
      data,
    }
  }
  async findAllActives() {
    const { count, data } = await this.prismaService.$transaction(
      async (prisma) => ({
        data: await prisma.category.findMany({
          where: {
            is_active: true,
          },
        }),
        count: await prisma.category.count(),
      }),
    )
    return {
      status: HttpStatus.OK,
      count,
      data,
    }
  }

  async remove(id: string) {
    await this.prismaService.category.delete({
      where: { id },
    })
    return {
      status: HttpStatus.OK,
      message: 'Categoria eliminada',
    }
  }
}
