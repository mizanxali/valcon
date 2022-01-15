import { ApolloError } from 'apollo-server';
import { EditProfileInput, ProfileModel } from '../schema/profile.schema';
import { UserModel } from '../schema/user.schema';
import Context from '../types/context';

class ProfileService {
  async editProfile(input: EditProfileInput, context: Context) {
    const { riotID, tagline, clips } = input;
    const { user } = context;

    try {
      const profile = await ProfileModel.findOne({ user: user?._id });

      if (!profile) throw new ApolloError('Profile not found');

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

      if (!profile) throw new ApolloError('Profile not found');

      return profile;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async getProfiles(context: Context) {
    const { user } = context;

    try {
      const currentUser = await UserModel.findById(user?._id);

      const profiles = await ProfileModel.find(
        { $and: [{ user: { $ne: user?._id } }, { discoverable: true }] },
        { tagline: 0 },
        { limit: 50 }
      );

      const profilesToShow = profiles.filter(
        (profile) => !currentUser?.matches.includes(profile.user)
      );

      return profilesToShow;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }
}

export default ProfileService;
