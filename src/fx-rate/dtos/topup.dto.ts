import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class topupInputData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class currencyConversionData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quoteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
