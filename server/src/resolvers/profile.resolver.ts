import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  EditProfileInput,
  GetProfilesInput,
  Profile,
} from '../schema/profile.schema';
import ProfileService from '../service/profile.service';
import Context from '../types/context';

@Resolver()
export default class ProfileResolver {
  constructor(private profileService: ProfileService) {
    this.profileService = new ProfileService();
  }

  @Authorized()
  @Mutation(() => Profile)
  editProfile(@Arg('input') input: EditProfileInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.profileService.editProfile(input, user);
  }

  @Authorized()
  @Query(() => Profile)
  getProfile(@Ctx() context: Context) {
    const user = context.user!;
    return this.profileService.getProfile(user);
  }

  @Authorized()
  @Query(() => [Profile])
  getProfiles(@Arg('input') input: GetProfilesInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.profileService.getProfiles(input, user);
  }
}
