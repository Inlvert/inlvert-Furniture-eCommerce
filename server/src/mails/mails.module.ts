import { Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { Mail, MailSchema } from './schema/mails.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailsService } from './mails.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }])  
  ],
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
