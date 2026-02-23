import { Module } from '@nestjs/common';
import { CompareService } from './compare.service';
import { CompareController } from './compare.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompareSchema } from './schema/compare.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Compare', schema: CompareSchema }]),
  ],
  providers: [CompareService],
  controllers: [CompareController],
  exports: [CompareService],
})
export class CompareModule {}
