import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { topupInputData } from 'src/fx-rate/dtos/topup.dto';
import { AccountsService } from 'src/fx-rate/services/accounts/accounts.service';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  constructor(private accountService: AccountsService) {}

  @Post('topup/:id')
  @UsePipes(new ValidationPipe())
  async topup(@Body() topupData: topupInputData, @Param('id') id: string) {
    const amount = topupData.amount;

    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not Found', 404);

    const user = await this.accountService.getUser(id);
    if (!user) throw new HttpException('User not Found', 404);

    if (amount > user.balance)
      throw new HttpException('Insufficient Balance', 404);
    else {
      await this.accountService.topUp(id, user.balance - amount);
    }

    console.log(
      `Topup of ${topupData.amount} ${topupData.currency} is Successfull`,
    );
    return `Topup of ${topupData.amount} ${topupData.currency} is Successfull`;
  }

  @Get('balance/:id')
  async getBalance(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not Found', 404);

    const user = await this.accountService.getUser(id);
    if (!user) throw new HttpException('User not Found', 404);

    const bal = user.balance;
    const balanceObject = {
      currencies: {
        USD: bal,
        EUR: bal * 0.93,
        GBP: bal * 0.8,
      },
    };

    console.log(balanceObject);
    return balanceObject;

    // Business Logic can be written here.
    // console.log({ balances: { USD: 1000, EUR: 500, GBP: 300 } });
    // response.send({ balances: { USD: 1000, EUR: 500, GBP: 300 } });
  }
}
