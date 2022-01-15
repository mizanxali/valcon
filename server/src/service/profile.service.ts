import { ApolloError } from 'apollo-server';
import { EditProfileInput, ProfileModel } from '../schema/profile.schema';
import Context from '../types/context';

class ProfileService {
  async editProfile(input: EditProfileInput, context: Context) {
    const { riotID, tagline, clips } = input;
    const { user } = context;

    try {
      const profile = await ProfileModel.findOne({ user: user?._id });

      if (!profile) throw new ApolloError('Server error');

      if (riotID) profile.riotID = riotID;
      if (tagline) profile.tagline = tagline;
      if (clips) profile.clips = clips;

      if (
        profile.riotID &&
        profile.tagline &&
        profile.clips &&
        profile.clips.length > 0
      )
        profile.discoverable = true;

      await profile.save();

      return profile;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async getProfile(context: Context) {
    const { user } = context;

    try {
      const profile = await ProfileModel.findOne({ user: user?._id });

      if (!profile) throw new ApolloError('Server error');

      return profile;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async getProfiles(context: Context) {
    const { user } = context;

    try {
      const profiles = await ProfileModel.find(
        { $and: [{ user: { $ne: user?._id } }, { discoverable: true }] },
        { tagline: 0 },
        { limit: 10 }
      );

      return profiles;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }
}

export default ProfileService;
