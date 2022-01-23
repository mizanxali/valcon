import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Max, Min } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { User } from './user.schema';

@ObjectType()
export class Profile {
  @Field(() => String)
  _id: string;

  @Field(() => Boolean)
  @prop({ required: true })
  discoverable: boolean;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String, { nullable: true })
  @prop()
  riotID?: string;

  @Field(() => String, { nullable: true })
  @prop()
  tagline?: string;

  @Field(() => String, { nullable: true })
  @prop({ type: () => String })
  clip?: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: () => [String] })
  agents?: string[];

  @Field(() => String, { nullable: true })
  @prop()
  favoriteMap?: string;

  @Field(() => String, { nullable: true })
  @prop()
  lookingToPlay?: string;

  @Field(() => Int, { nullable: true })
  @prop()
  rank?: number;

  @Field(() => String, { nullable: true })
  @prop()
  server?: string;
}

export const ProfileModel = getModelForClass(Profile);

@InputType()
export class EditProfileInput {
  @Field(() => String, { nullable: true })
  riotID?: string;

  @Field(() => String, { nullable: true })
  tagline?: string;

  @Field(() => String, { nullable: true })
  clip: string;

  @Field(() => [String], { nullable: true })
  agents?: string[];

  @Field(() => String, { nullable: true })
  favoriteMap?: string;

  @Field(() => String, { nullable: true })
  lookingToPlay?: string;

  @Min(0)
  @Max(21)
  @Field(() => Int, { nullable: true })
  rank?: number;

  @Field(() => String, { nullable: true })
  server?: string;
}
