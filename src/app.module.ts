import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategorieModule } from './modules/categorie/categorie.module'
import { PrismaModule } from 'nestjs-prisma'
import { ProviderModule } from './modules/provider/provider.module'
import { TypeProductModule } from './modules/type-product/type-product.module'
import { TypePresentationModule } from './modules/type-presentation/type-presentation.module'
import { TypeMovementModule } from './modules/type-movement/type-movement.module'
import { ProductModule } from './modules/product/product.module'
import configuration from './config/load-variables'

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RoleModule,
    UserModule,
    AuthModule,
    CategorieModule,
    ProviderModule,
    TypeProductModule,
    TypePresentationModule,
    TypeMovementModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
