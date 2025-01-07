import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PricesService } from './prices.service';
import axios from 'axios';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PricesCron {
  constructor(private pricesService: PricesService) {}

  @Cron('*/5 * * * *') // Runs every 5 minutes
  async fetchPrices() {
    const chains = ['ethereum', 'polygon'];
    for (const chain of chains) {
      const price = await this.fetchPriceFromAPI(chain);
      await this.pricesService.savePrice(chain, price);
    }
  }

  private async fetchPriceFromAPI(chain: string) {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${chain}&vs_currencies=usd`, {
      headers: { Authorization: `Bearer ${process.env.MORALIS_API_KEY}` },
    });
    return response.data.price;
  }
}
