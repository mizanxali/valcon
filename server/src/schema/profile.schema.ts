import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { MaxLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from './user.schema';

@ObjectType()
export class Profile {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String)
  @prop()
  riotID: string;

  @Field(() => String)
  @prop()
  tagline: string;

  @Field(() => [String])
  @prop({ type: () => [String] })
  clips: string[];
}

export const ProfileModel = getModelForClass(Profile);

@InputType()
export class EditProfileInput {
  @Field(() => String, { nullable: true })
  riotID?: string;

  @Field(() => String, { nullable: true })
  tagline?: string;

  @Field(() => [String], { nullable: true })
  clips?: string[];
}
