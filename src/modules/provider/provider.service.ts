import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { CreateProviderDto } from './dto/create-provider.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ProviderService {
  private readonly logger: Logger = new Logger(ProviderService.name)
  constructor(private readonly prismaService: PrismaService) {}
  async createOrUpdate(
    createProviderDto: CreateProviderDto,
    id_provider?: string,
  ) {
    const {
      address,
      businessName,
      corporate_reason,
      legalRepresentative,
      numberRuc,
      phone,
    } = createProviderDto
    this.logger.debug(
      id_provider ? 'Proveedor actualizando' : 'Proveedor creando',
    )
    const company = await this.prismaService.company.upsert({
      where: {
        id: id_provider ?? '',
      },
      create: {
        businessName,
        corporate_reason,
        ruc: numberRuc,
        phone,
        address,
        legalRepresentative,
      },
      update: {
        address,
        businessName,
        corporate_reason,
        legalRepresentative,
        phone,
        ruc: numberRuc,
      },
    })

    return {
      status: id_provider ? HttpStatus.OK : HttpStatus.CREATED,
      message: id_provider ? 'Proveedor actualizado' : 'Proveedor creado',
      company,
    }
  }
  async remove(id: string) {
    await this.prismaService.company.delete({
      where: {
        id,
      },
    })
    return {
      status: HttpStatus.OK,
      message: 'Proveedor eliminado',
    }
  }
  async find() {
    const proveedor = await this.prismaService.company.findMany()
    return {
      proveedor,
      status: HttpStatus.OK,
    }
  }
}
