import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategorieModule } from './modules/categorie/categorie.module'
import { PrismaModule } from 'nestjs-prisma'

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development.local',
    }),
    RoleModule,
    UserModule,
    AuthModule,
    CategorieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
