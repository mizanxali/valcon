import { ApolloError, UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { ProfileModel } from '../schema/profile.schema';
import {
  CreateUserInput,
  LoginInput,
  SwipeInput,
  UserModel,
} from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
class UserService {
  async createUser(input: CreateUserInput, context: Context) {
    const { email, password } = input;

    try {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) throw new UserInputError('Account with email exists');

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        swipes: [],
        matches: [],
      });

      const userDoc = await newUser.save();

      const newProfile = new ProfileModel({
        user: userDoc._id,
        riotID: '',
        tagline: '',
        clips: [],
        discoverable: false,
      });

      await newProfile.save();

      const payload = {
        _id: userDoc._id,
        email: userDoc.email,
        createdAt: userDoc.createdAt,
      };

      const token = signJwt(payload);

      context.res.cookie('accessToken', token, {
        maxAge: 3.154e10,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return token;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async login(input: LoginInput, context: Context) {
    const { email, password } = input;

    try {
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

      context.res.cookie('accessToken', token, {
        maxAge: 3.154e10,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return token;
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }

  async swipe(input: SwipeInput, context: Context) {
    const { swipedID } = input;
    const { user } = context;

    try {
      const currentUser = await UserModel.findById(user?._id);

      if (!currentUser) throw new ApolloError('User not found');

      //check for match
      const swipedUser = await UserModel.findById(swipedID);
      if (!swipedUser) throw new ApolloError('Swiped user not found');

      if (swipedUser._id.toString() === currentUser._id.toString())
        throw new ApolloError('Cannot swipe on yourself');

      if (swipedUser.swipes.includes(currentUser._id)) {
        //its a match
        const removeIndex = swipedUser.swipes.indexOf(user?._id);
        swipedUser.swipes.splice(removeIndex, 1);
        swipedUser.matches.push(user?._id);
        currentUser.matches.push(swipedUser._id);

        await currentUser.save();
        await swipedUser.save();

        return 'Match';
      } else {
        //not a match
        currentUser.swipes.push(swipedUser._id);

        await currentUser.save();
        return 'Swipe';
      }
    } catch (err) {
      console.log(err);
      throw new ApolloError('Server error');
    }
  }
}

export default UserService;
