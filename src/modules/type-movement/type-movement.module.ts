import { Module } from '@nestjs/common';
import { TypeMovementService } from './type-movement.service';
import { TypeMovementController } from './type-movement.controller';

@Module({
  controllers: [TypeMovementController],
  providers: [TypeMovementService],
})
export class TypeMovementModule {}
