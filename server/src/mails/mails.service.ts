import { Injectable } from '@nestjs/common';
import { Mail, MailDocument } from './schema/mails.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class MailsService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Mail.name) private mailModel: Model<MailDocument>,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('GOOGLE_MAIL_USER_NODEMAILER'),
        clientId: this.configService.get('GOOGLE_CLIENT_ID_NODEMAILER'),
        clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET_NODEMAILER'),
        refreshToken: this.configService.get('GOOGLE_REFRESH_TOKEN_NODEMAILER'),
      },
    });
  }

  async sendMail(mailData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    await new this.mailModel(mailData);

    await this.transporter.sendMail({
      from: this.configService.get('GOOGLE_MAIL_USER_NODEMAILER'),
      to: this.configService.get('GOOGLE_MAIL_USER_NODEMAILER'),
      subject: `New message from ${mailData.name}: ${mailData.subject}`,
      text: `You have received a new message from ${mailData.name} (${mailData.email}):\n\n${mailData.message}`,
    });

    return { success: true, message: 'Message sent successfully' };
  }
}
