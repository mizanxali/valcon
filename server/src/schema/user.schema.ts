import bcrypt from 'bcryptjs';
import { getModelForClass, pre, prop, Ref } from '@typegoose/typegoose';
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

  @prop({ ref: () => User })
  swipes: Ref<User>[];

  @prop({ ref: () => User })
  matches: Ref<User>[];

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
