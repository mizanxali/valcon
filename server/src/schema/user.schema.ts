import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { IsEmail, Max, Min, MinLength } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

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
  rightSwipes: Ref<User>[];

  @prop({ ref: () => User })
  leftSwipes: Ref<User>[];

  @prop({ ref: () => User })
  matches: Ref<User>[];

  @Field(() => Int)
  @prop({ required: true })
  minRank: number;

  @Field(() => Int)
  @prop({ required: true })
  maxRank: number;

  @Field(() => String)
  @prop({ required: true })
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

@InputType()
export class RightSwipeInput {
  @Field(() => String)
  rightSwipedID: string;
}

@InputType()
export class LeftSwipeInput {
  @Field(() => String)
  leftSwipedID: string;
}

@InputType()
export class EditUserInput {
  @Min(0)
  @Max(21)
  @Field(() => Int, { nullable: true })
  minRank?: number;

  @Min(0)
  @Max(21)
  @Field(() => Int, { nullable: true })
  maxRank?: number;
}

@ObjectType()
export class Match {
  @Field(() => String)
  @prop()
  _id: string;

  @Field(() => String, { nullable: true })
  @prop()
  riotID?: string;

  @Field(() => String, { nullable: true })
  @prop()
  tagline?: string;
}
