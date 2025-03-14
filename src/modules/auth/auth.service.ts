import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createAuthDto: CreateAuthDto) {}

  findOne(id: number) {}
}
