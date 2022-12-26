import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

import {IUser, UserRole} from "@microservices/interfaces";
import {Document} from 'mongoose';

@Schema()
export class User extends Document implements IUser {
  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop()
  display_name?: string;

  @Prop({
    type: Object,
    default: {refresh_token: null, confirmation_token: null},
  })
  tokens?: {
    refresh_token?: string;
    confirmation_token?: string;
  };

  @Prop({required: true, enum: UserRole, type: String, default: UserRole.Student})
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
