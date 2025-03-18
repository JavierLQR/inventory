import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthJwt } from './jwt/auth.jwt'
import { SECRETS } from 'src/common/constant/constant'
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: SECRETS.JWT,
        signOptions: {
          expiresIn: '5d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwt],
})
export class AuthModule {}
