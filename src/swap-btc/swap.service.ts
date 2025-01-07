import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SwapRateService {
  private readonly feePercentage = 0.03; // 3% fee
  private readonly coingeckoApiUrl = 'https://api.coingecko.com/api/v3/simple/price';
  private async fetchRates() {
    try {
      const response = await axios.get(this.coingeckoApiUrl, {
        params: {
          ids: 'ethereum,bitcoin',
          vs_currencies: 'usd,btc',
        },
      });

      const ethToUsdRate = response.data.ethereum.usd;
      const ethToBtcRate = response.data.ethereum.btc;

      return { ethToUsdRate, ethToBtcRate };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cryptocurrency rates. Please try again later.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  // Calculate swap rate
  async calculateSwapRate(ethAmount: number) {
    if (ethAmount <= 0) {
      throw new HttpException(
        'Ethereum amount must be greater than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Fetch dynamic rates
    const { ethToUsdRate, ethToBtcRate } = await this.fetchRates();

    // Calculate BTC equivalent
    const btcEquivalent = ethAmount * ethToBtcRate;

    // Calculate fees
    const feeEth = ethAmount * this.feePercentage;
    const feeUsd = feeEth * ethToUsdRate;

    // Return result
    return {
      ethAmount,
      btcEquivalent,
      fee: {
        eth: feeEth,
        usd: feeUsd,
      },
      rates: {
        ethToUsd: ethToUsdRate,
        ethToBtc: ethToBtcRate,
      },
    };
  }
}
