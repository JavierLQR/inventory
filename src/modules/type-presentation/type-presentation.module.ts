import { Module } from '@nestjs/common'
import { TypePresentationService } from './type-presentation.service'
import { TypePresentationController } from './type-presentation.controller'

@Module({
  controllers: [TypePresentationController],
  providers: [TypePresentationService],
})
export class TypePresentationModule {}
