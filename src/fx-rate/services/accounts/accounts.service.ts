import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  topUp(id: string, balance: number) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        balance: balance,
      },
      { new: true },
    );
  }

  getUser(id: string) {
    return this.userModel.findById(id);
  }
}
