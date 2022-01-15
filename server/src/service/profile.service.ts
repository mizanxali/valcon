import { ApolloError } from 'apollo-server';
import { EditProfileInput, ProfileModel } from '../schema/profile.schema';
import Context from '../types/context';

class ProfileService {
  async editProfile(input: EditProfileInput, context: Context) {
    const { riotID, tagline, clips } = input;
    const { user } = context;

    const profile = await ProfileModel.findOne({ user: user?._id });

    if (!profile) throw new ApolloError('Server error');

    if (riotID) profile.riotID = riotID;
    if (tagline) profile.tagline = tagline;
    if (clips) profile.clips = clips;

    await profile.save();

    return profile;
  }

  async getProfile(context: Context) {
    const { user } = context;
    const profile = await ProfileModel.findOne({ user: user?._id });

    if (!profile) throw new ApolloError('Server error');

    return profile;
  }
}

export default ProfileService;
