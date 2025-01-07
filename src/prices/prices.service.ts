import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Decimal128, LessThan } from 'typeorm';
import { Price } from './prices.entity';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { AlertsService } from 'src/alerts/alerts.service';
import { MailService } from 'src/mail/mail.service';
import { Alert } from 'src/alerts/alerts.entity';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    @InjectRepository(Alert)
    private priceRepository: Repository<Price>,
    private httpService: HttpService,
    private alertService: AlertsService,
    private mailService: MailService,
  ) {}
  networks = ['ethereum', 'matic-network'];

  @Cron('*/5 * * * *')
  async fetchPrices() {
    this.networks.forEach(async network => {
      const price = await this.getChainPrice(network);
      await this.savePrice(network, price);
      await this.checkAlert(network,price);
    });

  }

  async getChainPrice(chain: string): Promise<number> {
    const response = await this.httpService
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${chain}&vs_currencies=usd`,{
      headers: { Authorization: `Bearer ${process.env.MORALIS_API_KEY}` },
    }).toPromise();
    let price;
    for (const [key, value] of Object.entries(response.data)) {
      for (const [k, v] of Object.entries(value)) {
        price = parseFloat(v);
      }
  }
    return price.toFixed(10);
  }

  async savePrice(chain: string, price: number) {
    //console.log("SavePrice"+price);
    
    const newPrice = this.priceRepository.create({ chain,  price});
    console.log(newPrice);
    await this.priceRepository.save(newPrice);
  }

  async getHourlyPrices(): Promise<Price[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.priceRepository.find({
      where: { createdAt: MoreThan(oneDayAgo) },
      order: { createdAt: 'ASC' },
    });
  }

  async checkAlert(chain: string, currentPrice: number)
  {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let pastPrice = await this.priceRepository.findOne({
      where: { chain, createdAt: LessThan(oneHourAgo) },
      order: { createdAt: 'DESC' },
    });

    if (!pastPrice) return;
    console.log("Past:", pastPrice, "Current:", currentPrice)
    const percentageChange = ((currentPrice - pastPrice.price) / (pastPrice.price) )* 100;

    console.log("percentage", percentageChange);
    if (percentageChange > 0) { // change percentage to 3 here
      this.sendEmail(chain, currentPrice, percentageChange);
    }
  }

  private async sendEmail(chain: string, currentPrice: number, percentageChange: number) {
    await this.mailService.sendEmail(
      `${chain} Alert`,
      `The price of ${chain} has reached $${currentPrice}`,
    );

    console.log("sent mail");
  }
}
