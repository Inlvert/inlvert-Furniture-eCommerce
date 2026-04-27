import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Post('send')
  sendMail(@Body() mailData: { name: string; email: string; subject: string; message: string }) {
    return this.mailsService.sendMail(mailData);
  }
}
