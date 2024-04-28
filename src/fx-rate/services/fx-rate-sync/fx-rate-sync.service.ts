import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Model } from 'mongoose';
import { fxRate } from 'src/schemas/fxRate.schema';

@Injectable()
export class FxRateSyncService implements OnApplicationBootstrap {
  constructor(@InjectModel(fxRate.name) private fxRateModel: Model<fxRate>) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async fetchFxRates() {
    try {
      const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=${process.env.API_KEY}`;

      const response = await axios.get(url);
      const data = response.data['Realtime Currency Exchange Rate'];
      const exchangeRate = data['5. Exchange Rate'];

      const newFxRate = new this.fxRateModel({
        fx_rate: exchangeRate,
        qoute_id: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
        expiryAt: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
      });
      return await newFxRate.save();
    } catch (error) {
      return 'Error Fetching Exchange Rates';
    }
  }

  async onApplicationBootstrap() {
    await this.fetchFxRates();
  }

  async getFxRates() {
    const rate = await this.fxRateModel.findOne().sort({ createdAt: -1 });
    return {
      qouteId: rate.qoute_id,
      expiry_at: rate.expiryAt,
    };
  }
}
