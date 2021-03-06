import { ApolloError, UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { ProfileModel } from '../schema/profile.schema';
import {
  CreateUserInput,
  EditUserInput,
  LeftSwipeInput,
  LoginInput,
  RightSwipeInput,
  User,
  UserModel,
} from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
class UserService {
  async createUser(input: CreateUserInput, context: Context) {
    const { email, password } = input;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) throw new UserInputError('Account with email exists');

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      minRank: 0,
      maxRank: 21,
    });

    const userDoc = await newUser.save();

    const newProfile = new ProfileModel({
      user: userDoc._id,
      discoverable: false,
      clip: '',
    });

    await newProfile.save();

    const payload = {
      _id: userDoc._id,
      email: userDoc.email,
      createdAt: userDoc.createdAt,
    };

    const token = signJwt(payload);

    return token;
  }

  async login(input: LoginInput, context: Context) {
    const { email, password } = input;

    const user = await UserModel.findOne({ email });

    if (!user) throw new UserInputError('Invalid credentials');

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new UserInputError('Invalid password');

    const payload = {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };

    const token = signJwt(payload);

    return token;
  }

  async rightSwipe(input: RightSwipeInput, user: User) {
    const { rightSwipedID } = input;

    const currentUser = await UserModel.findById(user._id);

    if (!currentUser) throw new ApolloError('User not found');

    //check for match
    const rightSwipedUser = await UserModel.findById(rightSwipedID);
    if (!rightSwipedUser) throw new ApolloError('rightSwiped user not found');

    if (rightSwipedUser._id.toString() === currentUser._id.toString())
      throw new ApolloError('Cannot rightSwipe on yourself');

    if (currentUser.rightSwipes.includes(rightSwipedUser._id))
      throw new ApolloError('Cannot rightSwipe on someone again');

    if (rightSwipedUser.rightSwipes.includes(currentUser._id)) {
      //its a match
      const removeIndex = rightSwipedUser.rightSwipes.indexOf(user._id);
      rightSwipedUser.rightSwipes.splice(removeIndex, 1);
      rightSwipedUser.matches.push(user._id);
      currentUser.matches.push(rightSwipedUser._id);

      await currentUser.save();
      await rightSwipedUser.save();

      return 'Match';
    } else {
      //not a match
      currentUser.rightSwipes.push(rightSwipedUser._id);

      await currentUser.save();
      return 'Right Swiped';
    }
  }

  async leftSwipe(input: LeftSwipeInput, user: User) {
    const { leftSwipedID } = input;

    const currentUser = await UserModel.findById(user._id);

    if (!currentUser) throw new ApolloError('User not found');

    //check for match
    const leftSwipedUser = await UserModel.findById(leftSwipedID);
    if (!leftSwipedUser) throw new ApolloError('leftSwiped user not found');

    if (leftSwipedUser._id.toString() === currentUser._id.toString())
      throw new ApolloError('Cannot leftSwipe on yourself');

    if (currentUser.leftSwipes.includes(leftSwipedUser._id))
      throw new ApolloError('Cannot leftSwipe on someone again');

    currentUser.leftSwipes.push(leftSwipedUser._id);

    await currentUser.save();
    return 'Left Swiped';
  }

  async getMatches(user: User) {
    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) throw new ApolloError('User not found');

    let matches = [];

    for await (const item of currentUser.matches) {
      const profile = await ProfileModel.findOne({ user: item });
      if (!profile) throw new ApolloError('Profile not found');

      matches.push({
        _id: profile.user,
        riotID: profile.riotID,
        tagline: profile.tagline,
      });
    }

    return matches;
  }

  async me(user: User) {
    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) throw new ApolloError('User not found');

    return currentUser;
  }

  async editUser(input: EditUserInput, user: User) {
    const { minRank, maxRank } = input;

    const currentUser = await UserModel.findById(user._id);
    if (!currentUser) throw new ApolloError('User not found');

    if (minRank !== undefined) currentUser.minRank = minRank;
    if (maxRank !== undefined) currentUser.maxRank = maxRank;

    await currentUser.save();

    return currentUser;
  }
}

export default UserService;
