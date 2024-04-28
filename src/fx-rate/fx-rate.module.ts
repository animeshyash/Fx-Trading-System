import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts/accounts.controller';
import { FxRatesController } from './controllers/fx-rates/fx-rates.controller';
import { FxConversionController } from './controllers/fx-conversion/fx-conversion.controller';
import { FxRateSyncService } from './services/fx-rate-sync/fx-rate-sync.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { fxRate, fxRateSchema } from 'src/schemas/fxRate.schema';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { AccountsService } from './services/accounts/accounts.service';
import { FxConversionService } from './services/fx-conversion/fx-conversion.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: fxRate.name,
        schema: fxRateSchema,
      },
    ]),
  ],
  controllers: [AccountsController, FxRatesController, FxConversionController, UserController],
  providers: [FxRateSyncService, UserService, AccountsService, FxConversionService],
})
export class FxRateModule {}
