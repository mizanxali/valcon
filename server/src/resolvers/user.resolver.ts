import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateUserInput,
  LoginInput,
  SwipeInput,
  User,
} from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => String)
  createUser(@Arg('input') input: CreateUserInput, @Ctx() context: Context) {
    return this.userService.createUser(input, context);
  }

  @Mutation(() => String)
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Authorized()
  @Mutation(() => String)
  swipe(@Arg('input') input: SwipeInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.userService.swipe(input, user);
  }

  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }
}
