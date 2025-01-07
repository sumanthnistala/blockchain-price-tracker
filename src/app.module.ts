// app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesModule } from './prices/prices.module';
import { AlertsModule } from './alerts/alerts.module';
import { MailModule } from './mail/mail.module';
import { ConfigService } from './config/config.service';
import { SwapModule } from './swap-btc/swap.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PricesModule,
    AlertsModule,
    MailModule,
    SwapModule,
  ],
})
export class AppModule {}
