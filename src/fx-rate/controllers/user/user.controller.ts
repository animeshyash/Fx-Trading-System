import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/fx-rate/dtos/createUser.dto';
import { UserService } from 'src/fx-rate/services/user/user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userDetails: CreateUserDto) {
    console.log(userDetails);
    return this.userService.createUser(userDetails);
  }
}
