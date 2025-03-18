import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthJwt } from './jwt/auth.jwt'
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        console.log({
          data: configService.getOrThrow<string>('TEST'),
        })

        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: { expiresIn: '7d' },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwt],
})
export class AuthModule {}
