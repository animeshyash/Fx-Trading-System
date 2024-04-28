import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/fx-rate/dtos/createUser.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(userDetails: CreateUserDto) {
    const newUser = new this.userModel(userDetails);
    return newUser.save();
  }
}
