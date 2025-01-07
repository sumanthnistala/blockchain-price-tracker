import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alerts.entity';
import { Price } from '../prices/prices.entity';
import { Cron } from '@nestjs/schedule';
import { PricesService } from '../prices/prices.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    // private priceRepository: Repository<Price>,
    private mailService: MailService,
  ) {}

  @Cron('0 * * * *')
  async checkPriceAlerts() {
    const alerts = await this.alertRepository.find();
    //const prices = await this.pricesService.getHourlyPrices();

    // alerts.forEach((alert) => {
    //   const currentPrice = prices.find(
    //     (p) => p.chain === alert.chain && p.createdAt >= new Date(Date.now() - 60 * 60 * 1000),
    //   );
    //   console.log(currentPrice, alert.price);
    //   if (currentPrice && currentPrice.price >= alert.price) {
    //     this.mailService.sendEmail(
    //       `${alert.chain} Alert`,
    //       `The price of ${alert.chain} has reached $${currentPrice.price}`,
    //     );
    //   }
    // });
  }

  async setAlert(chain: string, price: number) {
    const alert = this.alertRepository.create({ chain, price});
    await this.alertRepository.save(alert);
  }
}
