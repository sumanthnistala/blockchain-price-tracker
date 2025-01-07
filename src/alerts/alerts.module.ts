import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { Alert } from './alerts.entity';
import { Price } from '../prices/prices.entity';
import { PricesService } from '../prices/prices.service';
import { HttpModule } from '@nestjs/axios';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alert]), HttpModule],
  providers: [AlertsService, MailService],
  controllers: [AlertsController],
})
export class AlertsModule {}