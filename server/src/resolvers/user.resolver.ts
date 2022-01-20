import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateUserInput,
  LeftSwipeInput,
  LoginInput,
  Match,
  RightSwipeInput,
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
  rightSwipe(@Arg('input') input: RightSwipeInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.userService.rightSwipe(input, user);
  }

  @Authorized()
  @Mutation(() => String)
  leftSwipe(@Arg('input') input: LeftSwipeInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.userService.leftSwipe(input, user);
  }

  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }

  @Authorized()
  @Query(() => [Match])
  getMatches(@Ctx() context: Context) {
    const user = context.user!;
    return this.userService.getMatches(user);
  }
}
