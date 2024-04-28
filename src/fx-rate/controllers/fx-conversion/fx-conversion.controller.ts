import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { currencyConversionData } from 'src/fx-rate/dtos/topup.dto';
import { FxConversionService } from 'src/fx-rate/services/fx-conversion/fx-conversion.service';

@Controller('fx-conversion')
@ApiTags('Fx-conversion')
export class FxConversionController {
  constructor(private fxConversion: FxConversionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async currencyConversion(@Body() conversionInput: currencyConversionData) {
    const qouteId = conversionInput.quoteId;

    if (
      (conversionInput.fromCurrency == 'USD' ||
        conversionInput.fromCurrency == 'JPY') &&
      (conversionInput.toCurrency == 'JPY' ||
        conversionInput.toCurrency == 'USD')
    ) {
      const rate = await this.fxConversion.doConversion(qouteId);

      let res = 0;

      if (conversionInput.fromCurrency == 'USD')
        res = conversionInput.amount * rate;

      if (conversionInput.fromCurrency == 'JPY')
        res = conversionInput.amount / rate;

      console.log({
        convertedAmount: res,
        currency: conversionInput.toCurrency,
      });

      return {
        convertedAmount: res,
        currency: conversionInput.toCurrency,
      };
    } else {
      throw new HttpException('Invalid Currency', 400);
    }
  }
}
