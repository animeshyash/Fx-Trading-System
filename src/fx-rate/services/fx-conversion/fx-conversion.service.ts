import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { fxRate } from 'src/schemas/fxRate.schema';

@Injectable()
export class FxConversionService {
  constructor(@InjectModel(fxRate.name) private fxRateModel: Model<fxRate>) {}

  async doConversion(quoteId) {
    const res = await this.fxRateModel.findOne({ qoute_id: quoteId });
    if (!res) throw new HttpException('Quote ID not found', 404);
    return Number(res.fx_rate);
  }
}
