import { Module } from '@nestjs/common';
import { SwapRateService } from './swap.service';
import { HttpModule } from '@nestjs/axios';
import { SwapRateController } from './swap.controller';

@Module({
    imports: [
        HttpModule,
      ],
  providers: [SwapRateService],
  controllers: [SwapRateController],
  exports: [SwapRateService],
})
export class SwapModule {}