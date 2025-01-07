import { Controller, Post, Body } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post('/set')
  async setAlert(@Body() body: { chain: string; price: number;}) {
    return this.alertsService.setAlert(body.chain, body.price);
  }
}