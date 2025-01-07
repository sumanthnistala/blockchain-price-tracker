import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { SwapRateService } from './swap.service';
import { SwapDto } from './swap.dto';

@ApiTags('swap-rate')
@Controller('swap-rate')
export class SwapRateController {
  constructor(private readonly swapRateService: SwapRateService) {}

  @Post()
  async getSwapRate(@Body() swapRateDto: SwapDto) {
    return this.swapRateService.calculateSwapRate(swapRateDto.ethAmount);
  }
}
