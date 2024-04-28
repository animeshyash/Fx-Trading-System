import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class fxRate {
  @Prop()
  fx_rate: number;

  @Prop()
  qoute_id: string;

  @Prop()
  expiryAt: string;
}

export const fxRateSchema = SchemaFactory.createForClass(fxRate);
