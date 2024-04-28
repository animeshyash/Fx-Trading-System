import { Module } from '@nestjs/common';
import { FxRateModule } from './fx-rate/fx-rate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FxRateModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
