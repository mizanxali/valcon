import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { EditProfileInput, Profile } from '../schema/profile.schema';
import ProfileService from '../service/profile.service';
import Context from '../types/context';

@Resolver()
export default class ProfileResolver {
  constructor(private profileService: ProfileService) {
    this.profileService = new ProfileService();
  }

  @Mutation(() => Profile)
  editProfile(@Arg('input') input: EditProfileInput, @Ctx() context: Context) {
    return this.profileService.editProfile(input, context);
  }

  @Query(() => Profile)
  getProfile(@Ctx() context: Context) {
    return this.profileService.getProfile(context);
  }

  @Query(() => [Profile])
  getProfiles(@Ctx() context: Context) {
    return this.profileService.getProfiles(context);
  }
}
