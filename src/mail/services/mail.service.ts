import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import { User } from '../../user/models/user.model';
import { ConfigService } from '@nestjs/config';

dotenv.config({
  path: '.env',
});

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User): Promise<void> {
    if (this.configService.get<string>('NODE_ENV') === 'test') return;

    const url = `${process.env.DOMAIN}verify/${user.role}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to nestjs-template! Confirm your Email',
      template: './confirmation.hbs',
      context: {
        name: user.username,
        url,
      },
    });
  }

  async sendUserInformation(user: User): Promise<void> {
    if (this.configService.get<string>('NODE_ENV') === 'test') return;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Login to your nestjs-template account',
      template: './information.hbs',
      context: {
        name: user.username,
      },
    });
  }

  async sendForgetPassword(user: User | any, token: string): Promise<void> {
    if (this.configService.get<string>('NODE_ENV') === 'test') return;

    const url = `${process.env.DOMAIN}reset/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      template: './password.hbs',
      context: {
        url,
        name: user.username,
      },
    });
  }

  async sendPasswordInfo(user: User): Promise<void> {
    if (this.configService.get<string>('NODE_ENV') === 'test') return;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Information',
      template: './password-info.hbs',
      context: {
        name: user.username,
      },
    });
  }
}
