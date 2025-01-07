import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    host: ConfigService.email.host,
    port: ConfigService.email.port,
    auth: {
      user: ConfigService.email.user,
      pass: ConfigService.email.pass,
    },
  });

  async sendEmail(subject: string, text: string) {
    console.log(this.transporter);
    return this.transporter.sendMail({
      from: `"Price Tracker" <${ConfigService.email.user}>`,
      to: `${ConfigService.email.to}`,
      subject,
      text,
    });
  }
}
