import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateTypePresentationDto } from './dto/create-type-presentation.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TypePresentationService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrUpdate(
    createTypePresentationDto: CreateTypePresentationDto,
    id_presentation?: string,
  ) {
    const { name } = createTypePresentationDto
    const presentation = await this.prismaService.typePresentation.upsert({
      create: { name },
      update: { name },
      where: {
        id: id_presentation ?? '',
      },
    })
    return {
      presentation,
      status: id_presentation ? HttpStatus.OK : HttpStatus.CREATED,
    }
  }

  async findAll() {
    return await this.prismaService.typePresentation.findMany()
  }

  async remove(id: string) {
    await this.prismaService.typePresentation.delete({
      where: {
        id,
      },
    })
    return {
      status: HttpStatus.OK,
    }
  }
}
