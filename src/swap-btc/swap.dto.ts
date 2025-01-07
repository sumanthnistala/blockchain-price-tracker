import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SwapDto {
  @ApiProperty({
    example: 1.5,
    description: 'Amount of Ethereum to swap',
  })
  @IsNumber()
  @IsPositive()
  ethAmount: number;
}
