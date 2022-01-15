import bcrypt from 'bcryptjs';
import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field(() => String)
  @prop()
  createdAt: string;
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Field(() => String)
  password: string;
}
