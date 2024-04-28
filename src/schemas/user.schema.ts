import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
