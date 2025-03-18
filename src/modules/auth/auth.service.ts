import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateAuthDto } from './dto/create-auth.dto'
import { verifyPassword } from 'src/common/encrypt/argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from './types/user.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: CreateAuthDto) {
    const { name, password } = data
    const user = await this.prismaService.user.findUnique({
      where: { name },
      include: { role: true },
    })
    if (!user) throw new BadRequestException('Credenciales incorrectas')
    const isPasswordValid = await verifyPassword(user.password, password)
    if (!isPasswordValid)
      throw new BadRequestException('Credenciales incorrectas')
    const { id, name: nameToken, role } = user
    return await this.getToken({
      id,
      name: nameToken,
      role,
    })
  }

  private async getToken(user: User) {
    const payload: User = user
    const accessToken = await this.jwtService.signAsync(payload)
    return accessToken
  }
}
