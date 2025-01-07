import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { Price } from './prices.entity';
import { HttpModule } from '@nestjs/axios';
import { AlertsService } from 'src/alerts/alerts.service';
import { MailService } from 'src/mail/mail.service';
import { Alert } from 'src/alerts/alerts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Price]),
    TypeOrmModule.forFeature([Alert]),
    HttpModule,
  ],
  providers: [AlertsService, PricesService, MailService],
  controllers: [PricesController],
  exports: [PricesService],
})
export class PricesModule {}