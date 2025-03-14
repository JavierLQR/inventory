import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
}
