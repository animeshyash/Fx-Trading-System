import { Controller, Get, HttpException, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FxRateSyncService } from 'src/fx-rate/services/fx-rate-sync/fx-rate-sync.service';

@Controller('fx-rates')
@ApiTags('Fx-rates')
export class FxRatesController {
  constructor(private fxRateSync: FxRateSyncService) {}

  @Get()
  async getFxRate(@Req() request: Request, @Res() response: Response) {
    const rate = await this.fxRateSync.getFxRates();

    if (!rate) throw new HttpException('Internal Server Error', 404);
    response.send(rate);
  }
}
