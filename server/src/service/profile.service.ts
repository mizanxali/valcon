import { ApolloError } from 'apollo-server';
import {
  EditProfileInput,
  GetProfilesInput,
  ProfileModel,
} from '../schema/profile.schema';
import { User, UserModel } from '../schema/user.schema';
class ProfileService {
  async editProfile(input: EditProfileInput, user: User) {
    const {
      riotID,
      tagline,
      clips,
      agents,
      favoriteMap,
      lookingToPlay,
      rank,
      server,
    } = input;

    try {
      const profile = await ProfileModel.findOne({ user: user._id });

      if (!profile) throw new ApolloError('Profile not found');

      if (riotID) profile.riotID = riotID;
      if (tagline) profile.tagline = tagline;
      if (clips) profile.clips = clips;
      if (agents) profile.agents = agents;
      if (favoriteMap) profile.favoriteMap = favoriteMap;
      if (lookingToPlay) profile.lookingToPlay = lookingToPlay;
      if (rank) profile.rank = rank;
      if (server) profile.server = server;

      if (
        profile.riotID &&
        profile.tagline &&
        profile.clips &&
        profile.clips.length > 0 &&
        profile.agents &&
        profile.agents.length > 0 &&
        profile.favoriteMap &&
        profile.lookingToPlay &&
        profile.rank &&
        profile.server
      )
        profile.discoverable = true;

      await profile.save();

      return profile;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async getProfile(user: User) {
    try {
      const profile = await ProfileModel.findOne({ user: user._id });

      if (!profile) throw new ApolloError('Profile not found');

      return profile;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async getProfiles(input: GetProfilesInput, user: User) {
    const { minRank, maxRank, servers } = input;

    try {
      const currentUser = await UserModel.findById(user._id);
      if (!currentUser) throw new ApolloError('User not found');

      const currentUserProfile = await ProfileModel.findOne({ user: user._id });
      if (!currentUserProfile) throw new ApolloError('Profile not found');

      /* Query for profiles where:
        - user != currentUser
        - user has not already been swiped on/matched with currentUser
        - discoverable == true
        - minRank <= Rank <= maxRank
        - server is equal to any of the selected ones
        - lookingToPlay == currentUser.lookingToPlay */

      const profiles = await ProfileModel.find(
        {
          $and: [
            { user: { $ne: user._id } },
            { user: { $nin: currentUser.matches } },
            { user: { $nin: currentUser.rightSwipes } },
            { user: { $nin: currentUser.leftSwipes } },
            { discoverable: true },
            { rank: { $gte: minRank } },
            { rank: { $lte: maxRank } },
            { server: { $in: servers } },
            { lookingToPlay: currentUserProfile.lookingToPlay },
          ],
        },
        { tagline: 0 },
        { limit: 50 }
      );

      return profiles;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }
}

export default ProfileService;
